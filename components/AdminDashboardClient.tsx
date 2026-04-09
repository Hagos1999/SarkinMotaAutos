"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { Car, ShoppingBag, DollarSign, TrendingUp, Calendar, CheckCircle } from "lucide-react";

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  vehicle_id: string | null;
  customer_email?: string;
}

interface Vehicle {
  id: string;
  title: string;
  price: number;
  created_at: string;
}

interface Props {
  orders: Order[];
  vehicles: Vehicle[];
  vehicleCount: number;
  soldCount: number;
  userEmail: string;
}

function getMonthlyData(orders: Order[]) {
  const months: Record<string, { month: string; revenue: number; sales: number }> = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Seed last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    months[key] = { month: monthNames[d.getMonth()], revenue: 0, sales: 0 };
  }

  orders.forEach((o) => {
    const d = new Date(o.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (months[key]) {
      months[key].revenue += o.amount;
      months[key].sales += 1;
    }
  });

  return Object.values(months);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f2520] border border-[#2a4a44] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-[#a3c4bc] text-xs font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-white font-bold text-sm">
            {p.name === "revenue" ? `₦${Number(p.value).toLocaleString()}` : `${p.value} sold`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboardClient({ orders, vehicles, vehicleCount, soldCount, userEmail }: Props) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalSales = orders.length;
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const monthlyData = getMonthlyData(orders);

  const stats = [
    {
      label: "Total Inventory",
      value: vehicleCount.toString(),
      icon: Car,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "Vehicles Sold",
      value: soldCount.toString(),
      icon: CheckCircle,
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
    {
      label: "Total Revenue",
      value: `₦${Number(totalRevenue).toLocaleString()}`,
      icon: DollarSign,
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    {
      label: "Avg. Order Value",
      value: `₦${Number(avgOrderValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1b3b36 0%, #0f2520 50%, #142e29 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #4ade80 0%, transparent 60%)" }}
        />
        <div className="relative z-10">
          <p className="text-sm font-medium text-emerald-300 mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {today}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Boss! 👋</h1>
          <p className="text-emerald-200 text-sm mt-1">{userEmail}</p>
          <p className="text-white/70 text-sm mt-3 italic">&ldquo;Technolooogiiyyaaaa — SarkinMota Autos Control Center&rdquo;</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${s.text}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Last 6 months</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">₦</span>
          </div>
          {totalRevenue === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center text-gray-400">
              <TrendingUp className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">No sales recorded yet. Log your first order!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#1b3b36" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sales Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Units Sold</h2>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </div>
          {totalSales === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm text-center">Sales will appear here once orders are logged.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b3b36" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1b3b36" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="#1b3b36" strokeWidth={2.5} fill="url(#salesGrad)" dot={{ fill: "#1b3b36", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-500">Last {Math.min(orders.length, 5)} transactions</p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{totalSales} total</span>
        </div>
        {orders.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-gray-500">No orders recorded yet</p>
            <p className="text-sm mt-1">Orders logged from your admin panel will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3">Order ID</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Amount</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400 text-xs">{order.id.slice(0, 8)}…</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer_email || "—"}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₦{Number(order.amount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
