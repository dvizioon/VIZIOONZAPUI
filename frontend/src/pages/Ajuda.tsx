
import { 
  HelpCircle, 
  FileText, 
  Video, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  ExternalLink,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    pergunta: "Como adicionar uma nova conexão WhatsApp?",
    resposta: "Para adicionar uma nova conexão de WhatsApp, vá para a página 'Conexões', clique no botão 'Nova Conexão', preencha os dados necessários e escaneie o QR Code com o WhatsApp do número que deseja conectar."
  },
  {
    pergunta: "É possível conectar vários números de WhatsApp?",
    resposta: "Sim, o ZapConecta permite conectar múltiplos números de WhatsApp. Cada conexão pode ser gerenciada separadamente com suas próprias configurações e chatbots."
  },
  {
    pergunta: "Como importar meus contatos para o sistema?",
    resposta: "Para importar contatos, acesse a página 'Importação', clique em 'Importar', selecione um arquivo CSV ou Excel com os contatos, configure as opções de importação e confirme. Você também pode baixar um modelo de arquivo de importação na mesma página."
  },
  {
    pergunta: "Quais são os limites de envio de mensagens?",
    resposta: "Os limites de envio de mensagens dependem das restrições do WhatsApp e do seu plano no ZapConecta. Recomendamos evitar envios em massa para evitar bloqueios. Consulte a documentação do WhatsApp para mais informações sobre limites específicos."
  },
  {
    pergunta: "Como criar um chatbot automatizado?",
    resposta: "Para criar um chatbot, vá para a página 'Chatbots', clique em 'Novo Chatbot', defina um nome, descrição e mensagens de boas-vindas. Em seguida, use o editor de fluxo para configurar respostas automáticas e opções de interação com os usuários."
  },
  {
    pergunta: "É possível integrar com meu CRM?",
    resposta: "Sim, o ZapConecta oferece integrações com diversos CRMs e outras ferramentas. Acesse 'Configurações > API > Integrações' para conectar com sistemas externos ou use nossa API para criar integrações personalizadas."
  },
  {
    pergunta: "Como transferir uma conversa para outro atendente?",
    resposta: "Durante uma conversa, clique no botão de menu (três pontos) e selecione 'Transferir'. Escolha o atendente ou departamento para o qual deseja transferir a conversa e confirme."
  },
  {
    pergunta: "Como faço para exportar relatórios?",
    resposta: "Acesse a página 'Relatórios', selecione o tipo e período do relatório que deseja, e clique no botão 'Exportar'. Você pode escolher o formato de exportação (PDF, CSV ou Excel)."
  }
];

