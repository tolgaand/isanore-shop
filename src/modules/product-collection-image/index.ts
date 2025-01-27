import ProductCollectionImageModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const PRODUCT_COLLECTION_IMAGE_MODULE = "product_collection_image";

export default Module(PRODUCT_COLLECTION_IMAGE_MODULE, {
  service: ProductCollectionImageModuleService,
});
