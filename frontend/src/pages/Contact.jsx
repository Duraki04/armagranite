import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { sendContactMessage } from "../services/api";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

const projectTypes = [
  "Kitchen Countertop",
  "Stairs",
  "Flooring",
  "Bathroom",
  "Facade",
  "Custom Project",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (formData.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim().length < 6) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!formData.projectType) {
      errors.projectType = "Please select a project type.";
    }

    if (formData.message.trim().length < 10) {
      errors.message = "Please write at least 10 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus("error");
      setErrorMessage(
        "Please check the form and fill in all required fields correctly."
      );
      return;
    }

    setStatus("loading");

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        projectType: formData.projectType,
        message: formData.message.trim(),
      });

      setStatus("success");
      setFormData(initialFormData);
      setValidationErrors({});

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message ||
          "Failed to send message. Please try again or contact us directly."
      );
      console.error("Contact form error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section
        className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl text-slate-200">
            Get in touch for your next granite project
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Request a Free Quote
              </h2>

              <p className="text-slate-600 mb-8">
                Tell us about your project and our team will contact you as soon
                as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name *
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                      validationErrors.name
                        ? "border-red-400"
                        : "border-slate-300"
                    }`}
                    placeholder="John Doe"
                  />

                  {validationErrors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address *
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                      validationErrors.email
                        ? "border-red-400"
                        : "border-slate-300"
                    }`}
                    placeholder="john@example.com"
                  />

                  {validationErrors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                      validationErrors.phone
                        ? "border-red-400"
                        : "border-slate-300"
                    }`}
                    placeholder="+389 70 211 996"
                  />

                  {validationErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Project Type *
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                      validationErrors.projectType
                        ? "border-red-400"
                        : "border-slate-300"
                    }`}
                  >
                    <option value="">Select a project type</option>

                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {validationErrors.projectType && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.projectType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Project Details *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none ${
                      validationErrors.message
                        ? "border-red-400"
                        : "border-slate-300"
                    }`}
                    placeholder="Tell us about your project, dimensions, material preferences, or any special requirements..."
                  />

                  {validationErrors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-slate-900 text-white py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Request
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p>
                      Thank you! Your request has been sent successfully. We
                      will contact you soon.
                    </p>
                  </div>
                )}

                {status === "error" && errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-slate-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Address
                    </h3>
                    <p className="text-slate-600">
                      Bratstvo Edinstvo, Lubidrag
                      <br />
                      Municipality of Kumanovo
                      <br />
                      North Macedonia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-slate-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+38970211996"
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      +389 70 211 996
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-slate-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@armagranit.mk"
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      info@armagranit.mk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-slate-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-slate-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <iframe
                  src="https://www.google.com/maps?q=Bratstvo%20Edinstvo%20Kumanovo&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ARMA GRANIT Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}