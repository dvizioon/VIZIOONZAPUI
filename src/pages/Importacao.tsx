
import { useState } from "react";
import { 
  Upload, 
  FileSpreadsheet, 
  FileText, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ChevronDown,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Dados mockados para simulação
const importacoesMock = [
  {
    id: "1",
    nome: "Clientes Julho 2023",
    arquivo: "clientes-jul-2023.xlsx",
    data: "2023-07-15T10:30:00",
    status: "concluido",
    tipo: "contatos",
    registros: 245,
    sucessos: 240,
    erros: 5,
    logs: [
      { tipo: "info", mensagem: "Início da importação", data: "2023-07-15T10:30:00" },
      { tipo: "info", mensagem: "Processando linha 100/245", data: "2023-07-15T10:31:15" },
      { tipo: "erro", mensagem: "Erro ao importar linha 120: Telefone inválido", data: "2023-07-15T10:31:30" },
      { tipo: "erro", mensagem: "Erro ao importar linha 145: Email duplicado", data: "2023-07-15T10:32:00" },
      { tipo: "info", mensagem: "Importação concluída", data: "2023-07-15T10:33:45" }
    ]
  },
  {
    id: "2",
    nome: "Prospects Marketing",
    arquivo: "prospects-marketing.csv",
    data: "2023-07-14T16:45:00",
    status: "concluido",
    tipo: "contatos",
    registros: 150,
    sucessos: 150,
    erros: 0,
    logs: [
      { tipo: "info", mensagem: "Início da importação", data: "2023-07-14T16:45:00" },
      { tipo: "info", mensagem: "Importação concluída", data: "2023-07-14T16:46:30" }
    ]
  },
  {
    id: "3",
    nome: "Mensagens Automáticas",
    arquivo: "mensagens-automáticas.xlsx",
    data: "2023-07-10T09:15:00",
    status: "erro",
    tipo: "mensagens",
    registros: 50,
    sucessos: 20,
    erros: 30,
    logs: [
      { tipo: "info", mensagem: "Início da importação", data: "2023-07-10T09:15:00" },
      { tipo: "erro", mensagem: "Formato de arquivo inválido na coluna 'agendamento'", data: "2023-07-10T09:15:30" },
      { tipo: "erro", mensagem: "Importação cancelada devido a erros críticos", data: "2023-07-10T09:16:00" }
    ]
  },
  {
    id: "4",
    nome: "Atualização Clientes VIP",
    arquivo: "clientes-vip-update.csv",
    data: "2023-07-16T14:20:00",
    status: "processando",
    tipo: "contatos",
    registros: 75,
    sucessos: 40,
    erros: 2,
    logs: [
      { tipo: "info", mensagem: "Início da importação", data: "2023-07-16T14:20:00" },
      { tipo: "info", mensagem: "Processando linha 40/75", data: "2023-07-16T14:21:15" },
      { tipo: "erro", mensagem: "Erro ao importar linha 35: Telefone inválido", data: "2023-07-16T14:21:30" }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "concluido":
      return (
        <Badge className="bg-whatsapp text-white flex items-center gap-1">
          <CheckCircle size={12} />
          <span>Concluído</span>
        </Badge>
      );
    case "processando":
      return (
        <Badge className="bg-blue-500 text-white flex items-center gap-1">
          <Clock size={12} />
          <span>Processando</span>
        </Badge>
      );
    case "erro":
      return (
        <Badge className="bg-red-500 text-white flex items-center gap-1">
          <XCircle size={12} />
          <span>Erro</span>
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

const Importacao = () => {
  const [importacoes] = useState(importacoesMock);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Importação</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Nova Importação</CardTitle>
              <CardDescription>
                Importe arquivos CSV ou Excel com seus contatos e mensagens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload" className="text-sm font-medium">
                    Selecione um arquivo
                  </Label>
                  <div className="mt-2 flex justify-center border-2 border-dashed border-gray-300 px-6 py-10 rounded-lg">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <Label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-whatsapp hover:text-whatsapp/80 focus-within:outline-none"
                        >
                          <span>Carregar um arquivo</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileChange}
                          />
                        </Label>
                        <p className="pl-1">ou arraste e solte</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        CSV, XLS, XLSX até 10MB
                      </p>
                    </div>
                  </div>
                  
                  {selectedFiles && selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Arquivos selecionados:</div>
                      {Array.from(selectedFiles).map((file, index) => (
                        <div key={index} className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                          <FileSpreadsheet size={18} className="text-amber-500 mr-2" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="tipo-importacao" className="text-sm font-medium">
                    Tipo de Importação
                  </Label>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 flex justify-center items-center gap-2">
                      <Users size={16} />
                      Contatos
                    </Button>
                    <Button variant="outline" className="flex-1 flex justify-center items-center gap-2">
                      <FileText size={16} />
                      Mensagens
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-whatsapp hover:bg-whatsapp/90"
                  disabled={!selectedFiles || selectedFiles.length === 0}
                >
                  Iniciar Importação
                </Button>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <Button variant="link" className="text-xs text-whatsapp p-0 h-auto">
                      <Download size={14} className="mr-1" />
                      Template de Contatos
                    </Button>
                    <Button variant="link" className="text-xs text-whatsapp p-0 h-auto">
                      <Download size={14} className="mr-1" />
                      Template de Mensagens
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as suas importações anteriores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {importacoes.map((importacao) => (
                  <Accordion key={importacao.id} type="single" collapsible className="border rounded-md">
                    <AccordionItem value={importacao.id} className="border-0">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-md">
                              <FileSpreadsheet size={20} className="text-gray-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{importacao.nome}</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {importacao.arquivo} • {new Date(importacao.data).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 md:mt-0">
                            <Badge variant="outline" className="font-normal">
                              {importacao.tipo === "contatos" ? "Contatos" : "Mensagens"}
                            </Badge>
                            {getStatusBadge(importacao.status)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          <div>
                            <div className="grid grid-cols-3 gap-2 mb-2">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-xs text-gray-500">Total</p>
                                <p className="text-lg font-medium">{importacao.registros}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-xs text-gray-500">Sucesso</p>
                                <p className="text-lg font-medium text-green-600">{importacao.sucessos}</p>
                              </div>
                              <div className="bg-red-50 p-3 rounded-md">
                                <p className="text-xs text-gray-500">Erros</p>
                                <p className="text-lg font-medium text-red-600">{importacao.erros}</p>
                              </div>
                            </div>
                            
                            {importacao.status === "processando" && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progresso</span>
                                  <span>{Math.round((importacao.sucessos / importacao.registros) * 100)}%</span>
                                </div>
                                <Progress 
                                  value={(importacao.sucessos / importacao.registros) * 100} 
                                  className="h-2"
                                />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium mb-2">Log de Importação</h5>
                            <div className="bg-gray-50 rounded-md p-2 text-xs h-32 overflow-y-auto">
                              {importacao.logs.map((log, index) => (
                                <div 
                                  key={index} 
                                  className={`mb-1 p-1 rounded ${
                                    log.tipo === "erro" 
                                      ? "bg-red-50 text-red-600" 
                                      : "text-gray-600"
                                  }`}
                                >
                                  <span className="inline-block w-20 text-gray-400">
                                    {new Date(log.data).toLocaleTimeString('pt-BR')}
                                  </span>
                                  {log.tipo === "erro" ? (
                                    <AlertCircle size={12} className="inline mr-1" />
                                  ) : null}
                                  {log.mensagem}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            {importacao.status === "erro" && (
                              <Button size="sm" className="bg-whatsapp hover:bg-whatsapp/90">
                                Tentar Novamente
                              </Button>
                            )}
                            {importacao.status === "concluido" && (
                              <Button size="sm" variant="outline">
                                <Download size={14} className="mr-1" />
                                Relatório
                              </Button>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Importacao;
