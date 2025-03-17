import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CircleSliders } from "@medusajs/icons";
import { SliderMediaSection } from "./components/slider-media-section";
import { useSliders } from "../../hooks/api/sliders";

const CustomPage = () => {
  const { data, isLoading } = useSliders();

  if (isLoading) return <h1>Loading...</h1>;

  return <SliderMediaSection sliders={data || []} />;
};

export const config = defineRouteConfig({
  label: "Sliders",
  icon: CircleSliders,
});

export default CustomPage;
