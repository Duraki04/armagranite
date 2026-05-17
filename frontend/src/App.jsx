import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminGranitePosts from "./pages/admin/AdminGranitePosts";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/granite-posts" element={<AdminGranitePosts />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </Router>
  );
}

export default App;