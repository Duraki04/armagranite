import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Image, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 text-sm">
              Welcome, {adminUser.name || "Admin"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-7 h-7 text-slate-800" />
            <h2 className="text-3xl font-bold text-slate-900">
              Control Panel
            </h2>
          </div>

          <p className="text-slate-600">
            Manage contact messages and granite posts from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/messages"
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="bg-slate-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <MessageSquare className="w-7 h-7 text-slate-800" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Contact Messages
            </h3>

            <p className="text-slate-600">
              View customer requests, mark messages as read, and soft delete old
              messages.
            </p>
          </Link>

          <Link
            to="/admin/granite-posts"
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="bg-slate-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <Image className="w-7 h-7 text-slate-800" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Granite Posts
            </h3>

            <p className="text-slate-600">
              Create, edit, and soft delete granite cards for the gallery.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}