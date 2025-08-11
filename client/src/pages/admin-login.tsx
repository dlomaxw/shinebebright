import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";

const AdminLogin = () => {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple admin credentials check
    if (credentials.username === "admin" && credentials.password === "bright2024") {
      // Store admin session
      localStorage.setItem("bright-admin", "true");
      toast({
        title: "Success",
        description: "Welcome to Bright Admin Panel",
      });
      setLocation("/admin");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-bright-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-bright-yellow/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-bright-yellow rounded-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-bright-black" />
          </div>
          <CardTitle className="text-2xl text-bright-white">Admin Login</CardTitle>
          <CardDescription className="text-bright-white/70">
            Access the Bright Platform Admin Panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-bright-white">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-bright-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-bright-white text-sm font-medium mb-2">Demo Credentials:</p>
            <p className="text-bright-white/70 text-sm">Username: <span className="text-bright-yellow">admin</span></p>
            <p className="text-bright-white/70 text-sm">Password: <span className="text-bright-yellow">bright2024</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;