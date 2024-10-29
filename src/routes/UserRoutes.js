import { routes } from "../utlis/user/routes.utlis";
import { UserLayout } from "../layouts/user/App.js";
import Dashboard from "../views/user/dashboard/Page.js";
import Jobs from "../views/user/jobs/Page.js";
import Message from "../views/user/message/Page.js";

var UserRoutes = [
    {
        path: routes.dashboard,
        layout: UserLayout,
        component: Dashboard
    },
    {
        path: routes.message,
        layout: UserLayout,
        component: Message
    },
    {
        path: routes.myJobs,
        layout: UserLayout,
        component: Jobs
    },
];

export default UserRoutes;