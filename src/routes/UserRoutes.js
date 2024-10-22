import { routes } from "../utlis/user/routes.utlis";
import { UserLayout } from "../layouts/user/App.js";
import Page from "../views/user/dashboard/Page.js";

var UserRoutes = [
    {
        path: routes.dashboard,
        layout: UserLayout,
        component: Page
    },
];

export default UserRoutes;