const Ajuda = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Ajuda</h1>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-whatsapp/20 to-blue-500/20 rounded-lg" />
        <div className="relative bg-white/60 backdrop-blur-sm rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Como podemos ajudar?</h2>
            <p className="text-gray-600 mb-6">
              Encontre respostas para suas dúvidas, tutoriais e documentação.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar na documentação..."
                className="pl-10 py-6 text-base"
              />
              <Button className="absolute right-1 top-1 bottom-1 bg-whatsapp hover:bg-whatsapp/90">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <FileText className="text-whatsapp" size={24} />
            <div>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Guias e tutoriais detalhados
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-whatsapp flex items-center gap-2">
                  <ArrowRight size={14} />
                  Primeiros passos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-whatsapp flex items-center gap-2">
                  <ArrowRight size={14} />
                  Gerenciando conexões
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-whatsapp flex items-center gap-2">
                  <ArrowRight size={14} />
                  Configurando chatbots
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-whatsapp flex items-center gap-2">
                  <ArrowRight size={14} />
                  Importando contatos
                </a>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" className="w-full gap-2">
              Ver Documentação Completa
              <ExternalLink size={14} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Video className="text-blue-500" size={24} />
            <div>
              <CardTitle>Vídeos Tutoriais</CardTitle>
              <CardDescription>
                Aprenda com exemplos práticos
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Como criar sua primeira conexão
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Criando um chatbot avançado</span>
                  <Badge variant="outline" className="ml-1 text-xs">Novo</Badge>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Configurando fluxos automáticos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Gerenciando múltiplos atendentes
                </a>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" className="w-full gap-2">
              Ver Canal de Vídeos
              <ExternalLink size={14} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <MessageSquare className="text-amber-500" size={24} />
            <div>
              <CardTitle>Suporte</CardTitle>
              <CardDescription>
                Entre em contato conosco
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-amber-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Chat de suporte ao vivo
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-amber-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Sistema de tickets
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-amber-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  Suporte por email
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-amber-500 flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Agendar uma demonstração</span>
                </a>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" className="w-full gap-2">
              Falar com Suporte
              <ExternalLink size={14} />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="tutoriais">Tutoriais Rápidos</TabsTrigger>
          <TabsTrigger value="status">Status do Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle size={20} />
                Perguntas Frequentes
              </CardTitle>
              <CardDescription>
                Respostas para as dúvidas mais comuns sobre o ZapConecta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.pergunta}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{item.resposta}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutoriais">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={20} />
                Tutoriais Rápidos
              </CardTitle>
              <CardDescription>
                Guias passo a passo para as tarefas mais comuns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    titulo: "Configurando sua primeira conexão",
                    descricao: "Aprenda como conectar seu primeiro número WhatsApp em menos de 5 minutos.",
                    nivel: "Iniciante",
                    tempo: "5 min"
                  },
                  {
                    titulo: "Importando contatos em massa",
                    descricao: "Como importar e organizar centenas de contatos de uma só vez.",
                    nivel: "Intermediário",
                    tempo: "10 min"
                  },
                  {
                    titulo: "Criando um fluxo de atendimento automático",
                    descricao: "Configure respostas automáticas para perguntas frequentes.",
                    nivel: "Avançado",
                    tempo: "15 min"
                  },
                  {
                    titulo: "Gerenciando múltiplos atendentes",
                    descricao: "Como configurar equipes e distribuir conversas automaticamente.",
                    nivel: "Intermediário",
                    tempo: "8 min"
                  },
                  {
                    titulo: "Criando campanhas de marketing",
                    descricao: "Aprenda a criar e agendar campanhas de mensagens para seus contatos.",
                    nivel: "Intermediário",
                    tempo: "12 min"
                  },
                  {
                    titulo: "Configurando mensagens programadas",
                    descricao: "Como agendar mensagens para envio automático em datas específicas.",
                    nivel: "Iniciante",
                    tempo: "7 min"
                  }
                ].map((tutorial, index) => (
                  <Card key={index} className="bg-gray-50 border">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-1">{tutorial.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-3">{tutorial.descricao}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {tutorial.nivel}
                          </Badge>
                          <span className="text-xs text-gray-500">{tutorial.tempo}</span>
                        </div>
                        <Button variant="link" className="h-auto p-0 text-whatsapp">
                          Ver tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Status do Sistema
              </CardTitle>
              <CardDescription>
                Verifique o status atual dos serviços do ZapConecta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { servico: "API WhatsApp", status: "operacional", uptime: "99.9%" },
                  { servico: "Serviço de Mensagens", status: "operacional", uptime: "99.8%" },
                  { servico: "Serviço de Chatbots", status: "operacional", uptime: "99.7%" },
                  { servico: "Banco de Dados", status: "operacional", uptime: "99.9%" },
                  { servico: "Serviço de Notificações", status: "degradado", uptime: "95.2%" },
                  { servico: "Painel de Controle", status: "operacional", uptime: "99.9%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === "operacional" ? "bg-green-500" : 
                        item.status === "degradado" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      <span className="font-medium">{item.servico}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">Uptime: {item.uptime}</span>
                      <Badge className={
                        item.status === "operacional" ? "bg-green-500" : 
                        item.status === "degradado" ? "bg-amber-500" : "bg-red-500"
                      }>
                        {item.status === "operacional" ? "Operacional" : 
                         item.status === "degradado" ? "Degradado" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  Última atualização: {new Date().toLocaleString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Ajuda;
