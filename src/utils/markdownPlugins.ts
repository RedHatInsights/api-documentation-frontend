import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import type { PluggableList } from 'unified';

/**
 * Shared rehype plugin configuration for ReactMarkdown.
 *
 * rehype-raw re-parses embedded HTML from Markdown into hast nodes,
 * then rehype-sanitize strips dangerous elements (script, iframe,
 * event handlers, etc.) using GitHub's default schema.
 *
 * Always use this instead of importing rehype-raw directly to ensure
 * all Markdown rendering is protected against XSS from untrusted
 * OpenAPI spec content.
 */
export const rehypePlugins: PluggableList = [rehypeRaw, rehypeSanitize];
