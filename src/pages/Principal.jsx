import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h1>Página Principal</h1>
      {userData && (
        <div>
          <p>Nome: {userData.nome}</p>
          <p>Sobrenome: {userData.sobrenome}</p>
          <p>Data de Nascimento: {userData.dataNascimento}</p>
        </div>
      )}
    </div>
  );
}

export default Principal;