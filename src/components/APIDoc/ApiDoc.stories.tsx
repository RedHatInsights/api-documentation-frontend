import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ApiDoc } from './ApiDoc';
import { GroupedOperations } from './hooks/useGroupedOperations';
import { OpenAPIV3 } from 'openapi-types';

const openapi: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'Ros-backend API',
    description: 'Flask Backend API for Resource Optimization Service',
    version: 'v1',
  },
  servers: [{ url: 'https://console.redhat.com/api/ros/v1' }],
  paths: {
    '/status': {
      get: {
        summary: 'Health check liveness call',
        description: 'A small JSON indicating the application is deployed.',
        operationId: 'getStatus',
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Status' } } },
          },
        },
      },
    },
    '/systems': {
      get: {
        summary: 'List all systems',
        description: 'List all systems with their resource optimization data.',
        operationId: 'listSystems',
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Systems' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Status: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'running' },
        },
      },
      Systems: {
        type: 'object',
        properties: {
          meta: { $ref: '#/components/schemas/ListMeta' },
          data: { type: 'array', items: { $ref: '#/components/schemas/SystemItem' } },
        },
      },
      ListMeta: {
        type: 'object',
        properties: {
          count: { type: 'integer' },
          limit: { type: 'integer' },
          offset: { type: 'integer' },
        },
      },
      SystemItem: {
        type: 'object',
        properties: {
          inventory_id: { type: 'string', format: 'uuid' },
          display_name: { type: 'string' },
          state: { type: 'string', enum: ['Idling', 'Under pressure', 'Oversized'] },
        },
      },
    },
  },
};

const groupedOperations: GroupedOperations = {
  groups: [],
  others: ['getStatus', 'listSystems'],
  operations: {
    getStatus: {
      id: 'getStatus',
      rawOperation: openapi.paths['/status']!.get! as OpenAPIV3.OperationObject,
      verb: 'get',
      baseUrl: 'https://console.redhat.com/api/ros/v1',
      path: '/status',
    },
    listSystems: {
      id: 'listSystems',
      rawOperation: openapi.paths['/systems']!.get! as OpenAPIV3.OperationObject,
      verb: 'get',
      baseUrl: 'https://console.redhat.com/api/ros/v1',
      path: '/systems',
    },
  },
};

const meta: Meta<typeof ApiDoc> = {
  title: 'Components/ApiDoc',
  component: ApiDoc,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ApiDoc>;

export const Default: Story = {
  args: {
    apiContent: { openapi, extras: {} },
    groupedOperations,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Ros-backend API/)).toBeVisible();
    await expect(canvas.getByText(/Flask Backend API/)).toBeVisible();
    await expect(canvas.getByText('Operations')).toBeVisible();
    await expect(canvas.getByText('Schemas')).toBeVisible();
  },
};

export const WithGettingStarted: Story = {
  args: {
    apiContent: {
      openapi,
      extras: {
        getting_started: '## Quick Start\n\nThis is a getting started guide for the ROS API.',
      },
    },
    groupedOperations,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Ros-backend API/)).toBeVisible();
    await expect(canvas.getByText('Getting started')).toBeVisible();
    await expect(canvas.getByText(/Quick Start/)).toBeVisible();
  },
};
