import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getPolls = async () => {
    try {
        const response = await axios.get(`${API_URL}/polls/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching polls:", error);
        throw error;
    }
};

export const createPoll = async (question, options) => {
  await axios.post(`${API_URL}/polls/create/`, { question, options });
};

export const vote = async (pollId, optionId, user) => {
  await axios.post(`${API_URL}/polls/${pollId}/vote/`, { option_id: optionId, user });
};

export const getResults = async (pollId) => {
  const response = await axios.get(`${API_URL}/polls/${pollId}/results/`);
  return response.data;
};

export const deletePoll = async (pollId) => {
  await axios.delete(`${API_URL}/polls/${pollId}/delete/`);
};
