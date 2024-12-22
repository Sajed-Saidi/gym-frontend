import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import Classes from "./pages/Classes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ClassDetails from "./pages/ClassDetails";
import Account from "./pages/Account";
import { GlobalProvider } from "./contexts/GlobalProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalProvider></GlobalProvider>,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Index />,
          },
          {
            path: "/about-us",
            element: <AboutUs />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/plans",
            element: <Plans />,
          },
          {
            path: "/classes",
            element: <Classes />,
          },
          {
            path: "/class-details/:id",
            element: <ClassDetails />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
