import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/root/signIn.tsx"),
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
    route("products", "routes/admin/products.tsx"),
    route("products/create", "routes/admin/product-edit.tsx", {
      id: "product-create",
    }),
    route("products/:id", "routes/admin/product-edit.tsx", {
      id: "product-edit",
    }),
  ]),
] satisfies RouteConfig;
