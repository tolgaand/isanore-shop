import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import SliderModuleService from "src/modules/slider/service";
import { SLIDER_MODULE } from "src/modules/slider";

const getSlidersStep = createStep("get-sliders", async (_, { container }) => {
  console.log("getSlidersStep");
  const sliderModuleService: SliderModuleService =
    container.resolve(SLIDER_MODULE);

  const slider = await sliderModuleService.listSliders({});

  console.log(slider);

  return new StepResponse(slider, slider);
});

export const getSliderWorkflow = createWorkflow("get-slider", () => {
  const slider = getSlidersStep();

  return new WorkflowResponse(slider);
});
