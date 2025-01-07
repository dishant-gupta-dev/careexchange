import { AdminLayout } from "../layouts/admin/App.js";
import Profile from "../views/admin/profile/Page.js";
import Dashboard from "../views/admin/dashboard/Page.js";
import AdvertisementDetails from "../views/admin/advertisement/Details.js";
import Advertisement from "../views/admin/advertisement/Page.js";
import UserManagement from "../views/admin/user-management/Page.js";
import UserManagementDetails from "../views/admin/user-management/Details.js";
import Provider from "../views/admin/provider/Page.js";
import ProviderDetails from "../views/admin/provider/Details.js";
import RegistrationRequest from "../views/admin/provider/RegistrationRequest.js";
import JobOpportunities from "../views/admin/job-opportunities/Page.js";
import JobOpportunityDetails from "../views/admin/job-opportunities/JobDetails.js";
import CareJob from "../views/admin/care-job/Page.js";
import CareJobDetails from "../views/admin/care-job/Details.js";
import CareAssessment from "../views/admin/care-assessment/Page.js";
import CareAssessmentDetails from "../views/admin/care-assessment/Details.js";
import CareAssessmentRequest from "../views/admin/care-assessment/Request.js";
import SubscriptionPlan from "../views/admin/manage-subscription-plan/Page.js";
import PaymentLog from "../views/admin/payment-logs/Page.js";
import Master from "../views/admin/master/Page.js";
import Newsletter from "../views/admin/manage-newsletter/Page.js";
import { routes } from "../utlis/admin/routes.utlis.js";


var AdminRoutes = [
    {
        path: routes.profile,
        layout: AdminLayout,
        component: Profile
    },
    {
        path: routes.dashboard,
        layout: AdminLayout,
        component: Dashboard
    },
    {
        path: routes.userManagement,
        layout: AdminLayout,
        component: UserManagement
    },
    {
        path: routes.userManagementDetail,
        layout: AdminLayout,
        component: UserManagementDetails
    },
    {
        path: routes.provider,
        layout: AdminLayout,
        component: Provider
    },
    {
        path: routes.providerRegistration,
        layout: AdminLayout,
        component: RegistrationRequest
    },
    {
        path: routes.providerDetails,
        layout: AdminLayout,
        component: ProviderDetails
    },
    {
        path: routes.jobOpportunities,
        layout: AdminLayout,
        component: JobOpportunities
    },
    {
        path: routes.jobOpportunityDetail,
        layout: AdminLayout,
        component: JobOpportunityDetails
    },
    {
        path: routes.advertisement,
        layout: AdminLayout,
        component: Advertisement
    },
    {
        path: routes.advertisementDetails,
        layout: AdminLayout,
        component: AdvertisementDetails
    },
    {
        path: routes.careJob,
        layout: AdminLayout,
        component: CareJob
    },
    {
        path: routes.careJobDetails,
        layout: AdminLayout,
        component: CareJobDetails
    },
    {
        path: routes.careAssessment,
        layout: AdminLayout,
        component: CareAssessment
    },
    {
        path: routes.careAssessmentDetail,
        layout: AdminLayout,
        component: CareAssessmentDetails
    },
    {
        path: routes.careAssessmentRequest,
        layout: AdminLayout,
        component: CareAssessmentRequest
    },
    {
        path: routes.manageSubscriptionPlan,
        layout: AdminLayout,
        component: SubscriptionPlan
    },
    {
        path: routes.paymentLogs,
        layout: AdminLayout,
        component: PaymentLog
    },
    {
        path: routes.master,
        layout: AdminLayout,
        component: Master
    },
    {
        path: routes.manageNewsletter,
        layout: AdminLayout,
        component: Newsletter
    },
];

export default AdminRoutes;