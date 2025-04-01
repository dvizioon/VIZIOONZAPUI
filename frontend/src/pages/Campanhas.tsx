
import { useState } from "react";
import { 
  MessageSquare, 
  Calendar, 
  Play, 
  Pause, 
  Plus, 
  MoreVertical,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

// Dados mockados para simulação
const campanhasMock = [
  {
    id: "1",
    nome: "Promoção Julho",
    descricao: "Campanha de divulgação da promoção de julho com descontos em todos os produtos.",
    status: "ativa",
    dataInicio: "2023-07-10T09:00:00",
    dataFim: "2023-07-20T18:00:00",
    destinatarios: 240,
    enviadas: 180,
    lidas: 120,
    respondidas: 45,
    conversoes: 22,
    agendada: false
  },
  {
    id: "2",
    nome: "Lançamento Produto X",
    descricao: "Campanha de lançamento do novo produto X com condições especiais para os primeiros compradores.",
    status: "pausada",
    dataInicio: "2023-07-15T10:00:00",
    dataFim: "2023-07-25T18:00:00",
    destinatarios: 500,
    enviadas: 0,
    lidas: 0,
    respondidas: 0,
    conversoes: 0,
    agendada: true
  },
  {
    id: "3",
    nome: "Pesquisa de Satisfação",
    descricao: "Pesquisa para avaliar a satisfação dos clientes com os produtos e serviços.",
    status: "concluida",
    dataInicio: "2023-06-20T09:00:00",
    dataFim: "2023-06-30T18:00:00",
    destinatarios: 350,
    enviadas: 350,
    lidas: 210,
    respondidas: 105,
    conversoes: 0,
    agendada: false
  },
  {
    id: "4",
    nome: "Reativação de Clientes",
    descricao: "Campanha para recuperar clientes inativos há mais de 3 meses.",
    status: "rascunho",
    dataInicio: null,
    dataFim: null,
    destinatarios: 180,
    enviadas: 0,
    lidas: 0,
    respondidas: 0,
    conversoes: 0,
    agendada: false
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ativa":
      return (
        <Badge className="bg-whatsapp text-white flex items-center gap-1">
          <Play size={12} />
          <span>Ativa</span>
        </Badge>
      );
    case "pausada":
      return (
        <Badge className="bg-amber-500 text-white flex items-center gap-1">
          <Pause size={12} />
          <span>Pausada</span>
        </Badge>
      );
    case "concluida":
      return (
        <Badge className="bg-blue-500 text-white flex items-center gap-1">
          <CheckCircle size={12} />
          <span>Concluída</span>
        </Badge>
      );
    case "rascunho":
      return (
        <Badge className="bg-gray-400 text-white flex items-center gap-1">
          <Clock size={12} />
          <span>Rascunho</span>
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-400 text-white">
          Desconhecido
        </Badge>
      );
  }
};

const Campanhas = () => {
  const [campanhas] = useState(campanhasMock);
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Campanhas</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-whatsapp hover:bg-whatsapp/90">
              <Plus size={16} className="mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Campanha</DialogTitle>
              <DialogDescription>
                Configure uma nova campanha de mensagens para seus contatos.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="detalhes" className="mt-4">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="detalhes" className="flex-1">Detalhes</TabsTrigger>
                <TabsTrigger value="mensagem" className="flex-1">Mensagem</TabsTrigger>
                <TabsTrigger value="destinatarios" className="flex-1">Destinatários</TabsTrigger>
                <TabsTrigger value="agendamento" className="flex-1">Agendamento</TabsTrigger>
              </TabsList>
              
              <TabsContent value="detalhes">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome da Campanha</Label>
                    <Input id="nome" placeholder="Ex: Promoção de Verão" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" placeholder="Descreva o objetivo desta campanha" rows={3} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="conexao">Conexão WhatsApp</Label>
                    <Input id="conexao" placeholder="Selecione a conexão para envio" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mensagem">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea 
                      id="mensagem" 
                      placeholder="Digite a mensagem que será enviada aos contatos"
                      rows={6}
                    />
                    <p className="text-xs text-gray-500">
                      Você pode usar variáveis como {"{{nome}}"}, {"{{email}}"} que serão substituídas pelos dados do contato.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="midia">Mídia (opcional)</Label>
                    <Input id="midia" type="file" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="destinatarios">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label>Selecione os destinatários</Label>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                          <input type="radio" id="todos" name="destinatarios" className="mt-1" />
                          <div>
                            <Label htmlFor="todos" className="font-medium">Todos os contatos</Label>
                            <p className="text-xs text-gray-500">A mensagem será enviada para todos os contatos.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="radio" id="grupo" name="destinatarios" className="mt-1" />
                          <div>
                            <Label htmlFor="grupo" className="font-medium">Por grupo</Label>
                            <p className="text-xs text-gray-500">Selecione um ou mais grupos de contatos.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="radio" id="etiqueta" name="destinatarios" className="mt-1" />
                          <div>
                            <Label htmlFor="etiqueta" className="font-medium">Por etiqueta</Label>
                            <p className="text-xs text-gray-500">Selecione uma ou mais etiquetas.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="radio" id="segmento" name="destinatarios" className="mt-1" />
                          <div>
                            <Label htmlFor="segmento" className="font-medium">Segmentação avançada</Label>
                            <p className="text-xs text-gray-500">Crie regras de segmentação personalizadas.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agendamento">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label>Tipo de Envio</Label>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 flex justify-center items-center gap-2">
                        <Play size={16} />
                        Imediato
                      </Button>
                      <Button variant="outline" className="flex-1 flex justify-center items-center gap-2">
                        <Calendar size={16} />
                        Agendado
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="data-inicio">Data de Início</Label>
                    <Input id="data-inicio" type="datetime-local" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="data-fim">Data de Término (opcional)</Label>
                    <Input id="data-fim" type="datetime-local" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-4">
              <Button variant="outline">Salvar como Rascunho</Button>
              <Button className="bg-whatsapp hover:bg-whatsapp/90">Criar Campanha</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {campanhas.map((campanha) => (
          <Card key={campanha.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{campanha.nome}</CardTitle>
                  </div>
                  <CardDescription className="mt-1">{campanha.descricao}</CardDescription>
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
                    {campanha.status === "ativa" && (
                      <DropdownMenuItem>
                        <Pause size={14} className="mr-2" />
                        Pausar
                      </DropdownMenuItem>
                    )}
                    {campanha.status === "pausada" && (
                      <DropdownMenuItem>
                        <Play size={14} className="mr-2" />
                        Retomar
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <BarChart size={14} className="mr-2" />
                      Relatório Detalhado
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users size={14} className="mr-2" />
                      Ver Destinatários
                    </DropdownMenuItem>
                    {campanha.status !== "concluida" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <XCircle size={14} className="mr-2" />
                          Cancelar Campanha
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {getStatusBadge(campanha.status)}
                  
                  {campanha.agendada && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Agendada</span>
                    </Badge>
                  )}
                </div>
                
                <div>
                  {campanha.status !== "rascunho" && (
                    <>
                      <div className="text-xs text-gray-500 mb-1">
                        {campanha.dataInicio && (
                          <>Início: {new Date(campanha.dataInicio).toLocaleString('pt-BR')}</>
                        )}
                        {campanha.dataFim && (
                          <> • Fim: {new Date(campanha.dataFim).toLocaleString('pt-BR')}</>
                        )}
                      </div>
                    </>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">Destinatários</span>
                      </div>
                      <p className="text-lg font-medium">{campanha.destinatarios}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">Enviadas</span>
                      </div>
                      <p className="text-lg font-medium">{campanha.enviadas}</p>
                    </div>
                  </div>
                  
                  {campanha.status !== "rascunho" && campanha.enviadas > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Progresso</span>
                        <span>{Math.round((campanha.enviadas / campanha.destinatarios) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(campanha.enviadas / campanha.destinatarios) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  {campanha.status === "concluida" && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center">
                        <p className="text-lg font-medium text-blue-500">{Math.round((campanha.lidas / campanha.enviadas) * 100)}%</p>
                        <p className="text-xs text-gray-500">Leitura</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-green-500">{Math.round((campanha.respondidas / campanha.enviadas) * 100)}%</p>
                        <p className="text-xs text-gray-500">Resposta</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-amber-500">{Math.round((campanha.conversoes / campanha.enviadas) * 100)}%</p>
                        <p className="text-xs text-gray-500">Conversão</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
              {campanha.status === "ativa" && (
                <Button variant="outline" className="gap-2">
                  <Pause size={16} />
                  Pausar
                </Button>
              )}
              {campanha.status === "pausada" && (
                <Button className="gap-2 bg-whatsapp hover:bg-whatsapp/90">
                  <Play size={16} />
                  Continuar
                </Button>
              )}
              {campanha.status === "rascunho" && (
                <Button className="gap-2 bg-whatsapp hover:bg-whatsapp/90">
                  <Play size={16} />
                  Iniciar
                </Button>
              )}
              {campanha.status === "concluida" && (
                <Button variant="outline" className="gap-2">
                  <BarChart size={16} />
                  Relatório
                </Button>
              )}
              
              {campanha.status !== "concluida" && (
                <Button variant="ghost" className="text-red-500">
                  Cancelar
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campanhas;
