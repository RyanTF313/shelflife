import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductListPage from "../features/products/pages/ProductListPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import ProductEditPage from "../features/products/pages/ProductEditPage";
import VideoCreatePage from "../features/videos/pages/VideoCreatePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "products/:id/edit", element: <ProductEditPage /> },
      { path: "products/:id/videos/create", element: <VideoCreatePage /> },
    ],
  },
]);
