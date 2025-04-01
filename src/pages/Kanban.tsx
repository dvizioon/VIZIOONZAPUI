import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, MoreVertical, Tag, MessageSquare, Clock, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialColumns = {
  "new": {
    id: "new",
    title: "Novos",
    cards: [
      { 
        id: "card-1", 
        title: "Atendimento Cliente A",
        description: "Cliente com problema na entrega do produto",
        contact: "João Silva", 
        tags: ["urgente", "entrega"], 
        date: "2023-08-15" 
      },
      { 
        id: "card-2", 
        title: "Orçamento Empresa XYZ",
        description: "Preparar orçamento para serviços mensais",
        contact: "Maria Souza", 
        tags: ["orçamento"], 
        date: "2023-08-16" 
      },
    ]
  },
  "progress": {
    id: "progress",
    title: "Em Progresso",
    cards: [
      { 
        id: "card-3", 
        title: "Suporte Técnico",
        description: "Cliente precisa de ajuda com configuração",
        contact: "Carlos Pereira", 
        tags: ["suporte", "técnico"], 
        date: "2023-08-14" 
      },
    ]
  },
  "review": {
    id: "review",
    title: "Revisão",
    cards: [
      { 
        id: "card-4", 
        title: "Revisão de Contrato",
        description: "Verificar cláusulas do novo contrato",
        contact: "Ana Costa", 
        tags: ["contrato", "jurídico"], 
        date: "2023-08-12" 
      },
    ]
  },
  "done": {
    id: "done",
    title: "Concluído",
    cards: [
      { 
        id: "card-5", 
        title: "Instalação Finalizada",
        description: "Instalação do sistema concluída com sucesso",
        contact: "Pedro Santos", 
        tags: ["instalação", "concluído"], 
        date: "2023-08-10" 
      },
    ]
  }
};

