import { routes } from "../utlis/provider/routes.utlis";
import { ProviderLayout } from "../layouts/provider/App.js";
import Dashboard from "../views/provider/dashboard/Page.js";
import Jobs from "../views/provider/jobs/Page.js";
import JobDetails from "../views/provider/jobs/Details.js";
import Message from "../views/provider/message/Page.js";
import CareNetwork from "../views/provider/care-network/Page.js";
import CareNetworkDetails from "../views/provider/care-network/Details.js";
import Calendar from "../views/provider/calendar/Page.js";
import Newsletter from "../views/provider/newsletter/Page.js";
import Advertisement from "../views/provider/advertisement/Page.js";
import Profile from "../views/provider/profile/Page.js";
import NetworkDirectory from "../views/provider/network-directory/Page.js";
import SubscriptionPlan from "../views/provider/subscription-plan/Page.js";

var ProviderRoutes = [
    {
        path: routes.dashboard,
        layout: ProviderLayout,
        component: Dashboard
    },
    {
        path: routes.message,
        layout: ProviderLayout,
        component: Message
    },
    {
        path: routes.myJobs,
        layout: ProviderLayout,
        component: Jobs
    },
    {
        path: routes.jobDetails+"/:id",
        layout: ProviderLayout,
        component: JobDetails
    },
    {
        path: routes.careNetwork,
        layout: ProviderLayout,
        component: CareNetwork
    },
    {
        path: routes.careNetworkDetails+"/:id",
        layout: ProviderLayout,
        component: CareNetworkDetails
    },
    {
        path: routes.advertisement,
        layout: ProviderLayout,
        component: Advertisement
    },
    {
        path: routes.networkDirectory,
        layout: ProviderLayout,
        component: NetworkDirectory
    },
    {
        path: routes.calendar,
        layout: ProviderLayout,
        component: Calendar
    },
    {
        path: routes.newsletter,
        layout: ProviderLayout,
        component: Newsletter
    },
    {
        path: routes.profile,
        layout: ProviderLayout,
        component: Profile
    },
    {
        path: routes.subscriptionPlan,
        layout: ProviderLayout,
        component: SubscriptionPlan
    },
];

export default ProviderRoutes;