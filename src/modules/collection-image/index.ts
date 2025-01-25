import CollectionImageModuleService from "./service";
import { mikroOrmConnectionLoader, Module } from "@medusajs/framework/utils";

export const COLLECTION_IMAGE_MODULE = "collection_image";

export default Module(COLLECTION_IMAGE_MODULE, {
  service: CollectionImageModuleService,
});
