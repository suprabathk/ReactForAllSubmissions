import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import { PreviewForm } from "../components/PreviewForm";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
