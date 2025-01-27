import { defineLink } from "@medusajs/framework/utils";
import ProductCollectionImageModule from "../modules/product-collection-image";
import ProductModule from "@medusajs/medusa/product";

export default defineLink(
  ProductModule.linkable.productCollection,
  ProductCollectionImageModule.linkable.productCollectionImage
);
