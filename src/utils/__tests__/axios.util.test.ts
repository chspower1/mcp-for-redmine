import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../axios.util";

describe("Axios Utility", () => {
  let mock: MockAdapter;
  const originalEnv = process.env;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.REDMINE_API_KEY = "test-api-key";
    process.env.REDMINE_BASE_URL = "https://redmine.example.com";
  });

  afterEach(() => {
    mock.restore();
    process.env = originalEnv;
  });

  it("should use default httpsAgent when REDMINE_TLS_VERIFY is not set", async () => {
    mock.onGet("/test").reply(200);

    await axiosInstance.get("/test");

    // Since we can't easily inspect the internal config of the executed request in the mock adapter without a bit of work,
    // we can check if the interceptor logic runs without error.
    // Ideally, we would check the config passed to the request.
    // However, axios-mock-adapter doesn't expose the config in a way that shows the httpsAgent easily for verification
    // unless we inspect the history.

    expect(mock.history.get.length).toBe(1);
    const config = mock.history.get[0];
    expect(config.httpsAgent).toBeUndefined();
  });

  it("should use default httpsAgent when REDMINE_TLS_VERIFY is true", async () => {
    process.env.REDMINE_TLS_VERIFY = "true";
    mock.onGet("/test").reply(200);

    await axiosInstance.get("/test");

    expect(mock.history.get.length).toBe(1);
    const config = mock.history.get[0];
    expect(config.httpsAgent).toBeUndefined();
  });

  it("should set rejectUnauthorized to false when REDMINE_TLS_VERIFY is false", async () => {
    process.env.REDMINE_TLS_VERIFY = "false";
    mock.onGet("/test").reply(200);

    await axiosInstance.get("/test");

    expect(mock.history.get.length).toBe(1);
    const config = mock.history.get[0];
    expect(config.httpsAgent).toBeDefined();
    expect(config.httpsAgent.options.rejectUnauthorized).toBe(false);
  });

  it("should set rejectUnauthorized to false when REDMINE_TLS_VERIFY is 0", async () => {
    process.env.REDMINE_TLS_VERIFY = "0";
    mock.onGet("/test").reply(200);

    await axiosInstance.get("/test");

    expect(mock.history.get.length).toBe(1);
    const config = mock.history.get[0];
    expect(config.httpsAgent).toBeDefined();
    expect(config.httpsAgent.options.rejectUnauthorized).toBe(false);
  });
});
