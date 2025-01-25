import { MedusaService } from "@medusajs/framework/utils";
import CollectionImage from "./models/collection-image";

class CollectionImageModuleService extends MedusaService({
  CollectionImage,
}) {}

export default CollectionImageModuleService;
