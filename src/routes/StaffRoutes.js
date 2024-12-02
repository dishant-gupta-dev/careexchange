import { routes } from "../utlis/staff/routes.utlis";
import { StaffLayout } from "../layouts/staff/App.js";
import Dashboard from "../views/staff/dashboard/Page.js";
import Jobs from "../views/staff/jobs/Page.js";
import JobDetails from "../views/staff/jobs/Details.js";
import Message from "../views/staff/message/Page.js";
import CareNetwork from "../views/staff/care-network/Page.js";
import CareNetworkDetails from "../views/staff/care-network/Details.js";
import Calendar from "../views/staff/calendar/Page.js";
import Newsletter from "../views/staff/newsletter/Page.js";
import Advertisement from "../views/staff/advertisement/Page.js";
import Profile from "../views/staff/profile/Page.js";
import NetworkDirectory from "../views/staff/network-directory/Page.js";
import SubscriptionPlan from "../views/staff/subscription-plan/Page.js";

var StaffRoutes = [
    {
        path: routes.dashboard,
        exact: true,
        layout: StaffLayout,
        component: Dashboard
    },
    {
        path: routes.message,
        exact: true,
        layout: StaffLayout,
        component: Message
    },
    {
        path: routes.myJobs,
        exact: true,
        layout: StaffLayout,
        component: Jobs
    },
    {
        path: routes.careNetwork,
        exact: true,
        layout: StaffLayout,
        component: CareNetwork
    },
    {
        path: routes.advertisement,
        exact: true,
        layout: StaffLayout,
        component: Advertisement
    },
    {
        path: routes.networkDirectory,
        exact: true,
        layout: StaffLayout,
        component: NetworkDirectory
    },
    {
        path: routes.calendar,
        exact: true,
        layout: StaffLayout,
        component: Calendar
    },
    {
        path: routes.newsletter,
        exact: true,
        layout: StaffLayout,
        component: Newsletter
    },
    {
        path: routes.profile,
        exact: true,
        layout: StaffLayout,
        component: Profile
    },
    {
        path: routes.subscriptionPlan,
        exact: true,
        layout: StaffLayout,
        component: SubscriptionPlan
    },
];

export default StaffRoutes;