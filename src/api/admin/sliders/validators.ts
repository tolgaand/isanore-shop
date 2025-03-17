import { z } from "zod";

export const PostAdminSliders = z.object({
  url: z.string(),
  rank: z.number(),
  handle: z.string(),
});

export type PostAdminSliders = z.infer<typeof PostAdminSliders>;
