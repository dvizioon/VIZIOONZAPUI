
import { useState } from "react";
import { 
  Brain, 
  MessageSquare, 
  Image as ImageIcon, 
  Mic, 
  Plus, 
  Trash, 
  Save,
  Repeat,
  Lightbulb,
  RotateCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactFlow, Background, Controls, Node, Edge, Panel, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Nós iniciais para o fluxo do agente
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Entrada' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
  {
    id: '2',
    data: { label: 'Processamento' },
    position: { x: 250, y: 125 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Resposta' },
    position: { x: 250, y: 225 },
    style: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }
  },
];

// Conexões iniciais entre os nós
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const AgenteAI = () => {
  // Estados para o fluxo de nós
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Função para conectar nós
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));
  
  // Estado para o tipo de modelo selecionado
  const [modeloSelecionado, setModeloSelecionado] = useState("texto");

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Agente AI</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Repeat size={16} />
            Testar
          </Button>
          <Button className="gap-2 bg-whatsapp hover:bg-whatsapp/90">
            <Save size={16} />
            Salvar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Fluxo do Agente</CardTitle>
              <CardDescription>
                Configure o fluxo de processamento do seu agente AI
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[520px]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className="bg-gray-50"
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
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Configurações do Agente</CardTitle>
              <CardDescription>
                Configure as opções do seu agente AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome-agente">Nome do Agente</Label>
                <Input id="nome-agente" placeholder="Ex: Assistente de Vendas" />
              </div>
              
              <div>
                <Label htmlFor="descricao-agente">Descrição</Label>
                <Textarea 
                  id="descricao-agente" 
                  placeholder="Descreva a função deste agente..." 
                  className="h-20" 
                />
              </div>
              
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="claude">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Ativo</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch id="agente-ativo" defaultChecked />
                  <Label htmlFor="agente-ativo" className="text-sm font-normal">
                    Agente está ativo
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Entrada</CardTitle>
              <CardDescription>
                Selecione os tipos de entrada que seu agente pode processar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="texto" onValueChange={setModeloSelecionado}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="texto">
                    <MessageSquare size={16} className="mr-2" /> Texto
                  </TabsTrigger>
                  <TabsTrigger value="imagem">
                    <ImageIcon size={16} className="mr-2" /> Imagem
                  </TabsTrigger>
                  <TabsTrigger value="audio">
                    <Mic size={16} className="mr-2" /> Áudio
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="texto" className="space-y-4">
                  <div>
                    <Label htmlFor="texto-promptTemplate">Template de Prompt</Label>
                    <Textarea 
                      id="texto-promptTemplate" 
                      placeholder="Digite o template para seu agente..." 
                      className="h-20" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="texto-temperatura">Temperatura</Label>
                    <Input id="texto-temperatura" type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Mais Determinístico</span>
                      <span>Mais Criativo</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="imagem" className="space-y-4">
                  <div>
                    <Label htmlFor="imagem-modelo">Modelo de Visão</Label>
                    <Select defaultValue="gpt4-vision">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4-vision">GPT-4 Vision</SelectItem>
                        <SelectItem value="claude-vision">Claude 3 Vision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Qualidade de Análise</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="text-sm">Baixa</Button>
                      <Button variant="outline" className="text-sm bg-gray-100">Alta</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="audio" className="space-y-4">
                  <div>
                    <Label htmlFor="audio-modelo">Modelo de Transcrição</Label>
                    <Select defaultValue="whisper">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whisper">Whisper</SelectItem>
                        <SelectItem value="whisper-large">Whisper Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Idiomas Suportados</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>Português</Badge>
                      <Badge variant="outline">Inglês</Badge>
                      <Badge variant="outline">Espanhol</Badge>
                      <Badge variant="outline">+ Adicionar</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90">
                <Lightbulb size={16} />
                Configurar {modeloSelecionado === "texto" ? "Texto" : modeloSelecionado === "imagem" ? "Imagem" : "Áudio"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendamento</CardTitle>
            <CardDescription>Configure quando seu agente será executado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="frequencia">Frequência</Label>
              <Select defaultValue="manual">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="hora">A cada hora</SelectItem>
                  <SelectItem value="dia">Diariamente</SelectItem>
                  <SelectItem value="semana">Semanalmente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Dias da Semana</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button variant="outline" size="sm" className="w-10 h-10">D</Button>
                <Button variant="outline" size="sm" className="w-10 h-10 bg-gray-100">S</Button>
                <Button variant="outline" size="sm" className="w-10 h-10 bg-gray-100">T</Button>
                <Button variant="outline" size="sm" className="w-10 h-10">Q</Button>
                <Button variant="outline" size="sm" className="w-10 h-10">Q</Button>
                <Button variant="outline" size="sm" className="w-10 h-10 bg-gray-100">S</Button>
                <Button variant="outline" size="sm" className="w-10 h-10">S</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
            <CardDescription>Configure o pipeline de processamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">1</span>
                  <span>Receber Entrada</span>
                </div>
                <RotateCw size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">2</span>
                  <span>Processamento AI</span>
                </div>
                <RotateCw size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-2">3</span>
                  <span>Retornar Resposta</span>
                </div>
                <RotateCw size={16} className="text-gray-400" />
              </div>
              <Button variant="outline" className="w-full text-sm mt-2">
                <Plus size={14} className="mr-1" /> Adicionar Etapa
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Configure as integrações do seu agente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8l-8 8-8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Webhook</span>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <span className="mr-2 text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>Google Sheets</span>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <span className="mr-2 text-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>LinkedIn</span>
              </div>
              <Switch checked={false} />
            </div>
            <Button variant="outline" className="w-full text-sm mt-2">
              <Plus size={14} className="mr-1" /> Adicionar Integração
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgenteAI;
