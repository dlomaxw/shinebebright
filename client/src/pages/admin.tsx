import { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminDashboard from "@/components/admin/dashboard";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

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

export default Admin;
