import axios from "axios";
import "dotenv/config";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const REDMINE_API_KEY = process.env.REDMINE_API_KEY;
    const REDMINE_BASE_URL = process.env.REDMINE_BASE_URL;
    const REDMINE_TLS_VERIFY = process.env.REDMINE_TLS_VERIFY;

    if (!REDMINE_API_KEY || !REDMINE_BASE_URL) {
      throw new Error(
        "Redmine API Key or Base URL is not defined. Please configure them in your .env file."
      );
    }

    config.baseURL = REDMINE_BASE_URL;
    config.headers["X-Redmine-API-Key"] = REDMINE_API_KEY;
    config.headers["Content-Type"] = "application/json";

    if (REDMINE_TLS_VERIFY === "false" || REDMINE_TLS_VERIFY === "0") {
      const https = require("https");
      config.httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
