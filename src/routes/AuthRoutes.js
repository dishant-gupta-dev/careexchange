import { AuthApp } from "../layouts/auth/AuthApp.js";
import { UserAuthApp } from "../layouts/auth/UserAuthApp.js";
import { ProviderAuthApp } from "../layouts/auth/ProviderAuthApp.js";
import { StaffAuthApp } from "../layouts/auth/StaffAuthApp.js";
import { routes } from "../utlis/admin/routes.utlis.js";
import { routes as userroutes } from "../utlis/user/routes.utlis.js";
import { routes as providerroutes } from "../utlis/provider/routes.utlis.js";
import { routes as staffroutes } from "../utlis/staff/routes.utlis.js";
import AdminLogin from "../views/auth/admin/Page.js";
import Home from "../views/auth/user/Home.js";
import Login from "../views/auth/user/Login.js";
import SignUp from "../views/auth/user/SignUp.js";
import UserRegister from "../views/auth/user/UserRegister.js";
import Register from "../views/auth/provider/Register.js";
import StaffRegister from "../views/auth/staff/Register.js";

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
  {
    path: providerroutes.providerRegister,
    exact: true,
    layout: ProviderAuthApp,
    component: Register,
  },
  {
    path: staffroutes.staffRegister,
    exact: true,
    layout: StaffAuthApp,
    component: StaffRegister,
  },
];

export default AuthRoutes;