import { MedusaService } from "@medusajs/framework/utils";
import ProductCollectionImage from "./models/product-collection-image";

class ProductCollectionImageModuleService extends MedusaService({
  ProductCollectionImage,
}) {}

export default ProductCollectionImageModuleService;
