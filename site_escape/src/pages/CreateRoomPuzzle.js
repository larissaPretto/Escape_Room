import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CreateRoomPuzzle.css";
import images from "../imageImports";

const CreateRoomPuzzle = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(!showInstructions);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/rooms/${roomId}`
        );
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleAnswerChange = (puzzleId, answer) => {
    setRoomData((prevData) => ({
      ...prevData,
      puzzles: prevData.puzzles.map((puzzle) =>
        puzzle.idRoomPuzzle === puzzleId ? { ...puzzle, answer } : puzzle
      ),
    }));

    if (answer) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`puzzle-${puzzleId}`]: null, // Remove o erro desse puzzle
      }));
    }
  };

  const handleValueChange = (artifactId, value) => {
    setRoomData((prevData) => ({
      ...prevData,
      puzzles: prevData.puzzles.map((puzzle) => ({
        ...puzzle,
        artifacts: puzzle.artifacts.map((artifact) =>
          artifact.idRoomArtifact === artifactId
            ? { ...artifact, value }
            : artifact
        ),
      })),
    }));

    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`artifact-${artifactId}`]: null, // Remove o erro desse artifact
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    roomData.puzzles.forEach((puzzle) => {
      if (!puzzle.answer) {
        newErrors[`puzzle-${puzzle.idRoomPuzzle}`] =
          "A resposta do enigma é obrigatória.";
        isValid = false;
      }

      puzzle.artifacts.forEach((artifact) => {
        if (!artifact.value) {
          newErrors[`artifact-${artifact.idRoomArtifact}`] =
            "O valor do item é obrigatório.";
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid; // Retorna true se não houver erros
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/rooms/puzzles`, {
          puzzles: roomData.puzzles,
        });
        alert("Sala criada com sucesso! Veja o código de acesso no dashboard.");

        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating puzzles:", error);
        alert("Falha ao atualizar os puzzles.");
      }
    }
  };

  if (!roomData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="room-details">
      <h1 className="title-enigma">Enigmas e Itens</h1>
      <button className="help-button-puzzle" onClick={toggleInstructions}>
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
              <strong>Resposta do enigma:</strong> Resposta que os jogadores vao
              ter que responder para resolver o enigma.
            </p>
            <p>
              <strong>Itens do enigma:</strong> São os objetos em que os
              jogadores vão interagir e esta a questao que vai dar a resposta do
              enigma.
            </p>
          </div>
        </div>
      )}

      {roomData.puzzles.map((roomPuzzle) => (
        <div key={roomPuzzle.idRoomPuzzle} className="puzzle-container">
          <h2>{roomPuzzle.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: roomPuzzle.description }} />

          <div className="input-container">
            <input
              type="text"
              value={roomPuzzle.answer || ""}
              onChange={(e) =>
                handleAnswerChange(roomPuzzle.idRoomPuzzle, e.target.value)
              }
              placeholder="Digite a resposta do enigma"
              required
              className={
                formSubmitted && errors[`puzzle-${roomPuzzle.idRoomPuzzle}`]
                  ? "input-error"
                  : ""
              }
            />
            {formSubmitted && errors[`puzzle-${roomPuzzle.idRoomPuzzle}`] && (
              <p className="error-message-pz">
                {errors[`puzzle-${roomPuzzle.idRoomPuzzle}`]}
              </p>
            )}
            <img
              src={images[roomPuzzle.img.split(".")[0]]}
              alt={roomPuzzle.name}
              className="puzzle-image"
            />
          </div>

          <h3>Itens do Enigma</h3>
          {roomPuzzle.artifacts.map((roomArtifact) => (
            <div
              key={roomArtifact.idRoomArtifact}
              className="artifact-container"
            >
              <label>{roomArtifact.name}:</label>
              <div className="input-container">
                <textarea
                  value={roomArtifact.value || ""}
                  onChange={(e) =>
                    handleValueChange(
                      roomArtifact.idRoomArtifact,
                      e.target.value
                    )
                  }
                  placeholder="Digite a questão do item"
                  required
                  rows={4}
                  className={
                    formSubmitted &&
                    errors[`artifact-${roomArtifact.idRoomArtifact}`]
                      ? "input-error"
                      : ""
                  }
                />
                {formSubmitted &&
                  errors[`artifact-${roomArtifact.idRoomArtifact}`] && (
                    <p className="error-message-pz">
                      {errors[`artifact-${roomArtifact.idRoomArtifact}`]}
                    </p>
                  )}
                <img
                  src={images[roomArtifact.img.split(".")[0]]}
                  alt={roomArtifact.name}
                  className="artifact-image"
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} className="submit-button">
        Salvar
      </button>
    </div>
  );
};

export default CreateRoomPuzzle;
