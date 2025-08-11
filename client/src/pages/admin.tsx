import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminSidebar from "@/components/admin/sidebar";
import AdminDashboard from "@/components/admin/dashboard";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("bright-admin");
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  // Simple loading check
  if (!localStorage.getItem("bright-admin")) {
    return null; // Will redirect in useEffect
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

export default Admin;
