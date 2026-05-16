import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

/* Public Pages */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/HomePage/About";
import ContactPage from "./pages/HomePage/Contact";
import ForgotPassword from "./pages/ForgotPassword";

/* User Layout & Pages */
import MainLayout from "./layouts/Mainlayout";
import DashboardPage from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile/EditProfile";
import PortfolioPage from "./pages/Portfolio";
import NewsPage from "./pages/NewsPage";
import OpportunityPage from "./pages/OpportunityPage";
import FeedbackPage from "./pages/Feedback";
import PublicProfile from "./pages/PublicProfile";

/* Admin Layout & Pages */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import PostNews from "./pages/admin/PostNews";
import PostJobs from "./pages/admin/PostJobs";
import ManageStudents from "./pages/admin/ManageStudents";
import CreateAdmin from "./pages/admin/CreateAdmin";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile/:username" element={<PublicProfile />} />

      {/* USER ROUTES — Protected */}
      <Route element={<ProtectedRoute allowedRole="Student" />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/jobs" element={<OpportunityPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES — Protected */}
      <Route element={<ProtectedRoute allowedRole="Admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<PostNews />} />
          <Route path="/admin/jobs" element={<PostJobs />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/create-admin" element={<CreateAdmin />} />
        </Route>
      </Route>

    </Routes>
  );
}
