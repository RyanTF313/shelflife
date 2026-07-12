import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductListPage from "../features/products/pages/ProductListPage";
import ProductCreatePage from "../features/products/pages/ProductCreatePage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import ProductEditPage from "../features/products/pages/ProductEditPage";
import VideoCreatePage from "../features/videos/pages/VideoCreatePage";
import ProductAnalyticsPage from "../features/analytics/pages/ProductAnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: "products/new", element: <ProductCreatePage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "products/:id/edit", element: <ProductEditPage /> },
      { path: "products/:id/videos/create", element: <VideoCreatePage /> },
      { path: "products/:id/analytics", element: <ProductAnalyticsPage /> },
    ],
  },
]);
