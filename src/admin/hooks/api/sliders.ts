import { useQuery, useMutation } from "@tanstack/react-query";
import { sdk } from "../../lib/config.ts";
import { Slider } from "../../routes/sliders/components/types.ts";

const GET_SLIDERS_KEY = "sliders" as const;

type SliderCreateType = {
  url: string;
  rank: number;
  handle: string;
};

export const useSliders = () => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch("/admin/sliders").then((d) => d as Slider[]),
    queryKey: [GET_SLIDERS_KEY],
  });

  return { data, ...rest };
};

export const useUpdateSlider = () => {
  return useMutation({
    mutationFn: (payload: SliderCreateType[]) =>
      sdk.client.fetch("/admin/sliders", {
        method: "POST",
        body: payload,
      }),
  });
};
