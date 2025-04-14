
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminAuthCheckProps {
  children: React.ReactNode;
}

export const AdminAuthCheck: React.FC<AdminAuthCheckProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Verificar se o usuário já está autenticado pelo localStorage
  useEffect(() => {
    const adminAuth = localStorage.getItem("admin-auth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simular verificação de senha (em produção, isso seria verificado no servidor)
    setTimeout(() => {
      // Senha padrão para demonstração: "admin123"
      if (password === "admin123") {
        localStorage.setItem("admin-auth", "true");
        setIsAuthenticated(true);
        toast.success("Login administrativo realizado com sucesso");
      } else {
        toast.error("Senha administrativa incorreta");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
    setPassword("");
    toast.info("Sessão administrativa encerrada");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center">Acesso Administrativo</CardTitle>
            <CardDescription className="text-center">
              Esta área é restrita para administradores do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha administrativa"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              onClick={handleLogin} 
              disabled={isLoading || password.length < 6}
            >
              {isLoading ? "Verificando..." : "Acessar Painel"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/")}
            >
              Voltar para o Dashboard
            </Button>
            <div className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" /> 
              <span>Para fins de teste, use "admin123" como senha</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Encerrar Sessão Administrativa
        </Button>
      </div>
      {children}
    </div>
  );
};
