import type { Meta, StoryObj } from '@storybook/react-vite';
import OilSkimmersForm from './OilSkimmersForm';

const meta: Meta<typeof OilSkimmersForm> = {
  title: 'Pages/OilSkimmersForm',
  component: OilSkimmersForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OilSkimmersForm>;

export const Default: Story = {
  args: {},
};
