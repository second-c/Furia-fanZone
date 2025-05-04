
import csIcon from './media/cs-icon.png';

// Componente principal para a tela inicial
export default function landing({ onSelect }) {
  return (
    <div className="flex flex-col text-white p-4 items-center justify-center h-screen">
      
      {/* Fundo animado com gradiente */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-700 to-purple-800 bg-[length:300%_300%] animate-moveBackground">
      </div>

      {/* Título de boas-vindas */}
      <h1 className="text-4xl font-bold mt-2 text-center z-10">Bem-vindo ao Chat da FURIA! </h1>

      {/* Logo da FURIA */}
      <img className="w-50 z-10" src="src\media\furia-iconn.png" alt="" />

      {/* Texto explicativo */}
      <p className="text-2xl mb-8 text-white text-center max-w-md z-10">
        Escolha como você quer se conectar com a comunidade FURIOSA!
      </p>

      {/* Botões para escolher a opção */}
      <div className="space-y-4 w-full max-w-sm text-black z-10">

        {/* Botão para entrar no chat global */}
        <button
          onClick={() => onSelect("global")}  // Quando clica, chama a função passando "global"
          className="w-full flex justify-center items-center bg-yellow-500 font-bold py-2 border-black border-2 rounded-lg hover:bg-yellow-600 hover:scale-105 transition duration-500 ease-in-out "
        >
          Chat Global da Comunidade 
          <img className="w-10" src=".\media\cs-icon.png" alt="" />
        </button>

        {/* Botão para entrar no chat bot */}
        <button
          onClick={() => onSelect("bot")}  // Quando clica, chama a função passando "bot"
          className="w-full flex justify-center items-center bg-purple-500 font-bold py-2 border-black border-2 rounded-lg hover:bg-purple-600 hover:scale-105 transition duration-500 ease-in-out"
        >
          Bot da FURIA 
          <img className="w-10" src="src\media\cs-icon.png" alt="" />
        </button>

      </div>
    </div>
  );
}
