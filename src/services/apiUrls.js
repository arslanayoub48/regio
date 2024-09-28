export const LOGIN_URL = "auth/login";
export const LOGOUT_URL = "auth/logout";
export const GET_Auth_URL = "auth/me";
export const AUTH_UPDATE = "/auth/update/";
export const REGISTER_URL = "auth/register";
export const FORGET_PASSWORD = "auth/register";
export const SEND_FORGET_PASSWORD_OTP = "auth/send-forgot-password-otp";
export const VERIFY_FORGET_PASSWORD_OTP = "auth/verify-forgot-password-otp";
export const RESET_PASSWORD = "auth/reset-password";
export const VERIFY_SIGNUP_OTP = "auth/verify-registration-otp";
export const ACCEPT_TERMS_CONDITIONS = "auth/accept-term";
export const UPLOAD_MODULE_FILES = "/api/common/upload-module-files";
export const ADMIN_USERS = "/api/common/admin-users";
export const GET_USERS = "/api/admin/users";
export const GET_STATISTICS = "/api/admin/statistics";
export const LEVELS_ENDPOINT = "/api/admin/levels";
export const SEND_MAIL_ENDPOINT = "/api/admin/send-mails";
export const FEE_PROJECT_ENDPOINT = "/api/common/fee-project";
export const LANGUAGES_ENDPOINT = "/api/common/languages";
export const UPDATE_USER = "/api/admin/user-update/";
export const REGION_DATA_VALIDATE_ENDPOINT =
  "/auth/register-region-data-validate";
export const GET_REGIONS_ENDPOINT = "/api/common/get-regions";
export const REGISTER_ENDPOINT = "/auth/register-region";
export const COUNTRIES_ENDPOINT = "/api/common/countries";
export const GET_STATUSES_ENDPOINT = "/api/common/get-statuses";
export const POST_PRODUCT = (slug) =>
  `/api/module/${slug == "products" ? "product" : slug}/store`;
export const UPDATE_MODULE = (slug, id) => `/api/module/${slug}/update/${id}`;
export const SCOPE_USERS = "/api/common/scope-users";
export const VISIBILTY_REGIONS = "/api/common/visibility-regions";
export const GET_PRODUCTS = (slug) =>
  `/api/module/${slug == "products" ? "product" : slug}/getAll`;
export const GET_SINGLE_MODULE = (slug, id) => `/api/module/${slug}/show/${id}`;
export const DELETE_SINGLE_MODULE = (slug, id) =>
  `/api/module/${slug}/delete/${id}`;
