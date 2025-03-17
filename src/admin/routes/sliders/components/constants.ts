import { z } from "zod";

export const SliderSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  rank: z.number(),
  handle: z.string(),
});

export const EditSliderSchema = z.object({
  media: z.array(SliderSchema),
});
