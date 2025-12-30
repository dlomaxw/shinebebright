import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Zap, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/contexts/admin-auth";

export default function AdminLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(passcode);
    if (!success) {
      setError("Invalid passcode. Please try again.");
      setPasscode("");
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-bright-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-bright-yellow/20 bg-bright-black/90 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-bright-yellow rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-bright-black" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-bright-white">Admin Access</CardTitle>
          <CardDescription className="text-bright-white/60">
            Enter your passcode to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-bright-white/80">
                Passcode
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bright-white/40" />
                <Input
                  id="passcode"
                  type="password"
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="pl-10 bg-bright-black/50 border-bright-yellow/20 text-bright-white placeholder:text-bright-white/40 focus:border-bright-yellow"
                  data-testid="input-passcode"
                  autoComplete="off"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
              disabled={isLoading || !passcode}
              data-testid="button-login"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-bright-white/40 text-xs">
              Bright Platform Admin Panel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
