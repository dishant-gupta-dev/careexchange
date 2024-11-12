import { AuthApp } from "../layouts/auth/AuthApp.js";
import { UserAuthApp } from "../layouts/auth/UserAuthApp.js";
import { routes } from "../utlis/admin/routes.utlis.js";
import { routes as userroutes } from "../utlis/user/routes.utlis.js";
import AdminLogin from "../views/auth/admin/Page.js";
import Home from "../views/auth/user/Home.js";
import Login from "../views/auth/user/Login.js";
import Otp from "../views/auth/user/Otp.js";
import SignUp from "../views/auth/user/SignUp.js";
import UserRegister from "../views/auth/user/UserRegister.js";

var AuthRoutes = [
  {
    path: routes.login,
    exact: true,
    layout: AuthApp,
    component: AdminLogin,
  },
  {
    path: userroutes.home,
    exact: true,
    layout: UserAuthApp,
    component: Home,
  },
  {
    path: userroutes.login,
    exact: true,
    layout: UserAuthApp,
    component: Login,
  },
  {
    path: userroutes.userRegister,
    exact: true,
    layout: UserAuthApp,
    component: UserRegister,
  },
  {
    path: userroutes.signup,
    exact: true,
    layout: UserAuthApp,
    component: SignUp,
  },

];

export default AuthRoutes;