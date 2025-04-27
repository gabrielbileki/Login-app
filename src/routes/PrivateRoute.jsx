import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig"; // Certifique-se de que o caminho para o firebase está correto.

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogado(!!user); // Verifica se o usuário está logado
      setLoading(false);
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem enquanto verifica o estado de autenticação
  }

  // Se o usuário estiver logado, retorna o conteúdo da rota, caso contrário, redireciona para a página de login
  return usuarioLogado ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
