import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Objeto de autenticação do Firebase:", auth);
    console.log("App do Firebase:", auth.app);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (error) {
      setErro("Usuário não cadastrado ou senha incorreta.");
      console.error("Erro de login:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <button 
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}
    </div>
  );
}

export default Login;