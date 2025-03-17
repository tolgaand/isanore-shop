import { z } from "zod";
import { EditSliderSchema } from "./constants";

export type EditSliderSchemaType = z.infer<typeof EditSliderSchema>;

export type Slider = {
  id: string;
  url: string;
  rank: number;
  handle: string;
};
