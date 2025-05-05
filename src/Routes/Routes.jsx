import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AnimatedForm from "../pages/Form.jsx/AnimatedForm";
import Blogpage from "../pages/Blog/Blogpage";
import PageLayout from "../Layout/PageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <Main></Main>
      </PageLayout>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/regForm",
        element: <AnimatedForm></AnimatedForm>,
      },
      {
        path: "/blogpage",
        element: <Blogpage></Blogpage>,
      },
    ],
  },
]);
