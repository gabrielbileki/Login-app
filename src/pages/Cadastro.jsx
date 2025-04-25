import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        sobrenome,
        dataNascimento,
        uid: user.uid
      });
      
      navigate("/principal");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
        <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;