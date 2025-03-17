import { defineRouteConfig } from "@medusajs/admin-sdk";
import { EditSliderMediaForm } from "../components/edit-slider-media-form";
import { RouteFocusModal } from "../../../components/common/modals";
import { useSliders } from "../../../hooks/api/sliders";

const NestedOrdersPage = () => {
  const { data, isLoading } = useSliders();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <RouteFocusModal>
      <RouteFocusModal.Title asChild>
        <span className="sr-only">Hello</span>
      </RouteFocusModal.Title>
      <RouteFocusModal.Description asChild>
        <span className="sr-only">Hello2</span>
      </RouteFocusModal.Description>
      <EditSliderMediaForm sliders={data || []} />
    </RouteFocusModal>
  );
};

export const config = defineRouteConfig({
  label: "Nested Orders",
});

export default NestedOrdersPage;
