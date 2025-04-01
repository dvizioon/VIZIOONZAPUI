import { useState } from "react";
import { 
  Bot, 
  Plus, 
  Power, 
  Settings, 
  MoreVertical, 
  Code,
  MessageSquare,
  FileText,
  Activity,
  ArrowRight,
  AlertCircle,
  Trash2 as Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ReactFlow, Background, Controls, Node, Edge, Panel, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mensagem Inicial' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
  {
    id: '2',
    data: { label: 'Opção 1' },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
  {
    id: '3',
    data: { label: 'Opção 2' },
    position: { x: 250, y: 125 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
  {
    id: '4',
    data: { label: 'Resposta Final' },
    position: { x: 250, y: 225 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'Sim' },
  { id: 'e1-3', source: '1', target: '3', label: 'Não' },
  { id: 'e3-4', source: '3', target: '4' },
];

const botsMock = [
  { 
    id: "1", 
    nome: "Atendimento Inicial", 
    descricao: "Bot para triagem inicial de atendimento e direcionamento.", 
    status: "ativo", 
    conexao: "Atendimento Principal", 
    mensagensEnviadas: 845,
    mensagensRecebidas: 920,
    taxaResolucao: 78
  },
  { 
    id: "2", 
    nome: "Vendas", 
    descricao: "Bot para respostas automáticas de vendas e cadastro de pedidos.", 
    status: "ativo", 
    conexao: "Vendas", 
    mensagensEnviadas: 456,
    mensagensRecebidas: 512,
    taxaResolucao: 65
  },
  { 
    id: "3", 
    nome: "Suporte Técnico", 
    descricao: "Bot para suporte técnico e solução de problemas comuns.", 
    status: "inativo", 
    conexao: "Suporte", 
    mensagensEnviadas: 123,
    mensagensRecebidas: 145,
    taxaResolucao: 42
  }
];

const fluxoConversaMock = [
  {
    id: "1",
    mensagem: "Olá, sou o assistente virtual da empresa. Como posso ajudar?",
    tipo: "bot",
    opcoes: [
      { id: "1-1", texto: "Informações sobre produtos", proximo: "2" },
      { id: "1-2", texto: "Suporte técnico", proximo: "3" },
      { id: "1-3", texto: "Falar com atendente", proximo: "4" }
    ]
  },
  {
    id: "2",
    mensagem: "Temos várias opções de produtos. Qual categoria você tem interesse?",
    tipo: "bot",
    opcoes: [
      { id: "2-1", texto: "Smartphones", proximo: "5" },
      { id: "2-2", texto: "Notebooks", proximo: "6" },
      { id: "2-3", texto: "Voltar ao menu inicial", proximo: "1" }
    ]
  },
  {
    id: "3",
    mensagem: "Para suporte técnico, por favor descreva seu problema.",
    tipo: "bot",
    esperaResposta: true,
    proximo: "7"
  },
  {
    id: "4",
    mensagem: "Estou transferindo para um atendente humano. Aguarde um momento.",
    tipo: "bot",
    acao: "transferir-humano"
  },
  {
    id: "5",
    mensagem: "Temos os modelos X, Y e Z de smartphones. Deseja informações específicas sobre algum deles?",
    tipo: "bot",
    opcoes: [
      { id: "5-1", texto: "Modelo X", proximo: "8" },
      { id: "5-2", texto: "Voltar para categorias", proximo: "2" },
      { id: "5-3", texto: "Voltar ao menu inicial", proximo: "1" }
    ]
  }
];

const getBotStatusColor = (status: string) => {
  return status === "ativo" ? "bg-whatsapp text-white" : "bg-gray-400 text-white";
};

const Chatbots = () => {
  const [bots, setBots] = useState(botsMock);
  const [mostrarFluxo, setMostrarFluxo] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState("1");
  const [activeTab, setActiveTab] = useState("bots");
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const toggleBotStatus = (id: string) => {
    setBots(prev => prev.map(bot => {
      if (bot.id === id) {
        return {
          ...bot,
          status: bot.status === "ativo" ? "inativo" : "ativo"
        };
      }
      return bot;
    }));
  };

  const etapaFluxo = fluxoConversaMock.find(etapa => etapa.id === etapaAtual);
  
  const handleNovoFluxo = () => {
    setMostrarFluxo(true);
    setActiveTab("fluxos");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Chatbots</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-whatsapp hover:bg-whatsapp/90">
              <Plus size={16} className="mr-2" />
              Novo Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Chatbot</DialogTitle>
              <DialogDescription>
                Configure um novo chatbot para automatizar seus atendimentos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Chatbot</Label>
                <Input id="nome" placeholder="Ex: Atendimento" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" placeholder="Descreva a função deste chatbot" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="conexao">Conexão WhatsApp</Label>
                <Input id="conexao" placeholder="Selecione uma conexão" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mensagem-boas-vindas">Mensagem de Boas-vindas</Label>
                  <Textarea 
                    id="mensagem-boas-vindas" 
                    placeholder="Olá! Sou o assistente virtual..."
                    className="h-20 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="mensagem-ausencia">Mensagem de Ausência</Label>
                  <Textarea 
                    id="mensagem-ausencia" 
                    placeholder="No momento não temos atendentes disponíveis..."
                    className="h-20 mt-2"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-whatsapp hover:bg-whatsapp/90">Criar Chatbot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="bots" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="bots">Meus Chatbots</TabsTrigger>
          <TabsTrigger value="fluxos">Editor de Fluxo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bots">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => (
              <Card key={bot.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{bot.nome}</CardTitle>
                        <Badge className={getBotStatusColor(bot.status)}>
                          {bot.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{bot.descricao}</CardDescription>
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
                          <Settings size={14} className="mr-2" />
                          Configurações
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setActiveTab("fluxos");
                          setMostrarFluxo(true);
                          setEtapaAtual("1");
                        }}>
                          <Code size={14} className="mr-2" />
                          Editor de Fluxo
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText size={14} className="mr-2" />
                          Base de Conhecimento
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Activity size={14} className="mr-2" />
                          Relatórios
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Power size={14} className="mr-2" />
                          {bot.status === "ativo" ? "Desativar" : "Ativar"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Conexão:</span>
                        <span className="font-medium">{bot.conexao}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Mensagens enviadas:</span>
                        <span className="font-medium">{bot.mensagensEnviadas}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Mensagens recebidas:</span>
                        <span className="font-medium">{bot.mensagensRecebidas}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Taxa de resolução:</span>
                        <span className="font-medium">{bot.taxaResolucao}%</span>
                      </div>
                      <Progress value={bot.taxaResolucao} className="h-2" 
                        style={{ 
                          "--progress-background": bot.taxaResolucao > 70 
                            ? "hsl(142, 72%, 29%)" 
                            : bot.taxaResolucao > 40 
                              ? "hsl(48, 96%, 53%)" 
                              : "hsl(0, 84%, 60%)" 
                        } as React.CSSProperties} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <MessageSquare size={16} />
                    Ver Conversas
                  </Button>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`switch-${bot.id}`} className="text-sm text-gray-500">
                      {bot.status === "ativo" ? "Ativo" : "Inativo"}
                    </Label>
                    <Switch 
                      id={`switch-${bot.id}`}
                      checked={bot.status === "ativo"}
                      onCheckedChange={() => toggleBotStatus(bot.id)}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="fluxos">
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle>Editor de Fluxo de Conversa</CardTitle>
              <CardDescription>
                Configure o fluxo de conversação do seu chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mostrarFluxo ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 border rounded-lg overflow-hidden" style={{ height: "500px" }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      fitView
                    >
                      <Controls />
                      <Background />
                      <Panel position="top-right" className="bg-white p-2 rounded-md shadow-sm">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Plus size={14} className="mr-1" /> Nó
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Trash size={14} className="mr-1" /> Remover
                          </Button>
                        </div>
                      </Panel>
                    </ReactFlow>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Editar Etapa {etapaAtual}</h3>
                    
                    {etapaFluxo && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tipo-mensagem">Tipo de Mensagem</Label>
                          <Select defaultValue={etapaFluxo.tipo}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bot">Bot (envia mensagem)</SelectItem>
                              <SelectItem value="usuario">Usuário (recebe mensagem)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="texto-mensagem">Texto da Mensagem</Label>
                          <Textarea 
                            id="texto-mensagem" 
                            defaultValue={etapaFluxo.mensagem}
                            className="h-20" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Opções de Resposta</Label>
                            <Button variant="outline" size="sm" className="text-xs h-7">
                              <Plus size={12} className="mr-1" /> Adicionar
                            </Button>
                          </div>
                          
                          {etapaFluxo.opcoes && etapaFluxo.opcoes.map(opcao => (
                            <div key={opcao.id} className="flex gap-2 items-center mb-2">
                              <Input 
                                defaultValue={opcao.texto} 
                                className="flex-1" 
                                placeholder="Texto da opção"
                              />
                              <Select defaultValue={opcao.proximo}>
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Próximo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {fluxoConversaMock.map(etapa => (
                                    <SelectItem key={etapa.id} value={etapa.id}>
                                      Etapa {etapa.id}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash size={14} />
                              </Button>
                            </div>
                          ))}
                          
                          {!etapaFluxo.opcoes && !etapaFluxo.esperaResposta && !etapaFluxo.acao && (
                            <div className="bg-gray-50 p-3 rounded border text-center text-sm text-gray-500">
                              Nenhuma opção definida
                            </div>
                          )}
                        </div>
                        
                        {etapaFluxo.esperaResposta && (
                          <div>
                            <div className="flex items-center mb-2">
                              <Switch id="espera-resposta" defaultChecked={etapaFluxo.esperaResposta} />
                              <Label htmlFor="espera-resposta" className="ml-2">
                                Aguardar resposta do usuário
                              </Label>
                            </div>
                            <div className="flex gap-2 items-center ml-6">
                              <Label htmlFor="proximo-resposta" className="whitespace-nowrap">Ir para:</Label>
                              <Select defaultValue={etapaFluxo.proximo}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Próxima etapa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {fluxoConversaMock.map(etapa => (
                                    <SelectItem key={etapa.id} value={etapa.id}>
                                      Etapa {etapa.id}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                        
                        {etapaFluxo.acao && (
                          <div>
                            <Label htmlFor="acao">Ação Especial</Label>
                            <Select defaultValue={etapaFluxo.acao}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma ação" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="transferir-humano">Transferir para Humano</SelectItem>
                                <SelectItem value="encerrar">Encerrar Conversa</SelectItem>
                                <SelectItem value="api">Chamar API Externa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div className="pt-4 border-t mt-4">
                          <Button className="w-full bg-whatsapp hover:bg-whatsapp/90">
                            Salvar Alterações
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Bot size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">Nenhum fluxo selecionado</h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    Selecione um chatbot existente para editar seu fluxo de conversa ou crie um novo fluxo.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleNovoFluxo}>Criar Novo Fluxo</Button>
                    <Button 
                      className="bg-whatsapp hover:bg-whatsapp/90"
                      onClick={() => {
                        setMostrarFluxo(true);
                        setEtapaAtual("1");
                      }}
                    >
                      Fluxo de Exemplo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chatbots;
