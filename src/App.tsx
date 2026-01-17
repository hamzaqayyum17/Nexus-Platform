import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth
import LoginPage from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import OtpPage from './pages/auth/OtpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// Dashboards
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';
import CalendarPage from './pages/dashboard/CalendarPage';
import VideoCallPage from './pages/video/VideoCallPage';

// Profiles
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Discovery
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { InvestorsPage } from './pages/investors/InvestorsPage';

// Communication
import { MessagesPage } from './pages/messages/MessagesPage';
import { ChatPage } from './pages/chat/ChatPage';

// Business
import DocumentsPage from './pages/documents/DocumentsPage';
import { DealsPage } from './pages/deals/DealsPage';
import PaymentsPage from './pages/payments/PaymentsPage';

// Account
import { SettingsPage } from './pages/settings/SettingsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { HelpPage } from './pages/help/HelpPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC AUTH ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
        <Route path="investor" element={<InvestorDashboard />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="video-call" element={<VideoCallPage />} />
      </Route>

      {/* PROTECTED PROFILE ROUTES */}
      <Route
        path="/profile/entrepreneur/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EntrepreneurProfile />} />
      </Route>

      <Route
        path="/profile/investor/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InvestorProfile />} />
      </Route>

      {/* PROTECTED DISCOVERY ROUTES */}
      <Route
        path="/entrepreneurs"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EntrepreneursPage />} />
      </Route>

      <Route
        path="/investors"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InvestorsPage />} />
      </Route>

      {/* PROTECTED COMMUNICATION ROUTES */}
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MessagesPage />} />
      </Route>

      <Route
        path="/chat/:userId"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ChatPage />} />
      </Route>

      {/* PROTECTED BUSINESS ROUTES */}
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DocumentsPage />} />
      </Route>

      <Route
        path="/deals"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DealsPage />} />
      </Route>

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PaymentsPage />} />
      </Route>

      {/* PROTECTED ACCOUNT ROUTES */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SettingsPage />} />
      </Route>

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<NotificationsPage />} />
      </Route>

      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HelpPage />} />
      </Route>

      {/* CATCH ALL REDIRECTS */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;