import type { Meta, StoryObj } from '@storybook/react-vite';
import WhatsAppPill from './WhatsAppPill';

const meta: Meta<typeof WhatsAppPill> = {
  title: 'Components/WhatsAppPill',
  component: WhatsAppPill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WhatsAppPill>;

export const Default: Story = {
  args: {},
};
