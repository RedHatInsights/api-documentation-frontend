import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SchemaViewer } from './SchemaViewer';
import { OpenAPIV3 } from 'openapi-types';

const docWithSchemas: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: { title: 'Test API', version: '1.0' },
  paths: {},
  components: {
    schemas: {
      Status: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'running' },
          uptime: { type: 'integer', description: 'Seconds since last restart' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          code: { type: 'integer' },
          message: { type: 'string' },
        },
      },
    },
  },
};

const meta: Meta<typeof SchemaViewer> = {
  title: 'Components/APIDoc/SchemaViewer',
  component: SchemaViewer,
};

export default meta;
type Story = StoryObj<typeof SchemaViewer>;

export const Default: Story = {
  args: {
    document: docWithSchemas,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Schemas')).toBeVisible();
    await expect(canvas.getByText('Status')).toBeVisible();
    await expect(canvas.getByText('ErrorResponse')).toBeVisible();
  },
};

export const NoSchemas: Story = {
  args: {
    document: {
      openapi: '3.0.1',
      info: { title: 'Empty', version: '1.0' },
      paths: {},
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText('Schemas')).toBeNull();
  },
};
