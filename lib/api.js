import axios from "axios";

const api = axios.create({
  baseURL: "/api",
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
