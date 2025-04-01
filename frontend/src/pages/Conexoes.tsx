
import { useState } from "react";
import { Phone, MoreVertical, Plus, RefreshCw, Smartphone, QrCode, MessageSquare, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados mockados para simulação
const conexoesMock = [
  { 
    id: "1", 
    nome: "Atendimento Principal", 
    numero: "+5511999999999", 
    status: "conectado", 
    mensagens: 1245, 
    dataConexao: "2023-05-15T10:30:00",
    agente: "Assistente de Vendas"
  },
  { 
    id: "2", 
    nome: "Vendas", 
    numero: "+5511888888888", 
    status: "conectado", 
    mensagens: 856, 
    dataConexao: "2023-06-20T09:15:00",
    agente: "FAQ Bot"
  },
  { 
    id: "3", 
    nome: "Suporte", 
    numero: "+5511777777777", 
    status: "desconectado", 
    mensagens: 0, 
    dataConexao: null,
    agente: null
  },
  { 
    id: "4", 
    nome: "Marketing", 
    numero: "+5511666666666", 
    status: "expirado", 
    mensagens: 350, 
    dataConexao: "2023-04-10T14:20:00",
    agente: "Agente Promocional"
  },
];

// Dados mockados de agentes/bots disponíveis
const agentesDisponiveis = [
  { id: "1", nome: "Assistente de Vendas", tipo: "agente" },
  { id: "2", nome: "FAQ Bot", tipo: "chatbot" },
  { id: "3", nome: "Agente Promocional", tipo: "agente" },
  { id: "4", nome: "Atendimento Inicial", tipo: "chatbot" },
];

const Conexoes = () => {
  const [conexoes, setConexoes] = useState(conexoesMock);
  const [showQRCode, setShowQRCode] = useState(false);
  const [tabSelecionada, setTabSelecionada] = useState("todas");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "conectado":
        return "bg-whatsapp text-white";
      case "desconectado":
        return "bg-gray-400 text-white";
      case "expirado":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "conectado":
        return "Conectado";
      case "desconectado":
        return "Desconectado";
      case "expirado":
        return "Sessão Expirada";
      default:
        return "Desconhecido";
    }
  };

  // Filtrar conexões com base na tab selecionada
  const conexoesFiltradas = tabSelecionada === "todas" 
    ? conexoes 
    : tabSelecionada === "agentes" 
      ? conexoes.filter(c => c.agente && agentesDisponiveis.find(a => a.nome === c.agente)?.tipo === "agente")
      : conexoes.filter(c => c.agente && agentesDisponiveis.find(a => a.nome === c.agente)?.tipo === "chatbot");

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Conexões</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-whatsapp hover:bg-whatsapp/90">
              <Plus size={16} className="mr-2" />
              Nova Conexão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Conexão WhatsApp</DialogTitle>
              <DialogDescription>
                Configure uma nova conexão com o WhatsApp para iniciar o atendimento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome da Conexão</Label>
                <Input id="nome" placeholder="Ex: Suporte" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numero">Número de Telefone</Label>
                <Input id="numero" placeholder="+55 (00) 00000-0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agente">Agente ou Chatbot (opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um agente ou chatbot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    <SelectItem value="header-1" disabled className="font-semibold">
                      -- Agentes AI --
                    </SelectItem>
                    {agentesDisponiveis
                      .filter(a => a.tipo === "agente")
                      .map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                      ))
                    }
                    <SelectItem value="header-2" disabled className="font-semibold">
                      -- Chatbots --
                    </SelectItem>
                    {agentesDisponiveis
                      .filter(a => a.tipo === "chatbot")
                      .map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              {showQRCode ? (
                <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-48 h-48 bg-white p-2 border border-gray-200">
                    {/* Aqui seria o componente de QR Code real */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <QrCode size={100} className="text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Escaneie o QR Code com seu WhatsApp para conectar
                  </p>
                  <Button variant="outline" className="mt-2" onClick={() => setShowQRCode(false)}>
                    <RefreshCw size={14} className="mr-2" />
                    Gerar Novo QR Code
                  </Button>
                </div>
              ) : (
                <Button 
                  className="mt-2 bg-whatsapp hover:bg-whatsapp/90"
                  onClick={() => setShowQRCode(true)}
                >
                  <Smartphone size={16} className="mr-2" />
                  Gerar QR Code
                </Button>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowQRCode(false)}>Cancelar</Button>
              <Button className="bg-whatsapp hover:bg-whatsapp/90">Salvar Conexão</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="todas" onValueChange={setTabSelecionada} className="mb-6">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="agentes">Com Agentes AI</TabsTrigger>
          <TabsTrigger value="chatbots">Com Chatbots</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {conexoesFiltradas.map((conexao) => (
          <Card key={conexao.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{conexao.nome}</CardTitle>
                  <CardDescription className="mt-1">{conexao.numero}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RefreshCw size={14} className="mr-2" />
                      Reconectar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <QrCode size={14} className="mr-2" />
                      Gerar QR Code
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Brain size={14} className="mr-2" />
                      Configurar Agente/Chatbot
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      Desconectar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Badge className={getStatusColor(conexao.status)}>
                  {getStatusText(conexao.status)}
                </Badge>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{conexao.mensagens} mensagens</span>
                </div>
              </div>
              {conexao.agente && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Brain size={14} className="text-purple-600" />
                  <span>
                    {agentesDisponiveis.find(a => a.nome === conexao.agente)?.tipo === "agente" 
                      ? "Agente AI:" 
                      : "Chatbot:"} {conexao.agente}
                  </span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {conexao.dataConexao 
                    ? `Conectado em: ${new Date(conexao.dataConexao).toLocaleString('pt-BR')}`
                    : "Nunca conectado"}
                </div>
                {conexao.status !== "conectado" && (
                  <Button size="sm" className="bg-whatsapp hover:bg-whatsapp/90">
                    Conectar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Conexoes;
