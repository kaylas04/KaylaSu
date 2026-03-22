import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { QuotrCaseStudy } from "./pages/QuotrCaseStudy";
import { OrigamiCaseStudy } from "./pages/OrigamiCaseStudy";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "project/quotr", Component: QuotrCaseStudy },
      { path: "project/origami-robotics", Component: OrigamiCaseStudy },
      { path: "project/:id", Component: CaseStudy },
    ],
  },
]);
