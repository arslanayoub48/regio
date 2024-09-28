import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password field is required")
    .min(8, "Password should be at least 8 characters"),
});

export const levelsSchema = yup.object().shape({
  title: yup.string().required("Title field is required"),
  threshold: yup
    .number()
    .typeError("Threshold should be in numbers")
    .required("Threshold field is required"),
  limit_minutes: yup
    .number()
    .typeError("Limit minutes should be in numbers")
    .required("Limit minutes field is required"),
  limit_regio: yup
    .number()
    .typeError("Limit Regio should be in numbers")
    .required("Limit Regio field is required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password field is required")
    .min(8, "Password should be minimum 8 characters long")
    .max(32, "Password should be less than 32 characters long"),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Confirm Password must match."),
  first_name: yup.string().required("Please give your first name"),
  last_name: yup.string().required("Please give your first name"),
  street: yup.string().required("Please Enter Street"),
  zip_code: yup.number().required("Zip is required").nullable(),
  village: yup.string().required("Village is required").nullable(),
  phone_no: yup.string().required("Phone number is required"),
  reference_text: yup.string().required("Reference text is required"),
});

const commonAttachments = {
  attachments: yup
    .array()
    .of(
      yup.object().shape({
        original_name: yup
          .string()
          .required("Attachment original name is required"),
        name: yup.string().required("Attachment name is required"),
        path: yup.string().required("Attachment path is required"),
        type: yup.string().required("Attachment type is required"),
        is_primary: yup.boolean().default(false),
      })
    )
    .min(1, "At least one attachment is required")
    .required("Attachments are required"),
};

export const sendMailValidation = yup.object().shape({
  user_ids: yup
    .array()
    .test(
      "conditional-validation",
      "Please select at least one user",
      function (value) {
        const sendToAll = this.parent.send_to_all;
        if (!sendToAll) {
          return value && value.length > 0;
        }
        return true;
      }
    ),
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters "),
  message: yup.string().required("Message is required"),
  send_to_all: yup.boolean(),
});

const priceModules = {
  price_in_minutes: yup
    .number()
    .typeError("Price in minutes must be a number")
    .integer("Price in minutes must be a number")
    .required("Price in minutes is required"),
  price_in_regio: yup
    .number()
    .typeError("Price in regio must be a number")
    .required("Price in regio is required"),
};

const eventsModules = {
  location: yup.string().required("Location is required"),
  event_mode_id: yup.string().required("Mode is required"),
  interval: yup.string().required("Interval is required"),
  start_time: yup.string().required("Start Time is required"),
  end_time: yup.string().required("End Time is required"),
};

const scopeModules = {
  scope_users: yup
    .array()
    .of(yup.object())
    .min(1, "At least one scope user is required")
    .required("Scope users are required"),
  visibility_region_id: yup
    .object()
    .required("Visibility region ID is required"),
};

const CommonModules = {
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  user_id: yup.object(),
};

export const moduleSchema = yup.object().shape({
  ...CommonModules,
  ...commonAttachments,
  ...scopeModules,
});

const productSchema = yup.object().shape({
  ...CommonModules,
  ...scopeModules,
  ...commonAttachments,
  ...priceModules,
});

export const eventSchema = yup.object().shape({
  ...scopeModules,
  ...CommonModules,
  ...eventsModules,
  ...commonAttachments,
  ...priceModules,
});

export const foodEventSchema = yup.object().shape({
  ...scopeModules,
  ...CommonModules,
  location: eventsModules.location,
  start_time: eventsModules.start_time,
  end_time: eventsModules.end_time,
  ...commonAttachments,
});

export const ordersSchema = yup.object().shape({
  ...scopeModules,
  ...CommonModules,
  location: eventsModules.location,
  start_time: eventsModules.start_time,
  end_time: eventsModules.end_time,
  interval: eventsModules.interval,
  ...commonAttachments,
});

export const searchFindSchema = yup.object().shape({
  ...scopeModules,
  ...CommonModules,
});

export const RegionStep1Schema = yup.object().shape({
  full_name: yup.string().required("Region name is required"),
  country_id: yup.object().required("Country is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Owner email is required"),
});

// Step 2 Schema
export const RegionStep2Schema = yup.object().shape({
  full_region_name: yup.string().required("Full region name is required"),
  local_email: yup
    .string()
    .email("Invalid email format")
    .required("Region email is required"),
  hex_id: yup.string().required("Region number is required"),
});

// Payment Step 1 Schema

