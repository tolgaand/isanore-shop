import { model } from "@medusajs/framework/utils";

const Slider = model.define("slider", {
  id: model.id().primaryKey(),
  url: model.text(),
  handle: model.text(),
  rank: model.number(),
});

export default Slider;
