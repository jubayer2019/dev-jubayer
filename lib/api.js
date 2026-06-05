import axios from "axios";

function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredBaseUrl) {
    return "/api";
  }

  if (configuredBaseUrl.startsWith("/")) {
    return configuredBaseUrl.replace(/\/+$/, "") || "/api";
  }

  try {
    return new URL(configuredBaseUrl).origin;
  } catch {
    return configuredBaseUrl.replace(/\/+$/, "");
  }
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

export async function fetchServices() {
  const { data } = await api.get("/services");
  return data.services || [];
}

export async function submitContactMessage(payload) {
  const { data } = await api.post("/contact", payload);
  return data;
}

export async function fetchDashboardOrders() {
  const { data } = await api.get("/orders");
  return data.orders || [];
}

export async function fetchDashboardUsers() {
  const { data } = await api.get("/users");
  return data.users || [];
}

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data.order;
}

export default api;
