import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import { PreviewForm } from "../components/PreviewForm";
import Page404 from "../components/Page404";
import Login from "../components/Login";
import { User } from "../types/userTypes";

export default function AppRouter({ currentUser }: { currentUser: User }) {
  const loggedIn = currentUser?.username.length > 0;
  const routes = {
    "/": () => (loggedIn ? <Home /> : <Redirect to="/login" />),
    "/login": () => <Login />,
    "/about": () => (loggedIn ? <About /> : <Redirect to="/login" />),
    "/form/:id": ({ id }: { id: string }) =>
      loggedIn ? <Form id={Number(id)} /> : <Redirect to="/login" />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewForm id={Number(id)} />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return <AppContainer currentUser={currentUser}>{routeResult}</AppContainer>;
}
