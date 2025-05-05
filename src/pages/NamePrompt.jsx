import { useState } from "react";

// Componente para pedir o nickname do usuário antes de entrar no chat
export default function NamePrompt({ onSave }) {
  // Estado para guardar o nome digitado pelo usuário
  const [name, setName] = useState("");

  // Função chamada quando o usuário clica no botão "Entrar no chat"
  const handleSave = () => {
    // Verifica se o nome não está vazio
    if (name.trim() !== "") {
      localStorage.setItem("nickname", name); // Salva o nickname no localStorage para lembrar depois
      onSave(name); // Chama a função recebida por props, passando o nome escolhido
    }
  };

  return (
    <div className="flex flex-col text-center items-center justify-center h-screen bg-black text-white p-4">
      
      {/* Fundo com gradiente animado */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-700 to-purple-800 
                      bg-[length:400%_400%] animate-moveBackground">
      </div>

      {/* Título da tela */}
      <h2 className="text-3xl font-bold z-10">Qual seu nome na torcida?</h2>

      {/* Logo da FURIA */}
      <img className="w-50 z-10" src="/media/furia-iconn.png" alt="" />

      {/* Campo de input para digitar o nickname */}
      <input
        className="p-2 rounded-lg text-white font-bold w-full max-w-md border-1 z-10"
        placeholder="Digite seu nickname"
        value={name}  // Valor controlado pelo estado "name"
        onChange={(e) => setName(e.target.value)}  // Atualiza o estado quando o usuário digita
      />

      {/* Botão para salvar o nome e entrar no chat */}
      <button
        className="mt-4 bg-yellow-500 text-black px-6 py-2 border-2 font-bold rounded-lg hover:bg-yellow-600 hover:scale-101 transition duration-500 ease-in-out z-10"
        onClick={handleSave}
      >
        Entrar no chat
      </button>
    </div>
  );
}

