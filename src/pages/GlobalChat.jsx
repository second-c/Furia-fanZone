import { useState, useEffect, useRef } from "react";
import { database } from "../firebase"; // Importa a instância do Firebase Realtime Database
import { ref, push, onValue } from "firebase/database"; // Métodos do Firebase para manipulação em tempo real
import NamePrompt from "./NamePrompt"; // Componente que pergunta o nome do usuário se não estiver salvo
import EmojiPicker from 'emoji-picker-react'; // Biblioteca para seleção de emojis
import { BsEmojiSmile } from "react-icons/bs"; // Ícone do emoji
import { MoreVertical } from "lucide-react"; // Ícone do menu de opções

export default function GlobalChat({ onBack }) {
  // Estados principais
  const [messages, setMessages] = useState([]); // Lista de mensagens do chat
  const [input, setInput] = useState(""); // Conteúdo digitado pelo usuário
  const [nickname, setNickname] = useState(localStorage.getItem("nickname")); // Nickname salvo no localStorage
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Estado para mostrar/ocultar o seletor de emoji
  const [showNotice, setShowNotice] = useState(true); // Estado para mostrar/ocultar aviso inicial

  // Menu com opções (Voltar e Resetar nickname)
  function OptionsMenu({ onBack, setNickname }) {
    const [open, setOpen] = useState(false);

    const handleReset = () => {
      localStorage.removeItem("nickname"); // Remove o nickname salvo
      setNickname(null); // Força a reexibir o prompt de nome
      setOpen(false);
    };

    return (
      <div className="relative inline-block">
        <button
          onClick={() => setOpen((prev) => !prev)} // Abre/fecha menu
          className="text-white text-xl px-3 py-1 rounded hover:bg-white/10"
          title="Mais opções"
        >
          <MoreVertical className="w-5 h-5 text-white cursor-pointer hover:text-purple-400" />
        </button>
        {open && (
          <div className="absolute mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in">
            <button
              onClick={() => {
                onBack(); // Volta para tela anterior
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

  // Efeito que escuta as mensagens do Firebase em tempo real
  useEffect(() => {
    const messagesRef = ref(database, "messages"); // Referência à coleção 'messages'
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val(); // Obtém todas as mensagens
      const msgList = data ? Object.values(data) : []; // Transforma objeto em array
      setMessages(msgList.sort((a, b) => a.timestamp - b.timestamp)); // Ordena por data
    });
  }, []);

  // Envia uma nova mensagem para o Firebase
  const sendMessage = () => {
    if (input.trim() === "") return; // Evita enviar vazio

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      user: nickname,
      text: input,
      timestamp: Date.now(), // Marca com timestamp atual
    });
    setInput(""); // Limpa campo de entrada
  }

  // Insere emoji no input
  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  // Referência para sempre rolar para a última mensagem
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Se o usuário ainda não escolheu nickname, pede nome
  if (!nickname) {
    return <NamePrompt onSave={setNickname} />;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] relative bg-gray-900 text-white bg-[url('/media/furia-iconn.png')] bg-center bg-no-repeat bg-[length:300px] items-center">
      
      {/* Aviso inicial */}
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
              <h2 className="text-xl font-bold">Bem-vindo ao Chat FURIA</h2>
              <img className="w-9" src="/media/cs-icon.png" alt="" />
              <h2 className="font-bold">!</h2>
            </div>
            <p className="text-lg">
              Este é o espaço oficial da comunidade apaixonada por CS e pela FURIA Esports. <br />
              Compartilhe clipes, reaja às partidas e conecte-se com outros fãs. <br />
              <strong>Respeito é essencial</strong> — jogamos duro, mas com fair play!
            </p>
          </div>
        </div>
      )}

      {/* Barra do topo */}
      <div className="flex bg-purple-900 w-[96%] shadow-md p-1 mt-3 relative justify-between rounded">
        <OptionsMenu onBack={onBack} setNickname={setNickname} />
        <div className="flex text-center">
          <h2 className="text-lg font-bold text-purple-300">#Chat Geral da FURIA</h2>
        </div>
        <div className="w-6" /> {/* Espaço para alinhar com botão lateral */}
      </div>

      {/* Área de mensagens */}
      <div className="flex flex-col flex-1 lg:w-[50%] max-h-[93vh] ">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg, idx) => {
            const date = new Date(msg.timestamp);
            const hour = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const isMe = msg.user === nickname; // Verifica se a msg é do próprio usuário

            return (
              <div
                key={idx}
                className={`pt-2 pb-2 pl-3 pr-3 rounded-2xl shadow-md ${isMe ? "bg-blue-600 self-end" : "bg-gray-700 self-start"} w-fit max-w-sm lg:max-w-xl`}
              >
                <div>
                  <span className="text-yellow-400 font-semibold">{msg.user || "Anônimo"}:</span>{" "}
                  <span>{msg.text}</span>
                  <div className="text-[10px] text-gray-400 text-end mt-2">{hour}</div>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Área de envio */}
        <div className="flex fixed pt-3 pb-3 pl-4 pr-4 bg-gray-800 gap-3 rounded-xl">
          {/* Botão de emoji */}
          <button
            onClick={() => setShowEmojiPicker((val) => !val)}
            className="text-2xl text-yellow-400 hover:text-yellow-300 transition"
          >
            <BsEmojiSmile />
          </button>

          {/* Picker de emoji */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left z-10">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  handleEmojiClick(emojiData);
                  setShowEmojiPicker(false); // Fecha picker
                }}
                theme="dark"
              />
            </div>
          )}

          {/* Input da mensagem */}
          <input
            className="flex-1 p-2 rounded-xl text-black font-bold border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Envia com Enter
            placeholder="Digite sua mensagem"
          />

          {/* Botão de enviar */}
          <button
            className="bg-yellow-500 text-black px-5 rounded-xl hover:bg-yellow-600 transition font-semibold"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
