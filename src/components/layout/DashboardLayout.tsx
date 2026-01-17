import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';


export const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-y-auto">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};