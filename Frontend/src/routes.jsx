import { createBrowserRouter } from "react-router";
import { Layout }     from "./components/layout/Layout";
import { Home }       from "./pages/Home";
import { Shop }       from "./pages/Shop";
import { Combine }    from "./pages/Combine";
import { Collection } from "./pages/Collection";
import { MemeInfo }   from "./pages/MemeInfo";
import { Notice }     from "./pages/Notice";
import { Attendance } from "./pages/Attendance";
import { Detail }     from "./pages/Detail";
import { Onboarding } from "./pages/Onboarding";
import { NotFound }   from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: NotFound,
    children: [
      { index: true,           Component: Home       },
      { path: "shop",          Component: Shop       },
      { path: "combine",       Component: Combine    },
      { path: "collection",    Component: Collection },
      { path: "meme-info",     Component: MemeInfo   },
      { path: "notice",        Component: Notice     },
      { path: "attendance",    Component: Attendance },
      { path: "detail/:id",    Component: Detail     },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
