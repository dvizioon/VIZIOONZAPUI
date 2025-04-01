import { 
  Bot,
  MessageSquare, 
  Phone, 
  Users, 
  Activity,
  BarChart2
} from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import ChatbotStatus from "@/components/dashboard/ChatbotStatus";
import RecentConversations from "@/components/dashboard/RecentConversations";

type ConversationStatus = "active" | "pending" | "resolved";
type ChatbotStatus = "online" | "offline";

interface Conversation {
  id: string;
  contact: {
    name: string;
  };
  message: string;
  time: string;
  unread: boolean;
  status: ConversationStatus;
}

const Dashboard = () => {
  // Dados mockados para simulação
  const mockConversations: Conversation[] = [
    {
      id: "1",
      contact: { name: "João Silva" },
      message: "Olá, gostaria de fazer um orçamento para...",
      time: "10:23",
      unread: true,
      status: "active"
    },
    {
      id: "2",
      contact: { name: "Maria Souza" },
      message: "Bom dia, meu pedido ainda não chegou...",
      time: "09:15",
      unread: false,
      status: "pending"
    },
    {
      id: "3",
      contact: { name: "Pedro Santos" },
      message: "Obrigado pelo atendimento rápido!",
      time: "Ontem",
      unread: false,
      status: "resolved"
    },
    {
      id: "4",
      contact: { name: "Ana Costa" },
      message: "Preciso de ajuda com minha compra...",
      time: "Ontem",
      unread: false,
      status: "pending"
    },
  ];

  const mockChatbots: { name: string; status: ChatbotStatus; messages: number; efficiency: number; }[] = [
    { name: "Atendimento", status: "online", messages: 345, efficiency: 92 },
    { name: "Vendas", status: "online", messages: 128, efficiency: 87 },
    { name: "Suporte", status: "offline", messages: 0, efficiency: 0 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatusCard 
          title="Conexões Ativas" 
          value="4"
          icon={Phone}
          change={0}
          color="green"
        />
        <StatusCard 
          title="Contatos" 
          value="1,245"
          icon={Users}
          change={3.2}
          color="blue"
        />
        <StatusCard 
          title="Conversas Hoje" 
          value="87"
          icon={MessageSquare}
          change={12.5}
          color="purple"
        />
        <StatusCard 
          title="Bots Ativos" 
          value="2/3"
          icon={Bot}
          change={-1}
          color="amber"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentConversations conversations={mockConversations} />
        </div>
        <div>
          <ChatbotStatus bots={mockChatbots} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
