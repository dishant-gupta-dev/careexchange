import { routes } from "../utlis/user/routes.utlis";
import { UserLayout } from "../layouts/user/App.js";
import Dashboard from "../views/user/dashboard/Page.js";
import Jobs from "../views/user/jobs/Page.js";
import JobDetails from "../views/user/jobs/Details.js";
import Message from "../views/user/message/Page.js";
import CareNetwork from "../views/user/care-network/Page.js";

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
    {
        path: routes.jobDetails+"/:id",
        layout: UserLayout,
        component: JobDetails
    },
    {
        path: routes.careNetwork,
        layout: UserLayout,
        component: CareNetwork
    },
];

export default UserRoutes;