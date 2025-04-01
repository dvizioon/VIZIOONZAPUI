
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Phone, 
  Users, 
  Bot, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart2,
  MessageSquare,
  Upload,
  ListChecks,
  HelpCircle,
  Tag,
  Kanban
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon: Icon, label, path, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link to={path} className="w-full">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 py-2 rounded-md transition-all",
              isActive 
                ? "bg-whatsapp bg-opacity-10 text-whatsapp hover:bg-whatsapp hover:bg-opacity-20" 
                : "hover:bg-gray-100"
            )}
          >
            <Icon size={20} />
            {!isCollapsed && <span>{label}</span>}
          </Button>
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="ml-1">
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Phone, label: "Conexões", path: "/conexoes" },
    { icon: Users, label: "Contatos", path: "/contatos" },
    { icon: MessageSquare, label: "Conversas", path: "/conversas" },
    { icon: Bot, label: "Chatbots", path: "/chatbots" },
    { icon: Kanban, label: "Kanban", path: "/kanban" },
    { icon: Tag, label: "Etiquetas", path: "/etiquetas" },
    { icon: BarChart2, label: "Relatórios", path: "/relatorios" },
    { icon: Upload, label: "Importação", path: "/importacao" },
    { icon: ListChecks, label: "Campanhas", path: "/campanhas" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
    { icon: HelpCircle, label: "Ajuda", path: "/ajuda" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border-gray-200 bg-white transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-whatsapp flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">VizioonConnect</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-full bg-whatsapp flex items-center justify-center">
            <MessageSquare size={16} className="text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">admin@vizioonconnect.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
