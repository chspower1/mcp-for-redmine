import axios from "axios";
import "dotenv/config";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const REDMINE_API_KEY = process.env.REDMINE_API_KEY;
    const REDMINE_BASE_URL = process.env.REDMINE_BASE_URL;

    if (!REDMINE_API_KEY || !REDMINE_BASE_URL) {
      throw new Error(
        "Redmine API Key or Base URL is not defined. Please configure them in your .env file."
      );
    }

    config.baseURL = REDMINE_BASE_URL;
    config.headers["X-Redmine-API-Key"] = REDMINE_API_KEY;
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
