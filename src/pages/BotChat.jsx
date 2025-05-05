import { useState, useEffect, useRef } from "react";
import NamePrompt from "./NamePrompt";
import LiveStatus from "../components/LiveStatus";
import { MoreVertical } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";

export default function BotChat({ onBack }) {
  // Estados principais do chat
  const [messages, setMessages] = useState([]); // Lista de mensagens no chat
  const [input, setInput] = useState(""); // Input da mensagem atual
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "Fã"); // Nickname salvo no localStorage
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Controla a exibição do picker de emojis
  const [showNotice, setShowNotice] = useState(true); // Controla a exibição do aviso inicial

  // Componente de menu de opções dentro do chat
  function OptionsMenu({ onBack, setNickname }) {
    const [open, setOpen] = useState(false); // Estado para abrir/fechar menu

    // Reseta nickname salvo e volta para prompt
    const handleReset = () => {
      localStorage.removeItem("nickname");
      setNickname(null);
      setOpen(false);
    };

    return (
      <div className="relative inline-block">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-white text-xl px-3 py-1 rounded hover:bg-white/10"
          title="Mais opções"
        >
          <MoreVertical className="w-5 h-5 text-white cursor-pointer hover:text-purple-400" />
        </button>
        {/* Menu dropdown */}
        {open && (
          <div className="absolute mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in">
            <button
              onClick={() => {
                onBack();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-t"
            >
              Voltar para o menu
            </button>
            <button
              onClick={handleReset}
              className="w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-gray-700 rounded-b"
            >
              Redefinir nickname
            </button>
          </div>
        )}
      </div>
    );
  }

  // Referência para rolar para o final do chat automaticamente
  const bottomRef = useRef(null);

  // Sempre que mensagens mudam, rola o chat para o fundo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Insere emoji no input da mensagem
  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  // Mensagem de boas-vindas quando o nickname é definido
  useEffect(() => {
    const welcomeMessage = {
      user: "FURIA Bot",
      text: `👋 Bem-vindo ao chat da FURIA, ${nickname}! Digite !ajuda para ver os comandos disponíveis.`,
    };
    setMessages([welcomeMessage]);
  }, [nickname]);

  // Função que trata envio de mensagem e resposta do bot
  const handleCommand = () => {
    const userMsg = input.trim();
    if (userMsg === "") return; // Ignora mensagens vazias

    // Adiciona mensagem do usuário
    const newMessages = [...messages, { user: "Você", text: userMsg }];

    // Dicionário de comandos disponíveis
    const comandos = {
      "!proximojogo": <LiveStatus />,
      "!forçafuria": "🔥 Vamos pra cima! Hoje é dia de FÚRIA!",
      "!stats": "📊 A FURIA venceu 3 dos últimos 4 jogos!",
      "!elenco": "👥 Elenco CS2: KSCERATO, yuurih, Yekindar, Molodoy, FalleN.",
      "!ranking": "📈 Ranking HLTV: #8 - FURIA Esports 🇧🇷 🕹️ Última subida: +1 posição",
      "!dica": "💡 Dica de CS: Sempre cheque os cantos com o crosshair na altura da cabeça. Não adianta mirar no chão se quiser o HS!",
      "!curiosidade": "🎯 Curiosidade: A FURIA foi o primeiro time brasileiro a entrar no top 5 do ranking HLTV sem contar com jogadores da era SK/LG.",
      "!azar": "😬 Azar do dia: O bot tentou defusar sem kit... RIP.",
      "!clip": "🎥 Clip do dia: 🔥 yuurih clutchando 1v4 contra NAVI! ▶️ https://clips.twitch.tv/yuurihClutchFURIA",
      "!loja": "🛒 Loja oficial: https://loja.furia.gg",
      "!noticias": `📰 Últimas notícias da FURIA:
    - "FURIA vence G2 e avança no torneio europeu"
    - "Guerri comenta mudanças no time"
    - "FURIA anuncia parceria com marca de periféricos"
    🔗 Leia mais em furia.gg`,
      "!parceiros": "🤝 Parceiros da FURIA: Redragon, PokerStars, AOC, Twitch 🌐 Conheça mais: furia.gg/parceiros",
      "!ajuda": "📘 Comandos disponíveis: !proximojogo !forçafuria !stats !elenco !ranking !dica !curiosidade !azar !clip !loja !noticias !parceiros !ajuda",
    };

    // Resposta do bot com base no comando
    const botResponse = comandos[userMsg.toLowerCase()] || "Olá! digite !ajuda para ver os comandos disponíveis.";

    // Adiciona resposta do bot
    newMessages.push({ user: "FURIA Bot", text: botResponse });
    setMessages(newMessages);
    setInput(""); // Limpa input
  }

  // Se o nickname ainda não foi definido, mostra tela de prompt
  if (!nickname) {
    return <NamePrompt onSave={setNickname} />;
  }

  // Componente principal do chat
  return (
    <div className="flex flex-col min-h-[100dvh] relative bg-gray-900 text-white bg-[url('/media/furia-iconn.png')] bg-center bg-no-repeat bg-[length:300px] items-center">

      {/* Aviso inicial (modal) */}
      {showNotice && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-yellow-400 text-black p-6 rounded-lg shadow-2xl max-w-xl mx-4 text-center relative">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-2 right-3 text-black text-xl font-bold transition-all duration-300 transform hover:scale-125 hover:text-red-600"
              title="Fechar aviso"
            >
              ×
            </button>
            <div className="flex justify-center items-center">
              <h2 className="text-xl font-bold">Bem-vindo ao Bot da FURIA</h2>
              <img className="w-9" src="/media/cs-icon.png" alt="" />
              <h2 className="font-bold">!</h2>
            </div>
            <p className="text-lg leading-relaxed">
              Aqui você interage com o assistente oficial da torcida FURIOSA. <br />
              Peça estatísticas, curiosidades, próximos jogos, dicas de CS e até links de clipes! 🔥<br />
              <strong>Digite <code className="bg-white text-black px-1 py-0.5 rounded">!ajuda</code> para ver todos os comandos disponíveis.</strong>
            </p>
          </div>
        </div>
      )}

      {/* Cabeçalho com título e menu */}
      <div className="flex bg-purple-900 w-[96%] shadow-md p-1 mt-3 relative justify-between rounded">
        <OptionsMenu onBack={onBack} setNickname={setNickname} />
        <div className="flex text-center">
          <h2 className="text-lg font-bold text-purple-300">#Bot da FURIA</h2>
        </div>
        <div className="w-6" /> {/* Espaço para equilibrar o layout */}
      </div>

      {/* Corpo do chat */}
      <div className="flex flex-col flex-1 lg:w-[50%] max-h-[93vh]">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
          {/* Renderiza as mensagens */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`pt-2 pb-2 pl-3 pr-3 rounded-2xl shadow-md ${msg.user === "FURIA Bot" ? "bg-gray-700 self-start" : "bg-blue-600 self-end"
                }  w-fit max-w-sm lg:max-w-xl`}
            >
              <span className="font-bold text-yellow-400">{msg.user}:</span>{" "}
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input e botões do chat */}
        <div className="flex p-4 bg-gray-800 gap-3 rounded-xl">
          {/* Botão de emoji */}
          <button
            onClick={() => setShowEmojiPicker((val) => !val)}
            className="text-2xl text-yellow-400 hover:text-yellow-300 transition"
          >
            <BsEmojiSmile />
          </button>

          {/* Picker de emojis */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left z-10">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  handleEmojiClick(emojiData);
                  setShowEmojiPicker(false); // Fecha ao selecionar emoji
                }}
                theme="dark"
              />
            </div>
          )}

          {/* Campo de input */}
          <input
            className="flex-1 p-2 rounded-xl text-black font-bold border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Mensagem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommand()}
          />

          {/* Botão enviar */}
          <button
            className="bg-yellow-500 text-black px-5 rounded-xl hover:bg-yellow-600 transition font-semibold"
            onClick={handleCommand}
          >
            Enviar
          </button>

        </div>
      </div>
    </div>
  );
}
