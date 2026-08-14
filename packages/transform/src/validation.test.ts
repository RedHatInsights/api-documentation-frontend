import {
  validateContentType,
  validateResponseSize,
  validateNoDangerousContent,
  validateParsedSpec,
  validateHttpResponse,
  ContentValidationError,
} from './validation';

describe('validateContentType', () => {
  it('accepts application/json', () => {
    expect(() => validateContentType('application/json', 'https://example.com/spec.json')).not.toThrow();
  });

  it('accepts application/json with charset', () => {
    expect(() => validateContentType('application/json; charset=utf-8', 'https://example.com/spec.json')).not.toThrow();
  });

  it('accepts text/plain', () => {
    expect(() => validateContentType('text/plain', 'https://example.com/spec.json')).not.toThrow();
  });

  it('accepts application/vnd.oai.openapi+json', () => {
    expect(() => validateContentType('application/vnd.oai.openapi+json', 'https://example.com/spec.json')).not.toThrow();
  });

  it('rejects text/html', () => {
    expect(() => validateContentType('text/html', 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects application/octet-stream', () => {
    expect(() => validateContentType('application/octet-stream', 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('warns but does not throw when Content-Type is missing', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    expect(() => validateContentType(undefined, 'https://example.com/spec.json')).not.toThrow();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('No Content-Type'));
    spy.mockRestore();
  });
});

describe('validateResponseSize', () => {
  it('accepts small responses', () => {
    expect(() => validateResponseSize('{"openapi":"3.0.0"}', 'https://example.com/spec.json')).not.toThrow();
  });

  it('rejects responses over 50 MB', () => {
    const huge = 'x'.repeat(51 * 1024 * 1024);
    expect(() => validateResponseSize(huge, 'https://example.com/spec.json')).toThrow(ContentValidationError);
    expect(() => validateResponseSize(huge, 'https://example.com/spec.json')).toThrow(/exceeds limit/);
  });
});

describe('validateNoDangerousContent', () => {
  it('accepts clean OpenAPI spec', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0', description: 'A **clean** API with <b>bold</b> text' },
      paths: {
        '/users': {
          get: { summary: 'List users', description: 'Returns a list of <em>all</em> users' }
        }
      }
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).not.toThrow();
  });

  it('rejects spec with script tags', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<script>alert("xss")</script>' },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(/dangerous HTML/i);
  });

  it('rejects spec with iframe tags', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<iframe src="https://evil.com"></iframe>' },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects spec with event handlers', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<img src=x onerror="alert(1)">' },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects spec with javascript: URIs', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<a href="javascript:alert(1)">click</a>' },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects spec with object tags', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: { '/test': { get: { description: '<object data="https://evil.com/exploit.swf"></object>' } } }
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects spec with embed tags', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: { '/test': { get: { description: '<embed src="https://evil.com/exploit">' } } }
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('rejects spec with data:text/html URIs', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<a href="data:text/html,<script>alert(1)</script>">click</a>' },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('detects dangerous content in deeply nested values', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/deep': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      properties: {
                        name: { description: '<script>alert("deep")</script>' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });

  it('allows safe HTML tags commonly used in OpenAPI descriptions', () => {
    const spec = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
        description: [
          '<b>Bold</b> and <em>italic</em> text',
          '<code>inline code</code>',
          '<pre>code block</pre>',
          '<a href="https://example.com">link</a>',
          '<ul><li>item 1</li><li>item 2</li></ul>',
          '<table><tr><th>Header</th></tr><tr><td>Cell</td></tr></table>',
          '<p>Paragraph</p>',
          '<br>',
          '<h3>Heading</h3>',
          '<blockquote>Quote</blockquote>',
          '<strong>Strong</strong>',
          '<img src="https://example.com/diagram.png" alt="diagram">',
        ].join('\n')
      },
      paths: {}
    };
    expect(() => validateNoDangerousContent(spec, 'https://example.com/spec.json')).not.toThrow();
  });
});

describe('validateParsedSpec', () => {
  it('accepts valid OpenAPI v3 spec', () => {
    const spec = { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' }, paths: {} };
    expect(() => validateParsedSpec(spec, 'https://example.com/spec.json')).not.toThrow();
  });

  it('accepts valid Swagger v2 spec', () => {
    const spec = { swagger: '2.0', info: { title: 'Test', version: '1.0.0' }, paths: {} };
    expect(() => validateParsedSpec(spec, 'https://example.com/spec.json')).not.toThrow();
  });

  it('rejects content missing openapi/swagger key', () => {
    const spec = { info: { title: 'Test', version: '1.0.0' }, paths: {} };
    expect(() => validateParsedSpec(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
    expect(() => validateParsedSpec(spec, 'https://example.com/spec.json')).toThrow(/missing "openapi" or "swagger"/);
  });

  it('rejects valid structure with dangerous content', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0', description: '<script>alert("xss")</script>' },
      paths: {}
    };
    expect(() => validateParsedSpec(spec, 'https://example.com/spec.json')).toThrow(ContentValidationError);
  });
});

describe('validateHttpResponse', () => {
  it('passes for valid JSON response', () => {
    expect(() => validateHttpResponse('{"openapi":"3.0.0"}', 'https://example.com', 'application/json')).not.toThrow();
  });

  it('rejects HTML responses', () => {
    expect(() => validateHttpResponse('<html></html>', 'https://example.com', 'text/html')).toThrow(ContentValidationError);
  });

  it('rejects oversized responses', () => {
    const huge = 'x'.repeat(51 * 1024 * 1024);
    expect(() => validateHttpResponse(huge, 'https://example.com', 'application/json')).toThrow(/exceeds limit/);
  });
});

describe('ContentValidationError', () => {
  it('includes URL in error message', () => {
    const err = new ContentValidationError('test error', 'https://example.com/spec.json');
    expect(err.message).toContain('https://example.com/spec.json');
    expect(err.url).toBe('https://example.com/spec.json');
    expect(err.name).toBe('ContentValidationError');
  });
});
