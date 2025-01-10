exports.routes = {
    login: `/sign-in`,
    signup: `/sign-up`,
    providerRegister: `/provider/sign-up`,
    dashboard: `/provider/dashboard`,
    message: `/provider/message`,
    myJobs: `/provider/jobs`,
    paymentSuccess: `/provider/jobs/payment-success`,
    paymentError: `/provider/jobs/payment-error`,
    lockedJobs: `/provider/locked/jobs`,
    jobDetails: `/provider/job/info`,
    careNetwork: `/provider/care-network`,
    addPost: `/provider/care-network/job-post`,
    postedJob: `/provider/care-network/posted-job`,
    careNetworkDetails: `/provider/care-network/info`,
    advertisement: `/provider/advertisement`,
    postedAdvertisement: `/provider/advertisement/posted`,
    advertisementDetails: `/provider/advertisement/info`,
    networkDirectory: `/provider/network-directory`,
    userDetail: `/provider/network-directory/info`,
    profile: `/provider/profile`,
    calendar: `/provider/calendar`,
    subscriptionPlan: `/provider/subscription-plan`,
    subscriptionPaymentSuccess: `/provider/subscription-plan/payment/success`,
    subscriptionPaymentError: `/provider/subscription-plan/payment/error`,
    newsletter: `/provider/newsletter`,
    aboutUs: `/provider/about-us`,
    privacyPolicy: `/provider/privacy-policy`,
    termsCondition: `/provider/terms-condition`,
    transactionList: `/transaction-history`,
}