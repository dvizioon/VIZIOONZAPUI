
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Conexoes from "@/pages/Conexoes";
import Contatos from "@/pages/Contatos";
import Chatbots from "@/pages/Chatbots";
import Campanhas from "@/pages/Campanhas";
import Conversas from "@/pages/Conversas";
import Importacao from "@/pages/Importacao";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import Ajuda from "@/pages/Ajuda";
import Kanban from "@/pages/Kanban";
import Etiquetas from "@/pages/Etiquetas";
import AgenteAI from "@/pages/AgenteAI";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="conexoes" element={<Conexoes />} />
            <Route path="contatos" element={<Contatos />} />
            <Route path="conversas" element={<Conversas />} />
            <Route path="chatbots" element={<Chatbots />} />
            <Route path="agenteai" element={<AgenteAI />} />
            <Route path="importacao" element={<Importacao />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="campanhas" element={<Campanhas />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="ajuda" element={<Ajuda />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="etiquetas" element={<Etiquetas />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
