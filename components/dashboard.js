"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiBarChart2, FiLogOut, FiPackage, FiUsers, FiCheckCircle, FiDownload, FiSettings } from "react-icons/fi";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import api, { fetchDashboardOrders, fetchDashboardUsers } from "@/lib/api";
import { dashboardStatuses, defaultOrders } from "@/lib/data";

function ProgressChart({ orders }) {
  const counts = useMemo(() => {
    const result = { Pending: 0, "In Progress": 0, Completed: 0 };
    orders.forEach((order) => {
      result[order.status] = (result[order.status] || 0) + 1;
    });
    return result;
  }, [orders]);

  const total = Math.max(orders.length, 1);

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-2xl bg-white/10 p-3 text-white"><FiBarChart2 /></span>
        <div>
          <h3 className="text-xl font-semibold text-white">Order Progress</h3>
          <p className="text-sm text-white/50">Status distribution across your orders</p>
        </div>
      </div>
      <div className="space-y-4">
        {dashboardStatuses.map((status) => (
          <div key={status}>
            <div className="mb-2 flex items-center justify-between text-sm text-white/70">
              <span>{status}</span>
              <span>{counts[status] || 0}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${((counts[status] || 0) / total) * 100}%` }} className="h-2 rounded-full bg-button-gradient" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardShell({ children, mode = "user" }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState(defaultOrders);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const fetchedOrders = await fetchDashboardOrders();
        setOrders(fetchedOrders.length ? fetchedOrders : defaultOrders);

        try {
          const fetchedUsers = await fetchDashboardUsers();
          setUsers(fetchedUsers);
        } catch {
          setUsers([]);
        }
      } catch (error) {
        toast.error("Dashboard requires authentication or server access");
        router.push("/");
      }
    }

    load();
  }, [router, session]);

  const handleLogout = async () => {
    router.push("/");
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 40);
    doc.text(`Service: ${order.serviceId?.title || order.serviceId?.name || "Custom package"}`, 20, 50);
    doc.text(`Status: ${order.status}`, 20, 60);
    doc.text(`Payment Status: ${order.paymentStatus}`, 20, 70);
    doc.save(`invoice-${order._id}.pdf`);
  };

  const analyticsCards = [
    { title: "Active Orders", value: orders.length, icon: <FiPackage /> },
    { title: "Completed", value: orders.filter((order) => order.status === "Completed").length, icon: <FiCheckCircle /> },
    { title: "Team Users", value: users.length || 12, icon: <FiUsers /> },
  ];

  return (
    <div className="min-h-screen bg-hero-gradient text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-[#0B0616]/80 px-5 py-6 backdrop-blur-xl">
          <div className="glass-panel rounded-[1.75rem] p-5">
            <p className="text-sm uppercase tracking-[0.45em] text-white/35">Dashboard</p>
            <h2 className="mt-3 text-2xl font-semibold">{profile?.name || "Loading..."}</h2>
            <p className="mt-1 text-sm text-white/55">{profile?.role || "user"}</p>
          </div>

          <nav className="mt-6 space-y-3">
            <Link href="/dashboard/user" className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-white/80 transition hover:bg-white/10"><FiSettings /> User dashboard</Link>
            <Link href="/dashboard/admin" className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-white/80 transition hover:bg-white/10"><FiBarChart2 /> Admin dashboard</Link>
            <Link href="/" className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-white/80 transition hover:bg-white/10">Back to site</Link>
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl bg-button-gradient px-4 py-3 font-medium text-white shadow-glow transition hover:scale-[1.01]"><FiLogOut /> Logout</button>
          </nav>
        </aside>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {analyticsCards.map((card) => (
                <motion.div key={card.title} whileHover={{ y: -8 }} className="glass-panel rounded-[1.75rem] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-white/35">{card.title}</p>
                      <p className="mt-3 text-4xl font-semibold text-white">{card.value}</p>
                    </div>
                    <span className="rounded-2xl bg-white/10 p-4 text-2xl">{card.icon}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <ProgressChart orders={orders} />
              <div className="glass-panel rounded-[2rem] p-6">
                <h3 className="text-xl font-semibold text-white">Profile Overview</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Email</p>
                    <p className="mt-1 text-white">{profile?.email || "-"}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Role</p>
                    <p className="mt-1 text-white">{profile?.role || "user"}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Active Services</p>
                    <p className="mt-1 text-white">{orders.length}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Session</p>
                    <p className="mt-1 text-white">Persistent</p>
                  </div>
                </div>
                {mode === "user" ? (
                  <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <h4 className="text-lg font-semibold text-white">Order History</h4>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-white/5 text-white/60">
                          <tr>
                            <th className="px-4 py-3">Service</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3">Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-t border-white/10">
                              <td className="px-4 py-3 text-white/85">{order.serviceId?.title || order.serviceId?.name || "Custom package"}</td>
                              <td className="px-4 py-3 text-white/70">{order.status}</td>
                              <td className="px-4 py-3 text-white/70">{order.paymentStatus}</td>
                              <td className="px-4 py-3">
                                <button onClick={() => downloadInvoice(order)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/80 transition hover:bg-white/10">
                                  <FiDownload /> PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AdminBoard() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [servicesResponse, usersResponse, ordersResponse] = await Promise.all([
          api.get("/services"),
          api.get("/users"),
          api.get("/orders"),
        ]);
        setServices(servicesResponse.data.services || []);
        setUsers(usersResponse.data.users || []);
        setOrders(ordersResponse.data.orders || []);
      } catch {
        toast.error("Unable to fetch admin resources");
      }
    }

    load();
  }, []);

  const promoteUser = async (id, role) => {
    await api.patch(`/users/role/${id}`, { role });
    setUsers((current) => current.map((user) => (user._id === id ? { ...user, role } : user)));
    toast.success("User role updated");
  };

  const deleteOrder = async (id) => {
    await api.delete(`/orders/${id}`);
    setOrders((current) => current.filter((order) => order._id !== id));
    toast.success("Order deleted");
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[2rem] p-6">
        <h3 className="text-2xl font-semibold text-white">Admin Management</h3>
        <p className="mt-2 text-white/60">Manage users, services, and orders from one responsive dashboard.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass-panel rounded-[2rem] p-6">
          <h4 className="text-xl font-semibold text-white">Manage Users</h4>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-white/60">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-white/10">
                    <td className="px-4 py-3 text-white/80">{user.email}</td>
                    <td className="px-4 py-3 text-white/65">{user.role}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => promoteUser(user._id, user.role === "admin" ? "user" : "admin")} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/75 transition hover:bg-white/10">
                        {user.role === "admin" ? "Demote" : "Promote"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <h4 className="text-xl font-semibold text-white">Manage Orders</h4>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{order.serviceId?.title || order.serviceId?.name || "Custom package"}</p>
                    <p className="text-sm text-white/55">{order.userEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{order.status}</span>
                    <button onClick={() => deleteOrder(order._id)} className="rounded-full border border-white/10 px-3 py-2 text-white/75 transition hover:bg-white/10">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h4 className="text-xl font-semibold text-white">Services Catalogue</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-lg font-semibold text-white">{service.title}</p>
              <p className="mt-2 text-sm text-white/60">{service.description}</p>
              <p className="mt-4 text-xl font-bold text-white">${service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UserDashboardPage() {
  const quickStats = [
    { title: "Profile Completed", value: "96%" },
    { title: "Ongoing Orders", value: "02" },
    { title: "Archived Services", value: "08" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((card) => (
          <div key={card.title} className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">{card.title}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <h3 className="text-2xl font-semibold text-white">Profile Editor</h3>
          <p className="mt-2 text-white/60">Update profile data and keep your client-facing information polished.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" placeholder="Display name" />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" placeholder="Profile image URL" />
          </div>
          <button className="mt-5 rounded-full bg-button-gradient px-6 py-3 font-medium text-white shadow-glow">Save Profile</button>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <h3 className="text-2xl font-semibold text-white">Service Progress</h3>
          <div className="mt-6 space-y-4">
            {defaultOrders.map((order) => (
              <div key={order._id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{order.serviceId.title}</p>
                    <p className="text-sm text-white/55">{order.status}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{order.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && session?.user && session.user.role !== "admin") {
    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.45em] text-white/35">Access denied</p>
          <h3 className="mt-4 text-3xl font-semibold text-white">Admin access is required for this area.</h3>
          <p className="mt-3 text-white/60">Use an admin account to manage users, orders, and services.</p>
        </div>
      </div>
    );
  }

  return <AdminBoard />;
}
