export const profileUpdateValues = {
  userBasic: {
    street: "",
    total_activity_minutes: "",
    total_activity_fiat: "",
    about: "",
    zip_code: "",
    village: "",
    reference_text: "",
    phone_no: "",
  },
  selectListValues: {
    language_id: "",
    user_level_id: "",
    region_ids: [],
    fee_to_project_id: "",
    country_id: "",
    status_id: "",
    guide_id: "",
    translation_language_id: "",
  },
  mainValues: {
    first_name: "",
    last_name: "",
    email: "",
    pin: "",
    fee_plan_id: 1,
  },
  booleanValues: {
    is_otp_verified: false,
    agreed_terms: false,
  },
  initialValues: function () {
    return {
      ...profileUpdateValues.mainValues,
      ...profileUpdateValues.userBasic,
      ...profileUpdateValues.selectListValues,
      ...profileUpdateValues.booleanValues,
    };
  },
};
