import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

import { PostAdminSliders } from "./validators";
import { getSliderWorkflow } from "src/workflows/slider/get-slider";
import { updateSliderWorkflow } from "src/workflows/slider/update-slider";

export async function POST(
  req: MedusaRequest<PostAdminSliders>,
  res: MedusaResponse
) {
  const { result: slider } = await updateSliderWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({
    slider,
  });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { result: sliders } = await getSliderWorkflow(req.scope).run({});

  res.json(sliders);
}
