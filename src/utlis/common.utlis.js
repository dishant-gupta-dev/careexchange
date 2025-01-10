import { Navigate } from "react-router-dom";
import ApiService from "../core/services/ApiService";
import { routes } from "./provider/routes.utlis";

export const status = (Id) => {
  let statusId = parseInt(Id);
  if (statusId === 0) return "Pending";
  else if (statusId === 1) return "Active";
  else if (statusId === 2) return "Inactive";
  else if (statusId === 3) return "Suspended";
  else if (statusId === 4) return "Deleted";
};

export const bookingStatus = (Id) => {
  let statusId = parseInt(Id);
  if (statusId === 0) return "Pending";
  else if (statusId === 1) return "Confirm";
  else if (statusId === 3) return "Rejected";
};

export const userType = (Id) => {
  let statusId = parseInt(Id);
  if (statusId === 4) return "Admin";
  else if (statusId === 1) return "User";
  else if (statusId === 2) return "Provider";
  else if (statusId === 3) return "Staff";
};

export const LIMIT = 10;
export const providerLIMIT = 3;
export const adsLIMIT = 5;
export const CommonMiles = "1000"; //  1000 Miles
export const SingleFile = 2; //  2MB
export const MultipleFile = 5; //  5MB
export const GeolocationApiKey = "AIzaSyB7FaWV_op0bNaxtZPe_m7OHjBFs1C4o2A";
export const DefaultMoney = 1; //  1$

export const totalPageCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= Math.ceil(total / limit); x++) {
    pages.push(x);
  }
  return pages;
};

export const subscribtionAuth = async (api, navigate) => {
  const response = await ApiService.getAPIWithAccessToken(api);
  if (response.data.status && response.data.statusCode === 200) {
    if (!response.data.data.isSubscribed) {
      navigate(routes.subscriptionPlan);
    }
  }
};
