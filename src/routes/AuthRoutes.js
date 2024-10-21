import AdminLogin from "../views/auth/login/Page.js";
import { AuthApp } from "../layouts/auth/AuthApp.js";
import { routes } from "../utlis/routes.utlis.js";

var AuthRoutes = [
  {
    path: routes.login,
    exact: true,
    layout: AuthApp,
    component: AdminLogin,
  },

];

export default AuthRoutes;