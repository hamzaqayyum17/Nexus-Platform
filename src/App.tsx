import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth
import LoginPage from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboards
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';
import CalendarPage from './pages/dashboard/CalendarPage';

// Other pages...
import PaymentsPage from './pages/payments/PaymentsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED */}
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

        {/* REDIRECTS */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
