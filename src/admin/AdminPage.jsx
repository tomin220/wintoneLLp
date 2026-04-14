import { AdminProvider, useAdmin } from './AdminContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function AdminGate() {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminGate />
    </AdminProvider>
  );
}
