import { routes } from "../utlis/user/routes.utlis";
import { UserLayout } from "../layouts/user/App.js";
import Dashboard from "../views/user/dashboard/Page.js";
import ProviderDetail from "../views/user/dashboard/ProviderDetail.js";
import AdvertisementDetails from "../views/user/advertisement/Details.js";
import Jobs from "../views/user/jobs/Page.js";
import JobDetails from "../views/user/jobs/Details.js";
import Message from "../views/user/message/Page.js";
import CareNetwork from "../views/user/care-network/Page.js";
import CareNetworkDetails from "../views/user/care-network/Details.js";
import Profile from "../views/user/profile/Page.js";
import Calendar from "../views/user/calendar/Page.js";
import SubscriptionPlan from "../views/user/subscription-plan/Page.js";
import Newsletter from "../views/user/newsletter/Page.js";
import JobRequest from "../views/user/care-network/JobRequest.js";
import AppliedJob from "../views/user/care-network/AppliedJob.js";
import JobPost from "../views/user/care-network/JobPost.js";
import PostedJob from "../views/user/care-network/PostedJob.js";
import FindCare from "../views/user/jobs/FindCare.js";
import AboutUs from "../views/user/more/AboutUs.js";
import PrivacyPolicy from "../views/user/more/PrivacyPolicy.js";
import TermCondition from "../views/user/more/TermCondition.js";
import ProviderChat from "../views/user/message/ProviderChat.js";
import FindCareHomeAss from "../views/user/jobs/FindCareHomeAss.js";
import Payment from "../views/user/jobs/Payment.js";
import PaymentSuccess from "../views/user/care-network/PaymentSuccess.js";
import PaymentError from "../views/user/care-network/PaymentError.js";

var UserRoutes = [
    {
        path: routes.dashboard,
        layout: UserLayout,
        component: Dashboard
    },
    {
        path: routes.userDetail,
        layout: UserLayout,
        component: ProviderDetail
    },
    {
        path: routes.advertisementDetails,
        layout: UserLayout,
        component: AdvertisementDetails
    },
    {
        path: routes.findCare,
        layout: UserLayout,
        component: FindCare
    },
    {
        path: routes.findCareHomeAss,
        layout: UserLayout,
        component: FindCareHomeAss
    },
    {
        path: routes.message,
        layout: UserLayout,
        component: Message
    },
    {
        path: routes.userMessage,
        layout: UserLayout,
        component: ProviderChat
    },
    {
        path: routes.myJobs,
        layout: UserLayout,
        component: Jobs
    },
    {
        path: routes.jobDetails,
        layout: UserLayout,
        component: JobDetails
    },
    {
        path: routes.careNetwork,
        layout: UserLayout,
        component: CareNetwork
    },
    {
        path: routes.careNetworkDetails,
        layout: UserLayout,
        component: CareNetworkDetails
    },
    {
        path: routes.jobRequest + "/:id?",
        layout: UserLayout,
        component: JobRequest
    },
    {
        path: routes.appliedJob,
        layout: UserLayout,
        component: AppliedJob
    },
    {
        path: routes.addPost,
        layout: UserLayout,
        component: JobPost
    },
    {
        path: routes.postedJob,
        layout: UserLayout,
        component: PostedJob
    },
    {
        path: routes.payment,
        layout: UserLayout,
        component: Payment
    },
    {
        path: routes.paymentSuccess,
        layout: UserLayout,
        component: PaymentSuccess
    },
    {
        path: routes.paymentError,
        layout: UserLayout,
        component: PaymentError
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
    {
        path: routes.aboutUs,
        layout: UserLayout,
        component: AboutUs
    },
    {
        path: routes.privacyPolicy,
        layout: UserLayout,
        component: PrivacyPolicy
    },
    {
        path: routes.termsCondition,
        layout: UserLayout,
        component: TermCondition
    },
];

export default UserRoutes;