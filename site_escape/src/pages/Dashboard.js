import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import "../styles/Global.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircle from "@mui/icons-material/AddCircle";

const DashboardPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Pega o id do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/rooms/user/${user.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar rooms");
        }

        const data = await response.json();
        setRooms(data.rooms || []);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Você ainda não criou nenhuma Sala.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user.idUser]);

  const handleCreateRoom = () => {
    navigate("/create-room"); // Redireciona para a página de criar room
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="title-salas">Minhas Salas</h1>
        <div className="header-buttons">
          <button
            className="create-room-button"
            onClick={handleCreateRoom}
            aria-label="Criar sala"
          >
            <AddCircle />
          </button>
          <button
            className="logout-button"
            onClick={handleLogout}
            aria-label="Sair"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : rooms.length === 0 ? (
        <div className="no-rooms-message">
          <p>Você ainda não criou nenhuma Sala.</p>
          <button className="create-room-button" onClick={handleCreateRoom}>
            Criar Sala
          </button>
        </div>
      ) : (
        <div className="rooms-list">
          {rooms.map((room) => (
            <div key={room.idRoom} className="room-card">
              <h2>{room.name}</h2>
              <p>
                <strong>Código:</strong> {room.code}
              </p>
              <p>
                <strong>Data de criação:</strong>{" "}
                {new Date(room.dataCreation).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
