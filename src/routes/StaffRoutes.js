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
import AdvertisementDetails from "../views/staff/advertisement/Details.js";
import Profile from "../views/staff/profile/Page.js";
import NetworkDirectory from "../views/staff/network-directory/Page.js";
import SubscriptionPlan from "../views/staff/subscription-plan/Page.js";
import AppliedJob from "../views/staff/care-network/AppliedJob.js";
import PostedAds from "../views/staff/advertisement/PostedAds.js";
import AboutUs from "../views/staff/more/AboutUs.js";
import PrivacyPolicy from "../views/staff/more/PrivacyPolicy.js";
import TermCondition from "../views/staff/more/TermCondition.js";

var StaffRoutes = [
    {
        path: routes.dashboard,
        layout: StaffLayout,
        component: Dashboard
    },
    {
        path: routes.message,
        layout: StaffLayout,
        component: Message
    },
    {
        path: routes.myJobs,
        layout: StaffLayout,
        component: Jobs
    },
    {
        path: routes.jobDetails+"/:id",
        layout: StaffLayout,
        component: JobDetails
    },
    {
        path: routes.careNetwork,
        layout: StaffLayout,
        component: CareNetwork
    },
    {
        path: routes.careNetworkDetails+"/:id",
        layout: StaffLayout,
        component: CareNetworkDetails
    },
    {
        path: routes.appliedJob,
        layout: StaffLayout,
        component: AppliedJob
    },
    {
        path: routes.advertisement,
        layout: StaffLayout,
        component: Advertisement
    },
    {
        path: routes.postedAdvertisement,
        layout: StaffLayout,
        component: PostedAds
    },
    {
        path: routes.advertisementDetails+"/:id",
        layout: StaffLayout,
        component: AdvertisementDetails
    },
    {
        path: routes.networkDirectory,
        layout: StaffLayout,
        component: NetworkDirectory
    },
    {
        path: routes.calendar,
        layout: StaffLayout,
        component: Calendar
    },
    {
        path: routes.newsletter,
        layout: StaffLayout,
        component: Newsletter
    },
    {
        path: routes.profile,
        layout: StaffLayout,
        component: Profile
    },
    {
        path: routes.subscriptionPlan,
        layout: StaffLayout,
        component: SubscriptionPlan
    },
    {
        path: routes.aboutUs,
        layout: StaffLayout,
        component: AboutUs
    },
    {
        path: routes.privacyPolicy,
        layout: StaffLayout,
        component: PrivacyPolicy
    },
    {
        path: routes.termsCondition,
        layout: StaffLayout,
        component: TermCondition
    },
];

export default StaffRoutes;