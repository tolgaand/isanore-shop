import { model } from "@medusajs/framework/utils";

const ProductCollectionImage = model.define("product_collection_image", {
  id: model.id().primaryKey(),
  rank: model.number(),
  url: model.text(),
});

export default ProductCollectionImage;
