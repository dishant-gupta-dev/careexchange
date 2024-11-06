import { routes } from "../utlis/user/routes.utlis";
import { UserLayout } from "../layouts/user/App.js";
import Dashboard from "../views/user/dashboard/Page.js";
import Jobs from "../views/user/jobs/Page.js";
import JobDetails from "../views/user/jobs/Details.js";
import Message from "../views/user/message/Page.js";
import CareNetwork from "../views/user/care-network/Page.js";
import CareNetworkDetails from "../views/user/care-network/Details.js";
import Profile from "../views/user/profile/Page.js";
import Calendar from "../views/user/calendar/Page.js";
import SubscriptionPlan from "../views/user/subscription-plan/Page.js";
import Newsletter from "../views/user/newsletter/Page.js";

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
    {
        path: routes.careNetworkDetails+"/:id",
        layout: UserLayout,
        component: CareNetworkDetails
    },
    {
        path: routes.profile,
        layout: UserLayout,
        component: Profile
    },
    {
        path: routes.calendar,
        layout: UserLayout,
        component: Calendar
    },
    {
        path: routes.subscriptionPlan,
        layout: UserLayout,
        component: SubscriptionPlan
    },
    {
        path: routes.newsletter,
        layout: UserLayout,
        component: Newsletter
    },
];

export default UserRoutes;