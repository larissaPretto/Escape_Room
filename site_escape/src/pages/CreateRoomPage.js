import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRoomPage.css";

const CreateRoomPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scenarios/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setScenarios(response.data.scenarios || []);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Erro ao carregar cenários.");
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };

  const handleCreateRoom = () => {
    if (selectedScenario) {
      navigate("/create-room-details", {
        state: { scenarioId: selectedScenario.idScenario },
      });
    }
  };

  const handleCloseScenario = () => {
    setSelectedScenario(null);
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom className="title">
        Escolha um Cenário
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : errorMessage ? (
        <Typography color="error">{errorMessage}</Typography>
      ) : (
        <Box className="scenarios-container">
          <Grid2 container spacing={4}>
            {scenarios.map((scenario) => {
              const imageSrc = require(`../img/${scenario.img}.png`);
              return (
                <Grid2 item xs={12} sm={6} md={4} key={scenario.idScenario}>
                  <Card
                    onClick={() => handleSelectScenario(scenario)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={imageSrc}
                      alt={scenario.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {scenario.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      )}

      {selectedScenario && (
        <Box className="overlay">
          <Card className="selected-card">
            <Box className="card-header">
              <Typography variant="h5" gutterBottom className="card-title">
                {selectedScenario.name}
              </Typography>
              <IconButton
                onClick={handleCloseScenario}
                className="close-button"
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <img
              src={require(`../img/${selectedScenario.img}.png`)}
              alt={selectedScenario.name}
              className="card-image"
            />
            <Typography
              className="card-description"
              dangerouslySetInnerHTML={{ __html: selectedScenario.description }}
            ></Typography>
            <Button
              variant="contained"
              color="primary"
              className="create-room-button"
              onClick={handleCreateRoom}
            >
              Criar sala com este Cenário
            </Button>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default CreateRoomPage;
