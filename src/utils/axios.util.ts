import axios from "axios";

const REDMINE_API_KEY = process.env.REDMINE_API_KEY;
const REDMINE_BASE_URL = process.env.REDMINE_BASE_URL;

if (!REDMINE_API_KEY || !REDMINE_BASE_URL) {
  throw new Error("Redmine API Key or Base URL is not defined in environment variables.");
}

export const axiosInstance = axios.create({
  baseURL: REDMINE_BASE_URL,
  headers: {
    "X-Redmine-API-Key": REDMINE_API_KEY,
    "Content-Type": "application/json",
  },
});
