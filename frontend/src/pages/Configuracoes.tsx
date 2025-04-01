
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Configuracoes = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Configurações</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle>Geral</CardTitle>
            <CardDescription>Configurações básicas da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input type="text" id="nome" defaultValue="Admin" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" defaultValue="admin@vizioonconnect.com" />
            </div>
            <div>
              <Label>Notificações por Email</Label>
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked />
                <Label htmlFor="email-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ativar notificações
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferências de Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Interface</CardTitle>
            <CardDescription>Personalize a aparência do seu painel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tema">Tema</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sistema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">Sistema</SelectItem>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tamanho-fonte">Tamanho da Fonte</Label>
              <Slider defaultValue={[16]} max={24} min={12} step={1} />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie as configurações de segurança da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="senha">Alterar Senha</Label>
              <Input type="password" id="senha" placeholder="Nova senha" />
            </div>
            <div>
              <Label>Autenticação de Dois Fatores</Label>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor-auth" />
                <Label htmlFor="two-factor-auth" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ativar 2FA
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Chatbot */}
        <Card>
          <CardHeader>
            <CardTitle>Chatbot</CardTitle>
            <CardDescription>Configure as respostas e o comportamento do seu chatbot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="saudacao">Mensagem de Saudação</Label>
              <Textarea id="saudacao" placeholder="Olá! Como posso ajudar?" />
            </div>
            <div>
              <Label htmlFor="tempo-resposta">Tempo de Resposta (segundos)</Label>
              <Input type="number" id="tempo-resposta" defaultValue="5" />
            </div>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Conecte suas ferramentas favoritas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Google Analytics</Label>
              <Badge variant="secondary">Desconectado</Badge>
            </div>
            <div>
              <Label>Salesforce</Label>
              <Badge variant="secondary">Desconectado</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Preferências de Notificação */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Escolha como você quer ser notificado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Notificações Push</Label>
              <div className="flex items-center space-x-2">
                <Switch id="push-notifications" defaultChecked />
                <Label htmlFor="push-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ativar notificações push
                </Label>
              </div>
            </div>
            <div>
              <Label>Sons de Notificação</Label>
              <div className="flex items-center space-x-2">
                <Switch id="notification-sounds" defaultChecked />
                <Label htmlFor="notification-sounds" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ativar sons
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="default">Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default Configuracoes;
