import { useAuth } from "@/contexts/AuthContext";
import { Dashboard } from "@/components/dashboard/Dashboard";
import Auth from "./Auth";

const Index = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return <Dashboard onLogout={logout} />;
};

export default Index;
