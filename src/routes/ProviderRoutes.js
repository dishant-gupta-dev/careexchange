import { routes } from "../utlis/provider/routes.utlis";
import { ProviderLayout } from "../layouts/provider/App.js";
import Dashboard from "../views/provider/dashboard/Page.js";
import Jobs from "../views/provider/jobs/Page.js";
import Message from "../views/provider/message/Page.js";
import CareNetwork from "../views/provider/care-network/Page.js";
import Calendar from "../views/provider/calendar/Page.js";
import Newsletter from "../views/provider/newsletter/Page.js";
import Advertisement from "../views/provider/advertisement/Page.js";
import Profile from "../views/provider/profile/Page.js";
import NetworkDirectory from "../views/provider/network-directory/Page.js";
import SubscriptionPlan from "../views/provider/subscription-plan/Page.js";

var ProviderRoutes = [
    {
        path: routes.dashboard,
        exact: true,
        layout: ProviderLayout,
        component: Dashboard
    },
    {
        path: routes.message,
        exact: true,
        layout: ProviderLayout,
        component: Message
    },
    {
        path: routes.myJobs,
        exact: true,
        layout: ProviderLayout,
        component: Jobs
    },
    {
        path: routes.careNetwork,
        exact: true,
        layout: ProviderLayout,
        component: CareNetwork
    },
    {
        path: routes.advertisement,
        exact: true,
        layout: ProviderLayout,
        component: Advertisement
    },
    {
        path: routes.networkDirectory,
        exact: true,
        layout: ProviderLayout,
        component: NetworkDirectory
    },
    {
        path: routes.calendar,
        exact: true,
        layout: ProviderLayout,
        component: Calendar
    },
    {
        path: routes.newsletter,
        exact: true,
        layout: ProviderLayout,
        component: Newsletter
    },
    {
        path: routes.profile,
        exact: true,
        layout: ProviderLayout,
        component: Profile
    },
    {
        path: routes.subscriptionPlan,
        exact: true,
        layout: ProviderLayout,
        component: SubscriptionPlan
    },
];

export default ProviderRoutes;