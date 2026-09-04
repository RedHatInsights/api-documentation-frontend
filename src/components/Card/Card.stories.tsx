import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Card } from './Card';
import { Tag } from '../Tags/Tag';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    apiId: 'cost-management',
    displayName: 'Cost Management',
    icon: 'InsightsIcon',
    description: 'Analyze, forecast, and optimize your cloud costs with detailed reports and recommendations.',
    to: '/api-catalog/cost-management',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Cost Management')).toBeVisible();
    await expect(canvas.getByText(/Analyze, forecast/)).toBeVisible();
    const links = canvas.getAllByRole('link', { name: /Cost Management/ });
    await expect(links[0]).toHaveAttribute('href', '/api-catalog/cost-management');
  },
};

export const WithTags: Story = {
  args: {
    ...Default.args!,
  },
  render: (args) => (
    <Card {...args}>
      <Tag value={{ id: 'openshift', name: 'OpenShift', type: 'platform', devRedHatTaxonomy: {} }} />
      <Tag value={{ id: 'automation', name: 'Automation', type: 'use-case', devRedHatTaxonomy: {} }} />
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Cost Management')).toBeVisible();
    await expect(canvas.getByText('OpenShift')).toBeVisible();
    await expect(canvas.getByText('Automation')).toBeVisible();
  },
};

export const GenericIcon: Story = {
  args: {
    apiId: 'generic-api',
    displayName: 'Generic API',
    description: 'A generic API without a specific icon.',
    to: '/api-catalog/generic-api',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Generic API')).toBeVisible();
  },
};
