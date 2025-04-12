
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  // Try to prevent 404 issues by redirecting to home after a short delay
  useEffect(() => {
    // If the URL doesn't include a valid route path, redirect to home
    const isDirectAccess = !window.location.pathname.match(/^\/(campaigns|customers|menus|orders|coupons|loyalty|integrations|settings|calendar)$/);
    
    if (isDirectAccess && window.location.pathname !== "/") {
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 3000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            We couldn't find the page you were looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            You'll be redirected to the home page automatically or you can click the button below.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            <Home className="mr-2 h-4 w-4" /> Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
