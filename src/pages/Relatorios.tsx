import { useState } from "react";
import { 
  BarChart2, 
  BarChart as BarChartIcon, 
  Calendar, 
  Download, 
  Users, 
  MessageSquare, 
  Clock, 
  Bot,
  Phone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart } from "@/components/ui/barchart";

const Relatorios = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("7d");
  
  // Dados mockados para os gráficos
  const dadosMensagens = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Mensagens Recebidas",
        data: [65, 59, 80, 81, 56, 38, 40],
        backgroundColor: "rgba(37, 211, 102, 0.2)",
        borderColor: "rgba(37, 211, 102, 1)",
        borderWidth: 2,
      },
      {
        label: "Mensagens Enviadas",
        data: [45, 79, 50, 61, 76, 28, 30],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dadosTempoResposta = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Tempo Médio de Resposta (min)",
        data: [5, 8, 4, 7, 3, 10, 6],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dadosAtendimentos = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Atendimentos Concluídos",
        data: [25, 30, 22, 28, 35, 15, 18],
        backgroundColor: "rgba(37, 211, 102, 0.2)",
        borderColor: "rgba(37, 211, 102, 1)",
        borderWidth: 2,
      },
      {
        label: "Atendimentos Pendentes",
        data: [10, 8, 12, 7, 5, 4, 6],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dadosBots = {
    labels: ["Atendimento", "Vendas", "Suporte"],
    datasets: [
      {
        label: "Taxa de Resolução (%)",
        data: [85, 65, 42],
        backgroundColor: [
          "rgba(37, 211, 102, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(37, 211, 102, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Estatísticas gerais
  const estatisticas = {
    mensagensRecebidas: 3245,
    mensagensEnviadas: 2890,
    mediaTempoResposta: "5.2 min",
    taxaSatisfacao: "92%",
    atendimentosConcluidos: 840,
    atendimentosPendentes: 32,
    novosContatos: 158,
    taxaResolucaoBots: "75%"
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Relatórios</h1>
        
        <div className="flex items-center gap-3">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="ontem">Ontem</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Personalizar
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Mensagens</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{estatisticas.mensagensRecebidas + estatisticas.mensagensEnviadas}</p>
                  <span className="text-xs text-green-500 font-medium ml-2">+12.5%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Recebidas: {estatisticas.mensagensRecebidas}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">Enviadas: {estatisticas.mensagensEnviadas}</span>
                </div>
              </div>
              <div className="p-3 bg-whatsapp/10 rounded-full">
                <MessageSquare size={20} className="text-whatsapp" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Tempo Médio de Resposta</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{estatisticas.mediaTempoResposta}</p>
                  <span className="text-xs text-green-500 font-medium ml-2">-8.3%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Taxa de Satisfação: {estatisticas.taxaSatisfacao}</span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Clock size={20} className="text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Atendimentos</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{estatisticas.atendimentosConcluidos + estatisticas.atendimentosPendentes}</p>
                  <span className="text-xs text-green-500 font-medium ml-2">+5.2%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Concluídos: {estatisticas.atendimentosConcluidos}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">Pendentes: {estatisticas.atendimentosPendentes}</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Phone size={20} className="text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Novos Contatos</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{estatisticas.novosContatos}</p>
                  <span className="text-xs text-green-500 font-medium ml-2">+18.7%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Eficiência Bots: {estatisticas.taxaResolucaoBots}</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users size={20} className="text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="mensagens" className="space-y-4">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="mensagens" className="flex-1">Mensagens</TabsTrigger>
          <TabsTrigger value="atendimentos" className="flex-1">Atendimentos</TabsTrigger>
          <TabsTrigger value="bots" className="flex-1">Chatbots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mensagens" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Volume de Mensagens</CardTitle>
                <CardDescription>
                  Comparativo de mensagens enviadas e recebidas no período.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart 
                  data={dadosMensagens} 
                  className="w-full h-full"
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Resposta</CardTitle>
                <CardDescription>
                  Variação do tempo médio de resposta em minutos.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart 
                  data={dadosTempoResposta} 
                  className="w-full h-full"
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="atendimentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atendimentos Diários</CardTitle>
              <CardDescription>
                Quantidade de atendimentos concluídos e pendentes por dia.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart 
                data={dadosAtendimentos} 
                className="w-full h-full"
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Chatbots</CardTitle>
              <CardDescription>
                Taxa de resolução de atendimentos pelos chatbots.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart 
                data={dadosBots} 
                className="w-full h-full"
                options={{
                  responsive: true,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      max: 100,
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;
