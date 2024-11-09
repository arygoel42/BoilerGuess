import { createBrowserRouter } from "react-router-dom";
import gamePage from "../components/gamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <gamePage />,
  },
]);

export default router;
