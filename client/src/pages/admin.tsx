import { useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/admin-auth";
import AdminSidebar from "@/components/admin/sidebar";
import AdminDashboard from "@/components/admin/dashboard";
import AdminLogin from "@/components/admin/login";

const AdminContent = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="pt-16 min-h-screen bg-bright-black">
      <div className="flex">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 ml-64">
          <AdminDashboard activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};

export default Admin;
