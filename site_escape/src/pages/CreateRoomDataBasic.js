import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Adicione useLocation
import "../styles/CreateRoomDataBasic.css";

const findOrCreateSubject = async (subjectName, subjects, setSubjects) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/subjects/find_create/${subjectName}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // Verifica se a disciplina já existe antes de adicionar
    if (!subjects.some((sub) => sub.idSubject === response.data.idSubject)) {
      setSubjects([...subjects, response.data]);
    }
  } catch (error) {
    console.error("Erro ao adicionar disciplina:", error);
  }
};

const findOrCreateContent = async (contentName, contents, setContents) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/contents/find_create/${contentName}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // Verifica se o conteúdo já existe antes de adicionar
    if (!contents.some((cont) => cont.idContent === response.data.idContent)) {
      setContents([...contents, response.data]);
    }
  } catch (error) {
    console.error("Erro ao adicionar conteúdo:", error);
  }
};

const CreateRoomDataBasic = () => {
  const location = useLocation(); // Use o hook para acessar a localização
  const { scenarioId } = location.state || {}; // Obtém o scenarioId do state

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [endgame, setEndgame] = useState("");
  const [victory, setVictory] = useState("");

  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(!showInstructions);

  const navigate = useNavigate(); // Hook para navegação

  const handleAddSubject = async () => {
    if (newSubject) {
      await findOrCreateSubject(newSubject, subjects, setSubjects);
      setNewSubject(""); // Limpa o input
    }
  };

  const handleAddContent = async () => {
    if (newContent) {
      await findOrCreateContent(newContent, contents, setContents);
      setNewContent(""); // Limpa o input
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((sub) => sub.idSubject !== subjectId)
    );
  };

  const handleRemoveContent = (contentId) => {
    setContents((prevContents) =>
      prevContents.filter((cont) => cont.idContent !== contentId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.idUser : null;

    // Verifica se o userId existe
    if (!userId) {
      console.error("User ID não encontrado.");
      return;
    }

    // Formata o tempo para incluir segundos
    const formattedTime = `${time}:00`; // Ex: "10:00:00"

    const roomData = {
      name,
      description,
      time: formattedTime, // Altera para o formato correto
      userId, // Inclui o userId
      scenarioId, // Inclui o scenarioId
      subjectIds: subjects.map((sub) => sub.idSubject),
      contentIds: contents.map((cont) => cont.idContent),
      endgame,
      victory,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar Sala");
      }

      const createdRoom = await response.json();
      const roomId = createdRoom.idRoom;

      navigate(`/edit-room-puzzles/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Criar Nova Sala</h2>
      <input type="hidden" value={scenarioId} />{" "}
      <button className="help-button" onClick={toggleInstructions}>
        ?
      </button>
      {showInstructions && (
        <div className="instructions-popup">
          <div className="popup-content">
            <button className="close-button" onClick={toggleInstructions}>
              X
            </button>
            <h3>Instruções dos Campos</h3>
            <p>
              <strong>Nome:</strong> Nome da sala que será exibido para os
              jogadores.
            </p>
            <p>
              <strong>Tempo:</strong> Defina o limite de tempo da sala em horas
              e minutos.
            </p>
            <p>
              <strong>Disciplinas:</strong> Disciplinas relacionadas que podem
              ser associadas à sala. Ex: Matemática, Biologia, etc.
            </p>
            <p>
              <strong>Conteúdos:</strong> Conteúdos que os jogadores irão
              explorar na sala. Ex: Equações de 2º grau, Cadeia Alimentar, etc.
            </p>
            <p>
              <strong>Narrativa:</strong> Descrição da história da sala e os
              desfechos de vitória e derrota.
            </p>
          </div>
        </div>
      )}
      {/* Campo oculto se necessário */}
      <label>Nome:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da sala"
        required
      />
      <label>Tempo: (HH:MM)</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <label>Disciplinas:</label>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Opcional"
        />
        <button
          type="button"
          className="add-subject-button"
          onClick={handleAddSubject}
        >
          +
        </button>
      </div>
      <div className="subject-list">
        {subjects.map((subject) => (
          <div className="subject-item" key={subject.idSubject}>
            <span>{subject.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveSubject(subject.idSubject)}
              className="remove-subject-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <label>Conteúdos:</label>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Opcional"
        />
        <button
          type="button"
          className="add-content-button"
          onClick={handleAddContent}
        >
          +
        </button>
      </div>
      <h3 className="title-narrativa">Narrativa:</h3>
      <label>Introdução a sala:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descreva a história da sala"
        required
      />
      <label>Narrativa em caso de derrota:</label>
      <textarea
        value={endgame}
        onChange={(e) => setEndgame(e.target.value)}
        placeholder="Descreva o que acontece em caso de derrota"
        required
      />
      <label>Narrativa em caso de vitória:</label>
      <textarea
        value={victory}
        onChange={(e) => setVictory(e.target.value)}
        placeholder="Descreva o que acontece em caso de vitória"
        required
      />
      <div className="content-list">
        {contents.map((content) => (
          <div className="content-item" key={content.idContent}>
            <span>{content.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveContent(content.idContent)}
              className="remove-content-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button type="submit" className="btn-criar">
        Criar Sala
      </button>
    </form>
  );
};

export default CreateRoomDataBasic;
