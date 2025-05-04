import { useEffect, useState } from "react";
import { database } from "../firebase";
// Importa funções do Firebase para ler dados do Realtime Database
import { ref, onValue } from "firebase/database";

export default function LiveStatus() {
  // Cria um estado 'status' para armazenar os dados da partida. Começa como null.
  const [status, setStatus] = useState(null);

  // useEffect roda assim que o componente é montado na tela
  useEffect(() => {
    // Cria uma referência para a chave 'liveStatus' no seu Realtime Database
    const statusRef = ref(database, "liveStatus");

    // onValue fica ouvindo essa referência e atualiza sempre que mudar
    onValue(statusRef, (snapshot) => {
      // snapshot.val() pega os dados atuais da referência e atualiza o estado
      setStatus(snapshot.val());
    });
  }, []); // O array vazio [] faz com que isso rode só uma vez ao montar

  // Enquanto os dados não chegam do Firebase, mostra mensagem de carregando
  if (!status) return <div>🔄 Carregando status do jogo...</div>;

  // Quando os dados chegam, exibe o status da partida formatado (Os dados podem ser alterados diretamente no Firebase)
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white mb-4">
      <h2 className="text-xl font-bold mb-2">🎮 FURIA vs {status.oponente}</h2>
      <p>🗓 {status.data} às {status.hora}</p>
      <p>🗺 Mapa: {status.mapa}</p>
      <p>📍 Evento: {status.evento}</p>
      <p className="mt-2 text-lg font-semibold">
        📊 Placar: FURIA {status.placar.FURIA} x {status.placar.NAVI} {status.oponente}
      </p>
      <p className="mt-1 text-green-400">{status.status}</p>
    </div>
  );
}