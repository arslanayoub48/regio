import apiService from "../axios";
import * as url from "../apiUrls";

export const userRegister = async (payload) => {
  return await apiService.post(url.REGISTER_URL, payload);
};

export const userLogin = async (payload) => {
  return await apiService.post(url.LOGIN_URL, payload);
};

export const userLogout = async () => {
  return await apiService.post(url.LOGOUT_URL);
};

export const getAuth = async () => {
  return await apiService.post(url.GET_Auth_URL);
};

export const forgetPassword = async (payload) => {
  return await apiService.post(url.LOGIN_URL, payload);
};

export const sendforgetPasswordOtp = async (payload) => {
  return await apiService.post(url.SEND_FORGET_PASSWORD_OTP, payload);
};

export const verifyforgetPasswordOtp = async (payload) => {
  return await apiService.post(url.VERIFY_FORGET_PASSWORD_OTP, payload);
};

export const resetPassword = async (payload) => {
  return await apiService.post(url.RESET_PASSWORD, payload);
};

export const verifySignupOtp = async (payload) => {
  return await apiService.post(url.VERIFY_SIGNUP_OTP, payload);
};

export const acceptTermsConditions = async (payload) => {
  return await apiService.post(url.ACCEPT_TERMS_CONDITIONS, payload);
};

export const uploadModules = async (payload) => {
  return await apiService.post(url.UPLOAD_MODULE_FILES, payload);
};

export const postProductModule = async (payload, type) => {
  return await apiService.post(url.POST_PRODUCT(type), payload);
};

export const updateProductModule = async (payload, slug, id) => {
  return await apiService.put(url.UPDATE_MODULE(slug, id), payload);
};

export const getScopeUsers = async (payload) => {
  return await apiService.post(url.SCOPE_USERS);
};

export const getAdminUsers = async (page, search) => {
  return await apiService.post(
    `${url.ADMIN_USERS}?page=${page || 1}&perPage=15&search=${search || ""}`
  );
};

export const getVisibilityRegions = async () => {
  return await apiService.post(url.VISIBILTY_REGIONS);
};

export const getProductsRecords = async (slug, page, search) => {
  return await apiService.get(
    `${url.GET_PRODUCTS(slug)}?page=${page || 1}&perPage=15&search=${
      search || ""
    }&slug=${slug}`
  );
};

export const getUsers = async (page, search) => {
  return await apiService.get(
    `${url.GET_USERS}?page=${page || 1}&perPage=15&search=${search || ""}`
  );
};

export const getStatistics = async (page, search) => {
  return await apiService.get(
    `${url.GET_STATISTICS}?page=${page || 1}&perPage=15&search=${search || ""}`
  );
};

export const getLevels = async (page, search) => {
  return await apiService.get(
    `${url.LEVELS_ENDPOINT}?page=${page || 1}&perPage=15&search=${search || ""}`
  );
};

export const deleteLevelRequest = async (id) => {
  return await apiService.delete(`${url.LEVELS_ENDPOINT}/${id}`);
};

export const sendMailRequest = async (payload) => {
  return await apiService.post(`${url.SEND_MAIL_ENDPOINT}`, payload);
};

export const RegionDataValidate = async (payload) => {
  return await apiService.post(`${url.REGION_DATA_VALIDATE_ENDPOINT}`, payload);
};

export const RegisterRegion = async (payload) => {
  return await apiService.post(`${url.REGISTER_ENDPOINT}`, payload);
};

export const getCountries = async () => {
  return await apiService.post(`${url.COUNTRIES_ENDPOINT}`);
};

export const getPayments = async () => {
  return await apiService.post(`${url.COUNTRIES_ENDPOINT}`);
};

export const editLevels = async (payload, id) => {
  return await apiService.put(`${url.LEVELS_ENDPOINT}/${id}`, payload);
};

export const postLevel = async (payload) => {
  return await apiService.post(`${url.LEVELS_ENDPOINT}`, payload);
};

export const getSingleModuleRecord = async (slug, id) => {
  return await apiService.get(`${url.GET_SINGLE_MODULE(slug, id)}`);
};

export const deleteSingleModuleRecord = async (slug, id) => {
  return await apiService.delete(`${url.DELETE_SINGLE_MODULE(slug, id)}`);
};

export const getModulesInProfile = async (slug, id) => {
  return await apiService.get(`/api/module/${slug}/getAll?user_id=${id}`);
};

export const sendTransaction = async (payload) => {
  return await apiService.post(`/api/common/transaction`, payload);
};

export const transactionListing = async (type, page) => {
  return await apiService.get(
    type == "get-all"
      ? `/api/common/transaction?page=${page || 1}&perPage=10`
      : `/api/common/transaction/${type}?perPage=10`
  );
};

export const updateUser = async (id, payload) => {
  return await apiService.post(`${url.AUTH_UPDATE}${id}`, payload);
};

export const getLanguages = async () => {
  return await apiService.post(`${url.LANGUAGES_ENDPOINT}`);
};

export const getFeeProjects = async (page) => {
  return await apiService.post(
    `${url.FEE_PROJECT_ENDPOINT}?page=${page || 1}&perPage=10`
  );
};

export const getRegions = async (page) => {
  return await apiService.post(
    `${url.GET_REGIONS_ENDPOINT}?page=${page || 1}&perPage=10`
  );
};

export const getStatuses = async () => {
  return await apiService.post(url.GET_STATUSES_ENDPOINT);
};

export const updateUserProfile = async (payload) => {
  return await apiService.post(`${url.UPDATE_USER}${payload.id}`, payload);
};
