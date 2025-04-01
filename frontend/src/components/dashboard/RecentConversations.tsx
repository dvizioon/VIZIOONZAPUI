
import { MessageSquare, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar?: string;
  };
  message: string;
  time: string;
  unread: boolean;
  status: "pending" | "active" | "resolved";
}

interface RecentConversationsProps {
  conversations: Conversation[];
}

const getStatusColor = (status: Conversation["status"]) => {
  switch (status) {
    case "pending":
      return "bg-amber-500";
    case "active":
      return "bg-whatsapp";
    case "resolved":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getStatusText = (status: Conversation["status"]) => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "active":
      return "Em atendimento";
    case "resolved":
      return "Resolvido";
    default:
      return "Desconhecido";
  }
};

const RecentConversations = ({ conversations }: RecentConversationsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Conversas Recentes</CardTitle>
        <MessageSquare size={18} className="text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={conversation.contact.avatar} />
                  <AvatarFallback className="bg-whatsapp text-white">
                    {conversation.contact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{conversation.contact.name}</p>
                    {conversation.unread && <span className="w-2 h-2 rounded-full bg-whatsapp"></span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{conversation.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs font-normal px-2 py-0">
                      {conversation.time}
                    </Badge>
                    <Badge 
                      className={`text-xs font-normal text-white px-2 py-0 ${getStatusColor(conversation.status)}`}
                    >
                      {getStatusText(conversation.status)}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="mt-1">
                <MoreVertical size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentConversations;
