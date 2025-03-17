import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import SliderModuleService from "src/modules/slider/service";
import { SLIDER_MODULE } from "src/modules/slider";

type UpdateSliderWorkflowInput = {
  url: string;
  rank: number;
  handle: string;
};

const updateSliderStep = createStep(
  "update-slider",
  async ({ url, rank, handle }: UpdateSliderWorkflowInput, { container }) => {
    const sliderModuleService: SliderModuleService =
      container.resolve(SLIDER_MODULE);

    await sliderModuleService.deleteSliders({});

    const slider = await sliderModuleService.createSliders({
      url,
      rank,
      handle,
    });

    return new StepResponse(slider, slider);
  },
  async (slider, { container }) => {
    const sliderModuleService: SliderModuleService =
      container.resolve(SLIDER_MODULE);

    await sliderModuleService.deleteSliders(slider.id);
  }
);

export const updateSliderWorkflow = createWorkflow(
  "update-slider",
  (sliderInput: UpdateSliderWorkflowInput) => {
    const slider = updateSliderStep(sliderInput);

    return new WorkflowResponse(slider);
  }
);
