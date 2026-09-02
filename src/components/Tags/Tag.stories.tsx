import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Platform: Story = {
  args: {
    value: { id: 'openshift', name: 'OpenShift', type: 'platform', devRedHatTaxonomy: {} },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('OpenShift')).toBeVisible();
  },
};

export const Service: Story = {
  args: {
    value: { id: 'rhel', name: 'RHEL', type: 'service', devRedHatTaxonomy: {} },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('RHEL')).toBeVisible();
  },
};

export const UseCase: Story = {
  args: {
    value: { id: 'automation', name: 'Automation', type: 'use-case', devRedHatTaxonomy: {} },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Automation')).toBeVisible();
  },
};
