import type { Meta, StoryObj } from "@storybook/react";
import SampleComponent from "./sample-component";
import { mockIPC } from "@tauri-apps/api/mocks";

const meta: Meta<typeof SampleComponent> = {
  title: "Components/SampleComponent",
  component: SampleComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof SampleComponent>;
export const Default: Story = {
  render: () => {
    mockIPC((cmd, arg) =>
      console.log(`cmd: ${cmd}, arg: ${JSON.stringify(arg)}`),
    );
    return <SampleComponent />;
  },
};
