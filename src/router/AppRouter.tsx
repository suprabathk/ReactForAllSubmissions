import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import { PreviewForm } from "../components/PreviewForm";
import Page404 from "../components/Page404";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../components/Home"));

export default function AppRouter() {
  const routes = {
    "/": () => (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    "/login": () => <Redirect to="/" />,
    "/about": () => <About />,
    "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
