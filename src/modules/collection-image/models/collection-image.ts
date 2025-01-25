import { model } from "@medusajs/framework/utils";
import ProductCollection from "@medusajs/product/dist/models/product-collection";

const CollectionImage = model.define("collection_image", {
  id: model.id().primaryKey(),
  title: model.text(),
  rank: model.number(),
  product_collection: model.belongsTo(() => ProductCollection),
});

export default CollectionImage;
