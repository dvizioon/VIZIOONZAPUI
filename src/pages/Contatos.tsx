
import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Upload, 
  Download, 
  Filter, 
  MoreVertical,
  Trash2,
  Edit,
  UserPlus,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Contatos = () => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // Dados mockados para simulação
  const contatosMock = [
    { 
      id: "1", 
      nome: "João Silva", 
      telefone: "+5511999999999", 
      email: "joao@email.com", 
      grupo: "Cliente", 
      etiquetas: ["VIP", "Recorrente"], 
      ultimoContato: "2023-07-12T14:30:00" 
    },
    { 
      id: "2", 
      nome: "Maria Souza", 
      telefone: "+5511888888888", 
      email: "maria@email.com", 
      grupo: "Prospect", 
      etiquetas: ["Novo"], 
      ultimoContato: "2023-07-14T10:15:00" 
    },
    { 
      id: "3", 
      nome: "Pedro Santos", 
      telefone: "+5511777777777", 
      email: "pedro@email.com", 
      grupo: "Cliente", 
      etiquetas: ["Suporte"], 
      ultimoContato: "2023-07-10T16:45:00" 
    },
    { 
      id: "4", 
      nome: "Ana Costa", 
      telefone: "+5511666666666", 
      email: "ana@email.com", 
      grupo: "Parceiro", 
      etiquetas: ["VIP"], 
      ultimoContato: "2023-07-15T09:30:00" 
    },
    { 
      id: "5", 
      nome: "Lucas Oliveira", 
      telefone: "+5511555555555", 
      email: "lucas@email.com", 
      grupo: "Cliente", 
      etiquetas: ["Inativo"], 
      ultimoContato: "2023-06-20T11:00:00" 
    }
  ];

  const toggleSelectContact = (id: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(id)) {
        return prev.filter(contactId => contactId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === contatosMock.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contatosMock.map(contato => contato.id));
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Contatos</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Novo Contato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Contato</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo contato.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" placeholder="Nome completo" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="+55 (00) 00000-0000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="exemplo@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grupo">Grupo</Label>
                  <Input id="grupo" placeholder="Ex: Cliente, Prospect" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-whatsapp hover:bg-whatsapp/90">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2">
            <Upload size={16} />
            Importar
          </Button>
          
          <Button variant="outline" disabled={selectedContacts.length === 0} className="gap-2">
            <Download size={16} />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar contatos..."
              className="pl-10 border-gray-200 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filtrar
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 text-red-500 border-red-200 hover:bg-red-50"
              disabled={selectedContacts.length === 0}
            >
              <Trash2 size={16} />
              Excluir
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 text-blue-500 border-blue-200 hover:bg-blue-50"
              disabled={selectedContacts.length === 0}
            >
              <Tag size={16} />
              Etiquetar
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox 
                    checked={selectedContacts.length === contatosMock.length && contatosMock.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Etiquetas</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contatosMock.map((contato) => (
                <TableRow key={contato.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedContacts.includes(contato.id)}
                      onCheckedChange={() => toggleSelectContact(contato.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-whatsapp/10 text-whatsapp">
                          {contato.nome.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {contato.nome}
                    </div>
                  </TableCell>
                  <TableCell>{contato.telefone}</TableCell>
                  <TableCell>{contato.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {contato.grupo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contato.etiquetas.map((etiqueta) => (
                        <Badge 
                          key={etiqueta} 
                          className={
                            etiqueta === "VIP" 
                              ? "bg-amber-500" 
                              : etiqueta === "Inativo" 
                                ? "bg-gray-400" 
                                : etiqueta === "Novo" 
                                  ? "bg-whatsapp" 
                                  : "bg-blue-500"
                          }
                        >
                          {etiqueta}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(contato.ultimoContato).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus size={14} className="mr-2" />
                          Adicionar a Grupo
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag size={14} className="mr-2" />
                          Gerenciar Etiquetas
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 size={14} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {contatosMock.length} de {contatosMock.length} contatos
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatos;
