import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import { PreviewForm } from "../components/PreviewForm";
import Page404 from "../components/Page404";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes) || <Page404 />;
  return <AppContainer>{routeResult}</AppContainer>;
}
