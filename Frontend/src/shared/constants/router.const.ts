export enum RouterPath {
    HOME = "/",
    //auth
    OPTIONAL_SIGNIN = "/auth/access-account",
    SIGNUP = "/auth/signup",
    CUSTOMER_SIGNIN = "/customers/signin",
    COMPANY_SIGNIN = "/companies/signin",
    VERIFY_ACCOUNT = "/auth/verify-account",

    //admin
    DASHBOARD = "/dashboard",
    DASHBOARD_USERS = "/dashboard/manage/users",
    DASHBOARD_INPUT_SCORE = "/dashboard/input-score",

    //customer
    CUSTOMER_PROFILE = "/customers/profile",

    //company
    COMPANY_PROFILE = "/companies/profile",
}
