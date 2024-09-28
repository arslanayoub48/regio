import moment from "moment";
import Swal from "sweetalert2";
import {
  getAdminUsers,
  getCountries,
  getScopeUsers,
} from "../services/api/user";

export const isEmpty = (value) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  if (value == null || value == undefined || value == "undefined") {
    return true;
  }
  if (value != null && typeof value !== "function" && Array.isArray(value)) {
    return !value.length;
  }
  if (typeof value === "object") {
    return !Object.keys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};

// Function to set a cookie with an expiration time
export function setCookie(name, value, hours) {
  if (typeof document !== "undefined") {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }
}

// Function to get the value of a cookie by name
export function getCookie(name) {
  if (typeof document !== "undefined") {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  }
  return "";
}

// Function to remove a cookie by name
export function removeCookie(name) {
  if (typeof document !== "undefined") {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

// Show Toast Errors

export const showErrors = (errors) => {
  let str = "";
  if (errors?.errors) {
    Object.keys(errors?.errors).forEach((list) => {
      str += errors?.errors[list].join(", ");
    });
    return str;
  } else if (errors?.message) {
    return errors.message;
  } else {
    return "Something went wrong";
  }
};

// Get Time Ago
export function timeAgo(createdAt) {
  const now = moment();
  const diffInYears = now.diff(createdAt, "years");

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = now.diff(createdAt, "months");

  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = now.diff(createdAt, "weeks");

  if (diffInWeeks > 0) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  }

  const diffInDays = now.diff(createdAt, "days");

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInHours = now.diff(createdAt, "hours");

  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = now.diff(createdAt, "minutes");

  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInSeconds = now.diff(createdAt, "seconds");
  return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
}

export const generateLink = (url) => {
  return process.env.REACT_APP_BACKEND_BASE_URL + url;
};

export const ConfirmDeleteModule = (onConfirm, title, data) => {
  Swal.fire({
    icon: "warning",
    text: `Are you sure you want to delete ${title}`,
    showCancelButton: true,
    confirmButtonText: "Yes Delete it",
    confirmButtonColor: "#78ab44",
    allowOutsideClick: () => !Swal.isLoading(),
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (data) {
        onConfirm(data);
      } else {
        onConfirm();
      }
    }
  });
};

export const loadAdminUsersData = async (e) => {
  const initialOptions = await getAdminUsers(1, e);
  const result = initialOptions.data?.data;
  return result.map((x) => {
    return { label: x.hex_name, value: x.id };
  });
};

export const loadScopeUsers = async (e) => {
  const initialOptions = await getScopeUsers(1, 10);
  const result = initialOptions.data?.data;
  return result.map((x) => {
    return { label: x.hex_name, value: x.id };
  });
};

export const fetchCountries = async (e) => {
  try {
    const res = await getCountries();
    return res.data.data
      .map((item) => {
        return { label: item.name, value: item.id };
      })
      .filter((x) => x.label.toLowerCase().includes(e.toLowerCase()));
  } catch (errors) {}
};

export const fecthSelectModule = async (e, _request) => {
  try {
    const res = await _request();
    return res.data.data
      .map((item) => {
        return {
          label: item.title || item.name || item.hex_name,
          value: item.id,
        };
      })
      .filter((x) => x.label.toLowerCase().includes(e.toLowerCase()));
  } catch (errors) {}
};
