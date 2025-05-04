import { useState } from "react";
import Landing from "./pages/Landing";
import NamePrompt from "./pages/NamePrompt";
import GlobalChat from "./pages/GlobalChat";
import BotChat from "./pages/BotChat";

// Componente principal do app
export default function App() {
  // Estado que guarda qual tipo de chat foi selecionado pelo usuário ("global" ou "bot")
  const [chatType, setChatType] = useState(null);

  // Estado que guarda o nickname (pega do localStorage se já existir)
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  // Função para voltar para o menu inicial
  const handleBackToMenu = () => {
    setChatType(null);
  };

  // Se o usuário ainda não escolheu um chat, mostra a tela inicial (Landing)
  if (!chatType) {
    return <Landing onSelect={setChatType} />;
  }

  // Se o usuário ainda não escolheu um nickname, mostra a tela para digitar o nome
  if (!nickname) {
    return <NamePrompt onSave={setNickname} />;
  }

  // Props comuns para enviar para os dois chats (Global ou Bot)
  const commonProps = { onBack: handleBackToMenu };

  // Renderiza o chat que foi selecionado (global ou bot)
  return chatType === "global" ? (
    <GlobalChat {...commonProps} />
  ) : (
    <BotChat {...commonProps} />
  );
}
