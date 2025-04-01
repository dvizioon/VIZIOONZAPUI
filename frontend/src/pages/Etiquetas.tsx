
import { useState } from "react";
import { Tag, Plus, Search, Trash2, Edit, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";

// Mock data for tags/labels
const initialTags = [
  { id: "1", name: "Urgente", color: "bg-red-500", count: 42 },
  { id: "2", name: "Entrega", color: "bg-blue-500", count: 28 },
  { id: "3", name: "Orçamento", color: "bg-green-500", count: 35 },
  { id: "4", name: "Suporte", color: "bg-purple-500", count: 19 },
  { id: "5", name: "Técnico", color: "bg-yellow-500", count: 23 },
  { id: "6", name: "Contrato", color: "bg-pink-500", count: 15 },
  { id: "7", name: "Jurídico", color: "bg-indigo-500", count: 9 },
  { id: "8", name: "Instalação", color: "bg-cyan-500", count: 31 },
  { id: "9", name: "Concluído", color: "bg-gray-500", count: 57 },
  { id: "10", name: "Pendente", color: "bg-amber-500", count: 44 },
  { id: "11", name: "Cancelado", color: "bg-red-800", count: 12 },
  { id: "12", name: "Agendado", color: "bg-teal-500", count: 26 },
];

const colorOptions = [
  { name: "Vermelho", value: "bg-red-500" },
  { name: "Vermelho Escuro", value: "bg-red-800" },
  { name: "Azul", value: "bg-blue-500" },
  { name: "Azul Escuro", value: "bg-blue-800" },
  { name: "Verde", value: "bg-green-500" },
  { name: "Verde Escuro", value: "bg-green-800" },
  { name: "Amarelo", value: "bg-yellow-500" },
  { name: "Âmbar", value: "bg-amber-500" },
  { name: "Roxo", value: "bg-purple-500" },
  { name: "Rosa", value: "bg-pink-500" },
  { name: "Índigo", value: "bg-indigo-500" },
  { name: "Ciano", value: "bg-cyan-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Cinza", value: "bg-gray-500" },
  { name: "Cinza Escuro", value: "bg-gray-800" },
];

const Etiquetas = () => {
  const [tags, setTags] = useState(initialTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTag, setEditingTag] = useState<typeof initialTags[0] | null>(null);
  const [newTag, setNewTag] = useState({ name: "", color: "bg-gray-500" });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTag = () => {
    if (newTag.name.trim() === "") return;
    
    const tagExists = tags.some(tag => tag.name.toLowerCase() === newTag.name.toLowerCase().trim());
    if (tagExists) return;

    const newTagObj = {
      id: `${Date.now()}`,
      name: newTag.name.trim(),
      color: newTag.color,
      count: 0
    };

    setTags([...tags, newTagObj]);
    setNewTag({ name: "", color: "bg-gray-500" });
    setShowAddDialog(false);
  };

  const updateTag = () => {
    if (!editingTag || editingTag.name.trim() === "") return;
    
    const tagExists = tags.some(tag => 
      tag.id !== editingTag.id && 
      tag.name.toLowerCase() === editingTag.name.toLowerCase().trim()
    );
    
    if (tagExists) return;

    const updatedTags = tags.map(tag => 
      tag.id === editingTag.id 
        ? { ...tag, name: editingTag.name.trim(), color: editingTag.color }
        : tag
    );

    setTags(updatedTags);
    setEditingTag(null);
  };

  const deleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Etiquetas</h1>
        
        <div className="flex gap-2">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Buscar etiquetas..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-whatsapp hover:bg-whatsapp/90">
                <Plus size={16} className="mr-2" />
                Nova Etiqueta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Etiqueta</DialogTitle>
                <DialogDescription>
                  Crie uma nova etiqueta para categorizar suas conversas e contatos.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tagName">Nome da Etiqueta</Label>
                  <Input 
                    id="tagName" 
                    value={newTag.name}
                    onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                    placeholder="Ex: Urgente, Cliente VIP, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tagColor">Cor</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={`
                          h-8 rounded-md cursor-pointer flex items-center justify-center
                          ${color.value} text-white
                          ${newTag.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                        `}
                        onClick={() => setNewTag({ ...newTag, color: color.value })}
                        title={color.name}
                      >
                        {newTag.color === color.value && <Check size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
                  <Badge className={`${newTag.color} text-white`}>
                    {newTag.name || "Nome da Etiqueta"}
                  </Badge>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancelar
                </Button>
                <Button className="bg-whatsapp hover:bg-whatsapp/90" onClick={addTag}>
                  Salvar Etiqueta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="overflow-hidden">
            {editingTag && editingTag.id === tag.id ? (
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor={`edit-name-${tag.id}`}>Nome</Label>
                  <Input
                    id={`edit-name-${tag.id}`}
                    value={editingTag.name}
                    onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor={`edit-color-${tag.id}`}>Cor</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={`
                          h-8 rounded-md cursor-pointer flex items-center justify-center
                          ${color.value} text-white
                          ${editingTag.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                        `}
                        onClick={() => setEditingTag({ ...editingTag, color: color.value })}
                        title={color.name}
                      >
                        {editingTag.color === color.value && <Check size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingTag(null)}
                    className="text-gray-500"
                  >
                    <X size={14} className="mr-1" />
                    Cancelar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={updateTag}
                    className="bg-whatsapp hover:bg-whatsapp/90"
                  >
                    <Check size={14} className="mr-1" />
                    Salvar
                  </Button>
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${tag.color}`}></div>
                      <CardTitle className="text-base">{tag.name}</CardTitle>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500"
                        onClick={() => setEditingTag(tag)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500"
                        onClick={() => deleteTag(tag.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex justify-between items-center">
                    <Badge className={`${tag.color} text-white`}>
                      {tag.name}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Tag size={14} className="mr-1" />
                      {tag.count} usos
                    </span>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
        
        {filteredTags.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <Tag size={32} className="text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Nenhuma etiqueta encontrada</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `Não encontramos etiquetas correspondentes a "${searchQuery}"`
                : "Comece criando sua primeira etiqueta"}
            </p>
            <Button 
              className="mt-4 bg-whatsapp hover:bg-whatsapp/90"
              onClick={() => {
                setSearchQuery("");
                setShowAddDialog(true);
              }}
            >
              <Plus size={16} className="mr-2" />
              Nova Etiqueta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Etiquetas;
