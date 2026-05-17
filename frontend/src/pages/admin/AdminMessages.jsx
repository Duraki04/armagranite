import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, CheckCircle, Mail } from "lucide-react";
import {
  getAdminMessages,
  markMessageAsRead,
  deleteMessage,
} from "../../services/api";

export default function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const loadMessages = async () => {
    try {
      setStatus("loading");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const result = await getAdminMessages(token);
      setMessages(result.data || []);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to load messages.");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkAsRead = async (messageId) => {
    try {
      await markMessageAsRead(messageId, token);

      setMessages((prev) =>
        prev.map((message) =>
          message._id === messageId ? { ...message, isRead: true } : message
        )
      );
    } catch (error) {
      alert(error.message || "Failed to mark message as read.");
    }
  };

  const handleDelete = async (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteMessage(messageId, token);

      setMessages((prev) =>
        prev.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      alert(error.message || "Failed to delete message.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Contact Messages
            </h1>
            <p className="text-slate-600 text-sm">
              Manage customer requests from the contact form.
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {status === "loading" && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            Loading messages...
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
            {errorMessage}
          </div>
        )}

        {status === "success" && messages.length === 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <Mail className="w-10 h-10 mx-auto text-slate-500 mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              No messages yet
            </h2>
            <p className="text-slate-600">
              New contact form messages will appear here.
            </p>
          </div>
        )}

        {status === "success" && messages.length > 0 && (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        {message.name}
                      </h2>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          message.isRead
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {message.isRead ? "Read" : "Unread"}
                      </span>
                    </div>

                    <p className="text-slate-600">
                      <strong>Email:</strong> {message.email}
                    </p>
                    <p className="text-slate-600">
                      <strong>Phone:</strong> {message.phone}
                    </p>
                    <p className="text-slate-600">
                      <strong>Project Type:</strong> {message.projectType}
                    </p>

                    <p className="text-slate-800 mt-4 whitespace-pre-line">
                      {message.message}
                    </p>

                    <p className="text-slate-400 text-sm mt-4">
                      Received:{" "}
                      {new Date(message.createdAt).toLocaleString("en-GB")}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    {!message.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(message._id)}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(message._id)}
                      className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}