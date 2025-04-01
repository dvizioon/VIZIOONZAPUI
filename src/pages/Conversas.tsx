
import { useState } from "react";
import { 
  MessageSquare,
  Search,
  Filter,
  Phone,
  MoreVertical,
  Send,
  Paperclip,
  Mic,
  Smile,
  ArrowLeft,
  CheckCheck,
  Clock,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface Contato {
  id: string;
  nome: string;
  avatar?: string;
  ultimaMensagem: string;
  dataUltimaMensagem: string;
  status: "online" | "offline";
  naoLidas: number;
}

interface Mensagem {
  id: string;
  conteudo: string;
  enviada: boolean;
  timestamp: string;
  status: "enviada" | "entregue" | "lida" | "pendente";
}

// Dados mockados para simulação
const contatosMock: Contato[] = [
  {
    id: "1",
    nome: "João Silva",
    ultimaMensagem: "Olá, gostaria de saber mais sobre o produto X",
    dataUltimaMensagem: "10:23",
    status: "online",
    naoLidas: 2
  },
  {
    id: "2",
    nome: "Maria Souza",
    ultimaMensagem: "Obrigada pelo atendimento!",
    dataUltimaMensagem: "09:15",
    status: "offline",
    naoLidas: 0
  },
  {
    id: "3",
    nome: "Pedro Santos",
    ultimaMensagem: "Quando chega o meu pedido?",
    dataUltimaMensagem: "Ontem",
    status: "offline",
    naoLidas: 0
  },
  {
    id: "4",
    nome: "Ana Costa",
    ultimaMensagem: "Preciso de ajuda com minha compra",
    dataUltimaMensagem: "Ontem",
    status: "online",
    naoLidas: 1
  },
  {
    id: "5",
    nome: "Lucas Oliveira",
    ultimaMensagem: "Qual o horário de funcionamento?",
    dataUltimaMensagem: "Seg",
    status: "offline",
    naoLidas: 0
  },
  {
    id: "6",
    nome: "Carlos Mendes",
    ultimaMensagem: "Estou com um problema no aplicativo",
    dataUltimaMensagem: "Seg",
    status: "offline",
    naoLidas: 0
  },
  {
    id: "7",
    nome: "Juliana Lima",
    ultimaMensagem: "Vou verificar e te respondo",
    dataUltimaMensagem: "Dom",
    status: "offline",
    naoLidas: 0
  }
];

// Mensagens mockadas para um chat específico
const mensagensMock: Record<string, Mensagem[]> = {
  "1": [
    {
      id: "m1",
      conteudo: "Olá, tudo bem? Gostaria de saber mais sobre o produto X",
      enviada: false,
      timestamp: "10:20",
      status: "lida"
    },
    {
      id: "m2",
      conteudo: "Claro, o produto X é o nosso mais recente lançamento. Ele tem as seguintes características...",
      enviada: true,
      timestamp: "10:22",
      status: "lida"
    },
    {
      id: "m3",
      conteudo: "E qual é o preço?",
      enviada: false,
      timestamp: "10:23",
      status: "lida"
    },
    {
      id: "m4",
      conteudo: "O preço é R$ 299,90, mas estamos com uma promoção e você pode adquirir por R$ 249,90 até o final da semana.",
      enviada: true,
      timestamp: "10:25",
      status: "entregue"
    }
  ],
  "4": [
    {
      id: "m1",
      conteudo: "Olá, preciso de ajuda com minha compra",
      enviada: false,
      timestamp: "Ontem, 18:30",
      status: "lida"
    },
    {
      id: "m2",
      conteudo: "Olá Ana, em que posso ajudar?",
      enviada: true,
      timestamp: "Ontem, 18:32",
      status: "lida"
    },
    {
      id: "m3",
      conteudo: "Comprei o produto Y mas veio com defeito",
      enviada: false,
      timestamp: "Ontem, 18:35",
      status: "lida"
    }
  ]
};

const Conversas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const isMobile = useIsMobile();

  const handleContatoClick = (contato: Contato) => {
    setContatoSelecionado(contato);
    setMensagens(mensagensMock[contato.id] || []);
  };

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() && contatoSelecionado) {
      const novaMensagemObj: Mensagem = {
        id: `m${Date.now()}`,
        conteudo: novaMensagem,
        enviada: true,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: "enviada"
      };
      
      setMensagens([...mensagens, novaMensagemObj]);
      setNovaMensagem("");
      
      // Atualizar contato com última mensagem (mockado)
      const contatosAtualizados = contatosMock.map(c => {
        if (c.id === contatoSelecionado.id) {
          return {
            ...c,
            ultimaMensagem: novaMensagem,
            dataUltimaMensagem: "Agora"
          };
        }
        return c;
      });
    }
  };

  const contatosFiltrados = contatosMock.filter(
    contato => contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Conversas</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="flex h-full">
          {/* Lista de contatos */}
          {(!contatoSelecionado || !isMobile) && (
            <div className={`${isMobile ? 'w-full' : 'w-1/3 border-r border-gray-200'} flex flex-col h-full`}>
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Buscar conversas..."
                    className="pl-10 py-2 h-10 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex mt-2">
                  <Tabs defaultValue="todas" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="todas" className="flex-1">Todas</TabsTrigger>
                      <TabsTrigger value="nao-lidas" className="flex-1">Não lidas</TabsTrigger>
                      <TabsTrigger value="resolvidas" className="flex-1">Resolvidas</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="divide-y divide-gray-100">
                  {contatosFiltrados.map((contato) => (
                    <div
                      key={contato.id}
                      className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        contatoSelecionado?.id === contato.id ? "bg-whatsapp/5" : ""
                      }`}
                      onClick={() => handleContatoClick(contato)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-whatsapp/10 text-whatsapp">
                            {contato.nome.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                          {contato.avatar && <AvatarImage src={contato.avatar} />}
                        </Avatar>
                        {contato.status === "online" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp rounded-full border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-gray-900 truncate">{contato.nome}</p>
                          <p className="text-xs text-gray-500">{contato.dataUltimaMensagem}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">{contato.ultimaMensagem}</p>
                      </div>
                      
                      {contato.naoLidas > 0 && (
                        <div className="min-w-[20px] h-5 rounded-full bg-whatsapp text-white text-xs flex items-center justify-center">
                          {contato.naoLidas}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
          
          {/* Área de conversa */}
          {contatoSelecionado && (
            <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col h-full`}>
              {/* Cabeçalho da conversa */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button variant="ghost" size="icon" onClick={() => setContatoSelecionado(null)}>
                      <ArrowLeft size={18} />
                    </Button>
                  )}
                  
                  <Avatar>
                    <AvatarFallback className="bg-whatsapp/10 text-whatsapp">
                      {contatoSelecionado.nome.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{contatoSelecionado.nome}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {contatoSelecionado.status === "online" ? (
                        <>
                          <span className="w-2 h-2 bg-whatsapp rounded-full inline-block"></span>
                          Online
                        </>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Área de mensagens */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mensagens.map((mensagem) => (
                    <div 
                      key={mensagem.id}
                      className={`flex ${mensagem.enviada ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          mensagem.enviada 
                            ? "bg-whatsapp-light text-gray-800 rounded-tr-none" 
                            : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{mensagem.conteudo}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${
                          mensagem.enviada ? "justify-end" : "justify-start"
                        }`}>
                          <span className="text-gray-500">{mensagem.timestamp}</span>
                          {mensagem.enviada && (
                            <>
                              {mensagem.status === "lida" && (
                                <CheckCheck size={12} className="text-blue-500" />
                              )}
                              {mensagem.status === "entregue" && (
                                <CheckCheck size={12} className="text-gray-400" />
                              )}
                              {mensagem.status === "enviada" && (
                                <CheckCheck size={12} className="text-gray-400" />
                              )}
                              {mensagem.status === "pendente" && (
                                <Clock size={12} className="text-gray-400" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Área de entrada de texto */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Smile size={20} className="text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Paperclip size={20} className="text-gray-500" />
                  </Button>
                  
                  <Input
                    placeholder="Digite uma mensagem..."
                    className="flex-1"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEnviarMensagem();
                      }
                    }}
                  />
                  
                  <Button variant="ghost" size="icon">
                    <Mic size={20} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    className="bg-whatsapp hover:bg-whatsapp/90 text-white"
                    onClick={handleEnviarMensagem}
                    disabled={!novaMensagem.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Mensagem para selecionar uma conversa quando nenhuma está selecionada */}
          {!contatoSelecionado && !isMobile && (
            <div className="w-2/3 flex flex-col items-center justify-center h-full bg-gray-50">
              <MessageSquare size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">Selecione uma conversa</h3>
              <p className="text-gray-400 mt-1">Escolha uma conversa para começar a interagir</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversas;
