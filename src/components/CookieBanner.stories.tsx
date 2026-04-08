import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import CookieBanner from './CookieBanner';

const meta: Meta<typeof CookieBanner> = {
  title: 'Components/CookieBanner',
  component: CookieBanner,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: '3rem', minHeight: '300px', background: '#0a0a0a' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CookieBanner>;

export const Default: Story = {
  args: {},
};
