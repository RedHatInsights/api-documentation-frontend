/**
 * Content validation for externally fetched OpenAPI specs.
 *
 * Defense-in-depth against compromised upstream spec endpoints that could
 * inject malicious content through the sync-discovery pipeline.
 *
 * See: RHCLOUD-50079 (FIND-002)
 */

/** Maximum allowed response size (50 MB). */
const MAX_RESPONSE_SIZE_BYTES = 50 * 1024 * 1024;

/**
 * HTML/JS patterns that are never appropriate in OpenAPI spec string values.
 *
 * Common markup (<b>, <em>, <table>, <a>, <code>, <pre>) is intentionally
 * allowed because CommonMark (used in OpenAPI descriptions) permits inline HTML.
 */
const DANGEROUS_PATTERNS: ReadonlyArray<RegExp> = [
  /<script[\s>\/]/i,
  /<iframe[\s>\/]/i,
  /<object[\s>\/]/i,
  /<embed[\s>\/]/i,
  /<form\s[^>]*action\s*=/i,
  /<meta[\s>\/]/i,
  /<base[\s>\/]/i,
  /<link\s[^>]*rel\s*=\s*["']?stylesheet/i,
  /javascript\s*:/i,
  /\bon\w+\s*=\s*["']/i,
  /data\s*:\s*text\/html/i,
];

/** Content types that are acceptable for API spec responses. */
const VALID_CONTENT_TYPES: ReadonlyArray<string> = [
  'application/json',
  'application/vnd.oai.openapi+json',
  'application/vnd.oai.openapi',
  'application/yaml',
  'application/x-yaml',
  'text/yaml',
  'text/json',
  'text/plain',
];

export class ContentValidationError extends Error {
  public readonly url: string;

  constructor(message: string, url: string) {
    super(`Content validation failed for ${url}: ${message}`);
    this.name = 'ContentValidationError';
    this.url = url;
  }
}

/**
 * Validates that the HTTP Content-Type header indicates a JSON or YAML response.
 * Warns (but does not reject) when the header is absent, since some servers
 * omit it for JSON responses.
 */
export const validateContentType = (contentType: string | undefined, url: string): void => {
  if (!contentType) {
    console.warn(`[validation] No Content-Type header for ${url}`);
    return;
  }

  const normalized = contentType.split(';')[0].trim().toLowerCase();
  if (!VALID_CONTENT_TYPES.some(valid => normalized === valid)) {
    throw new ContentValidationError(
      `Unexpected Content-Type "${contentType}". Expected JSON or YAML response.`,
      url
    );
  }
};

/** Validates response body size is within acceptable limits. */
export const validateResponseSize = (content: string, url: string): void => {
  const sizeBytes = Buffer.byteLength(content, 'utf-8');
  if (sizeBytes > MAX_RESPONSE_SIZE_BYTES) {
    throw new ContentValidationError(
      `Response size ${(sizeBytes / 1024 / 1024).toFixed(1)} MB exceeds limit of ${MAX_RESPONSE_SIZE_BYTES / 1024 / 1024} MB`,
      url
    );
  }
};

/**
 * Recursively scans all string values in a parsed object for dangerous
 * HTML/JS patterns that could enable XSS or content injection.
 */
const scanForDangerousPatterns = (obj: unknown, path: string, findings: string[]): void => {
  if (typeof obj === 'string') {
    for (const pattern of DANGEROUS_PATTERNS) {
      if (pattern.test(obj)) {
        const truncated = obj.length > 120 ? obj.substring(0, 120) + '...' : obj;
        findings.push(`${path}: "${truncated}"`);
        break; // one finding per string value is sufficient
      }
    }
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      scanForDangerousPatterns(obj[i], `${path}[${i}]`, findings);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      scanForDangerousPatterns(value, path ? `${path}.${key}` : key, findings);
    }
  }
};

/**
 * Validates that the parsed spec content does not contain dangerous
 * HTML/JS patterns in any string values.
 */
export const validateNoDangerousContent = (content: object, url: string): void => {
  const findings: string[] = [];
  scanForDangerousPatterns(content, '', findings);

  if (findings.length > 0) {
    const summary = findings.slice(0, 5).join('\n  ');
    const more = findings.length > 5 ? `\n  ... and ${findings.length - 5} more` : '';
    throw new ContentValidationError(
      `Spec contains dangerous HTML/JS content that could enable XSS:\n  ${summary}${more}`,
      url
    );
  }
};

/**
 * Validates an HTTP response from an external API spec endpoint.
 * Checks response size and Content-Type before content is processed.
 */
export const validateHttpResponse = (
  body: string,
  url: string,
  contentType?: string
): void => {
  validateResponseSize(body, url);
  validateContentType(contentType, url);
};

/**
 * Validates parsed spec content for structural correctness and dangerous patterns.
 * Call after JSON.parse, before writing content to disk.
 */
export const validateParsedSpec = (content: Record<string, unknown>, url: string): void => {
  if (!('openapi' in content) && !('swagger' in content)) {
    throw new ContentValidationError(
      'Response is missing "openapi" or "swagger" key — not a valid API spec',
      url
    );
  }

  validateNoDangerousContent(content, url);
};
