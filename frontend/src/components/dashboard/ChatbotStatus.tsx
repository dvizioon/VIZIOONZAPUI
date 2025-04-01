
import { Bot, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatbotStatusProps {
  bots: {
    name: string;
    status: "online" | "offline";
    messages: number;
    efficiency: number;
  }[];
}

const ChatbotStatus = ({ bots }: ChatbotStatusProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Status dos Chatbots</CardTitle>
        <Bot size={18} className="text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bots.map((bot) => (
            <div key={bot.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-whatsapp bg-opacity-10 rounded-full flex items-center justify-center">
                  <Zap size={14} className="text-whatsapp" />
                </div>
                <div>
                  <p className="font-medium text-sm">{bot.name}</p>
                  <Badge variant={bot.status === "online" ? "default" : "secondary"} className={`text-xs mt-1 ${bot.status === "online" ? "bg-whatsapp" : ""}`}>
                    {bot.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{bot.messages} msgs</p>
                <p className="text-xs text-gray-500">Efic. {bot.efficiency}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotStatus;
