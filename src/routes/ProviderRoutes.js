import { routes } from "../utlis/provider/routes.utlis";
import { ProviderLayout } from "../layouts/provider/App.js";
import Dashboard from "../views/provider/dashboard/Page.js";
import Jobs from "../views/provider/jobs/Page.js";
import LockedJob from "../views/provider/jobs/LockedJob.js";
import JobDetails from "../views/provider/jobs/Details.js";
import Message from "../views/provider/message/Page.js";
import CareNetwork from "../views/provider/care-network/Page.js";
import CareNetworkDetails from "../views/provider/care-network/Details.js";
import Calendar from "../views/provider/calendar/Page.js";
import Newsletter from "../views/provider/newsletter/Page.js";
import Advertisement from "../views/provider/advertisement/Page.js";
import AdvertisementDetails from "../views/provider/advertisement/Details.js";
import PostedAds from "../views/provider/advertisement/PostedAds.js";
import Profile from "../views/provider/profile/Page.js";
import NetworkDirectory from "../views/provider/network-directory/Page.js";
import SubscriptionPlan from "../views/provider/subscription-plan/Page.js";
import AboutUs from "../views/provider/more/AboutUs.js";
import PrivacyPolicy from "../views/provider/more/PrivacyPolicy.js";
import TermCondition from "../views/provider/more/TermCondition.js";
import JobPost from "../views/provider/care-network/JobPost.js";
import PostedJob from "../views/provider/care-network/PostedJob.js";
import PaymentSuccess from "../views/provider/jobs/PaymentSuccess.js";
import PaymentError from "../views/provider/jobs/PaymentError.js";
import SubscriptionPaymentSuccess from "../views/provider/subscription-plan/PaymentSuccess.js";
import SubscriptionPaymentError from "../views/provider/subscription-plan/PaymentError.js";
import ProviderDetail from "../views/provider/network-directory/ProviderDetail.js";

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
        path: routes.paymentSuccess,
        layout: ProviderLayout,
        component: PaymentSuccess
    },
    {
        path: routes.paymentError,
        layout: ProviderLayout,
        component: PaymentError
    },
    {
        path: routes.lockedJobs,
        layout: ProviderLayout,
        component: LockedJob
    },
    {
        path: routes.jobDetails,
        layout: ProviderLayout,
        component: JobDetails
    },
    {
        path: routes.careNetwork,
        layout: ProviderLayout,
        component: CareNetwork
    },
    {
        path: routes.careNetworkDetails,
        layout: ProviderLayout,
        component: CareNetworkDetails
    },
    {
        path: routes.addPost,
        layout: ProviderLayout,
        component: JobPost
    },
    {
        path: routes.postedJob,
        layout: ProviderLayout,
        component: PostedJob
    },
    {
        path: routes.advertisement,
        layout: ProviderLayout,
        component: Advertisement
    },
    {
        path: routes.postedAdvertisement,
        layout: ProviderLayout,
        component: PostedAds
    },
    {
        path: routes.advertisementDetails,
        layout: ProviderLayout,
        component: AdvertisementDetails
    },
    {
        path: routes.networkDirectory,
        layout: ProviderLayout,
        component: NetworkDirectory
    },
    {
        path: routes.userDetail,
        layout: ProviderLayout,
        component: ProviderDetail
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
    {
        path: routes.subscriptionPaymentSuccess,
        layout: ProviderLayout,
        component: SubscriptionPaymentSuccess
    },
    {
        path: routes.subscriptionPaymentError,
        layout: ProviderLayout,
        component: SubscriptionPaymentError
    },
    {
        path: routes.aboutUs,
        layout: ProviderLayout,
        component: AboutUs
    },
    {
        path: routes.privacyPolicy,
        layout: ProviderLayout,
        component: PrivacyPolicy
    },
    {
        path: routes.termsCondition,
        layout: ProviderLayout,
        component: TermCondition
    },
];

export default ProviderRoutes;