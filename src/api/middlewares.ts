import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostAdminSliders } from "./admin/sliders/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/sliders",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminSliders)],
    },
    {
      matcher: "/admin/sliders",
      method: "GET",
    },
  ],
});
