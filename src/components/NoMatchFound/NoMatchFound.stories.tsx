import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { NoMatchFound } from './NoMatchFound';

const meta: Meta<typeof NoMatchFound> = {
  title: 'Components/NoMatchFound',
  component: NoMatchFound,
};

export default meta;
type Story = StoryObj<typeof NoMatchFound>;

export const Default: Story = {
  args: {
    clearFilters: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No results found')).toBeVisible();

    const clearButton = canvas.getByRole('button', { name: /Clear all filters/ });
    await expect(clearButton).toBeVisible();
    await userEvent.click(clearButton);
    await expect(args.clearFilters).toHaveBeenCalledOnce();
  },
};
