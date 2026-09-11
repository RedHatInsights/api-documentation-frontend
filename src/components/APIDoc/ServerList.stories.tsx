import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ServerList } from './ServerList';

const meta: Meta<typeof ServerList> = {
  title: 'Components/APIDoc/ServerList',
  component: ServerList,
};

export default meta;
type Story = StoryObj<typeof ServerList>;

export const SingleServer: Story = {
  args: {
    servers: [{ url: 'https://api.example.com/v1' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Base URLs:')).toBeVisible();
    await expect(canvas.getByText('https://api.example.com/v1')).toBeVisible();
  },
};

export const MultipleServers: Story = {
  args: {
    servers: [
      { url: 'https://api.example.com/v1', description: 'Production' },
      { url: 'https://staging.example.com/v1', description: 'Staging' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Production/)).toBeVisible();
    await expect(canvas.getByText(/Staging/)).toBeVisible();
  },
};

export const WithVariables: Story = {
  args: {
    servers: [
      {
        url: 'https://{environment}.example.com/{version}',
        variables: {
          environment: { default: 'api' },
          version: { default: 'v1' },
        },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('https://api.example.com/v1')).toBeVisible();
  },
};
