import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import { PreviewForm } from "../components/PreviewForm";
import Page404 from "../components/Page404";
import Login from "../components/Login";
import { User } from "../types/userTypes";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes) || <Page404 />;
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