const availableTags = [
  { id: "1", name: "urgente", color: "bg-red-500" },
  { id: "2", name: "entrega", color: "bg-blue-500" },
  { id: "3", name: "orçamento", color: "bg-green-500" },
  { id: "4", name: "suporte", color: "bg-purple-500" },
  { id: "5", name: "técnico", color: "bg-yellow-500" },
  { id: "6", name: "contrato", color: "bg-pink-500" },
  { id: "7", name: "jurídico", color: "bg-indigo-500" },
  { id: "8", name: "instalação", color: "bg-cyan-500" },
  { id: "9", name: "concluído", color: "bg-gray-500" },
];

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [tags, setTags] = useState(availableTags);
  const [newTag, setNewTag] = useState({ name: "", color: "bg-gray-500" });

  const getTagColor = (tagName: string) => {
    const tag = tags.find(t => t.name === tagName);
    return tag ? tag.color : "bg-gray-500";
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceColumn.cards);
      const [movedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, movedCard);

      const newColumn = {
        ...sourceColumn,
        cards: newCards,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const sourceCards = Array.from(sourceColumn.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);
    const destCards = Array.from(destColumn.cards);
    destCards.splice(destination.index, 0, movedCard);

    const newSourceColumn = {
      ...sourceColumn,
      cards: sourceCards,
    };

    const newDestColumn = {
      ...destColumn,
      cards: destCards,
    };

    setColumns({
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestColumn.id]: newDestColumn,
    });
  };

  const handleAddCard = (columnId: string) => {
    setSelectedColumn(columnId);
    setShowAddCard(true);
  };

  const createNewCard = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const contact = formData.get("contact") as string;
    const tagInput = formData.get("tags") as string;
    const cardTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

    if (!title || !contact) return;

    const newCard = {
      id: `card-${Date.now()}`,
      title,
      description,
      contact,
      tags: cardTags,
      date: new Date().toISOString().split('T')[0]
    };

    const column = columns[selectedColumn];
    const updatedColumn = {
      ...column,
      cards: [...column.cards, newCard]
    };

    setColumns({
      ...columns,
      [selectedColumn]: updatedColumn
    });

    setShowAddCard(false);
  };

  const addNewTag = () => {
    if (newTag.name.trim() === "") return;
    
    const tagExists = tags.some(tag => tag.name === newTag.name.trim());
    if (tagExists) return;

    const newTagObj = {
      id: `${tags.length + 1}`,
      name: newTag.name.trim(),
      color: newTag.color
    };

    setTags([...tags, newTagObj]);
    setNewTag({ name: "", color: "bg-gray-500" });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Kanban de Atendimento</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowTagDialog(true)}
            className="flex items-center gap-2"
          >
            <Tag size={16} />
            Gerenciar Etiquetas
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="font-semibold text-gray-700">{column.title}</h2>
                <Badge variant="outline">{column.cards.length}</Badge>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-50 rounded-lg p-2 flex-1 min-h-[400px] overflow-hidden flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto space-y-2">
                      {column.cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 shadow-sm cursor-grab active:cursor-grabbing"
                            >
                              <CardHeader className="p-3 pb-0">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <p className="text-xs text-gray-500 mb-2">{card.description}</p>
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-[10px]">
                                      {card.contact.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{card.contact}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {card.tags.map((tag, i) => (
                                    <Badge 
                                      key={i} 
                                      className={`${getTagColor(tag)} text-white text-[10px] px-1.5 py-0`}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                  <div className="flex items-center text-xs text-gray-400">
                                    <Clock size={12} className="mr-1" />
                                    {card.date}
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreVertical size={12} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Editar</DropdownMenuItem>
                                      <DropdownMenuItem>Iniciar Chat</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-500">
                                        Remover
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                    <Button 
                      variant="ghost" 
                      className="w-full mt-2 text-gray-500 justify-start"
                      onClick={() => handleAddCard(column.id)}
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar Cartão
                    </Button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cartão</DialogTitle>
            <DialogDescription>
              Preencha as informações para adicionar um novo cartão ao quadro.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            createNewCard(new FormData(e.currentTarget));
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" placeholder="Digite o título do cartão" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Digite a descrição do cartão"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contato</Label>
                <Input id="contact" name="contact" placeholder="Nome do contato" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Etiquetas</Label>
                <Input 
                  id="tags" 
                  name="tags" 
                  placeholder="Separe as etiquetas por vírgula"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      className={`${tag.color} text-white text-xs cursor-pointer`}
                      onClick={() => {
                        const input = document.getElementById('tags') as HTMLInputElement;
                        const currentValue = input.value;
                        input.value = currentValue ? `${currentValue}, ${tag.name}` : tag.name;
                      }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCard(false)} type="button">
                Cancelar
              </Button>
              <Button className="bg-whatsapp hover:bg-whatsapp/90" type="submit">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gerenciar Etiquetas</DialogTitle>
            <DialogDescription>
              Adicione ou edite etiquetas para utilizar no quadro kanban.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nome da etiqueta"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              />
              <select
                className="rounded-md border border-input bg-background px-3 py-2"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
              >
                <option value="bg-red-500">Vermelho</option>
                <option value="bg-blue-500">Azul</option>
                <option value="bg-green-500">Verde</option>
                <option value="bg-yellow-500">Amarelo</option>
                <option value="bg-purple-500">Roxo</option>
                <option value="bg-pink-500">Rosa</option>
                <option value="bg-indigo-500">Índigo</option>
                <option value="bg-cyan-500">Ciano</option>
                <option value="bg-gray-500">Cinza</option>
              </select>
              <Button
                className="bg-whatsapp hover:bg-whatsapp/90"
                onClick={addNewTag}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${tag.color}`}></div>
                    <span>{tag.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 h-8 w-8"
                    onClick={() => setTags(tags.filter(t => t.id !== tag.id))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-whatsapp hover:bg-whatsapp/90" onClick={() => setShowTagDialog(false)}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Kanban;
