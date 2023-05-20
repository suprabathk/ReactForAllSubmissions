import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import Home from "../components/Home";
import { PreviewForm } from "../components/PreviewForm";
import Page404 from "../components/Page404";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Redirect to="/" />,
    "/about": () => <About />,
    "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