export const PaymentStep1Schema = yup
  .object()
  .shape({
    user_id: yup.object().required("User id is required"),
    purpose: yup.string().required("Purpose/Reference is required"),
    transferred_minutes: yup.string(),
    transferred_fiat: yup.string(),
  })
  .transform(function (current, original) {
    if (!original?.transferred_minutes && !original?.transferred_fiat) {
      this.fields.transferred_minutes = yup
        .number()
        .typeError("Amount in minutes should be a number")
        .required("Amount in minutes is required");
      this.fields.transferred_fiat = yup
        .number()
        .required("Amount in regio is required")
        .typeError("Amount in regio should be a number");
    }
    if (original?.transferred_minutes) {
      if (Number.isInteger(parseInt(original?.transferred_minutes))) {
        if (!original.transferred_fiat) {
          this.fields.transferred_fiat = yup.string().nullable();
        } else if (!Number.isInteger(parseInt(original?.transferred_fiat))) {
          this.fields.transferred_fiat = yup
            .number()
            .required("Amount in regio is required")
            .typeError("Amount in regio should be a number");
        } else {
          this.fields.transferred_fiat = yup.string().nullable();
        }
      } else {
        if (Number.isInteger(parseInt(original?.transferred_fiat))) {
          this.fields.transferred_fiat = yup.string().nullable();
          if (
            original?.transferred_minutes &&
            Number.isInteger(parseInt(original?.transferred_minutes))
          ) {
            this.fields.transferred_minutes = yup.string().nullable();
          }
        } else {
          this.fields.transferred_fiat = yup
            .number()
            .required("Amount in regio is required")
            .typeError("Amount in regio should be a number");
        }
      }
    }
    if (original?.transferred_fiat) {
      if (Number.isInteger(parseInt(original?.transferred_fiat))) {
        if (!original.transferred_minutes) {
          this.fields.transferred_minutes = yup.string().nullable();
        } else if (!Number.isInteger(parseInt(original?.transferred_minutes))) {
          this.fields.transferred_minutes = yup
            .number()
            .required("Amount in regio is required")
            .typeError("Amount in regio should be a number");
        } else {
          this.fields.transferred_minutes = yup.string().nullable();
        }
      } else {
        if (Number.isInteger(parseInt(original?.transferred_minutes))) {
          this.fields.transferred_minutes = yup.string().nullable();
          if (
            original?.transferred_fiat &&
            Number.isInteger(parseInt(original?.transferred_fiat))
          ) {
            this.fields.transferred_fiat = yup.string().nullable();
          }
        } else {
          this.fields.transferred_minutes = yup
            .number()
            .required("Amount in regio is required")
            .typeError("Amount in regio should be a number");
        }
      }
    }
    return current;
  });

//Payment step 2
export const PaymentStep2Schema = yup.object().shape({
  pin: yup
    .number()
    .typeError("Pin should be type of number")
    .required("Pin is required")
    .min(3, "Pin should be atleast 3 characters"),
});

export const updateProfileDataSchema = yup.object().shape({
  phone_no: yup.string().required("Phone number is required"),
  street: yup.string().required("Street is required"),
  zip_code: yup.string().required("ZIP code is required"),
  reference_text: yup.string(),
  village: yup.string().required("Village is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  village: yup.string().required("Village is required"),
  country_id: yup.object(),
  pin: yup
    .string()
    .required("Pin is required")
    .min(5, "Pin should be at least 5 characters."),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password should be atleast 6 characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const userUpdateSchema = yup.object().shape({
  street: yup.string().required("Street is required"),
  total_activity_minutes: yup
    .number()
    .typeError("Total Minutes must be a number")
    .integer("Total Minutes must be a number")
    .required("Total Minutes is required"),
  total_activity_fiat: yup
    .number()
    .typeError("Total Regio must be a number")
    .required("Total in Regio is required"),
  about: yup.string().nullable(),
  zip_code: yup.string().required("Zip code is required"),
  village: yup.string().required("Village is required"),
  reference_text: yup.string().nullable(),
  phone_no: yup.string().required("Phone number is required"),
  language_id: yup.object().required("Language is required"),
  user_level_id: yup.object().required("Level is required"),
  region_ids: yup
    .array()
    .of(yup.object())
    .min(1, "At least one region is required")
    .required("Regions are required"),
  fee_plan_id: yup.object(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  pin: yup.string().nullable(),
  is_otp_verified: yup.boolean(),
  agreed_terms: yup.boolean(),
  country_id: yup.object().required("Country is required"),
  status_id: yup.object().required("Status is required"),
  translation_language_id: yup.object().required("Language is required"),
  guide_id: yup.object(),
  fee_to_project: yup.object(),
});

export default productSchema;
