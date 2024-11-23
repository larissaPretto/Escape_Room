import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAllRooms = () => {
  return api.get("/rooms");
};

export const getRoomByCode = (code) => {
  return api.get(`/rooms/code/${code}`);
};

export const createRoom = (roomData) => {
  return api.post("/rooms", roomData);
};

export default api;
