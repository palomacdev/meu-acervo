import axios from 'axios';

// URL base da API - ajuste conforme necessário
const API_URL = 'https://super-duper-space-acorn-gv5jw6vq9p6cp45x-8000.app.github.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para interagir com a API
export const midiaAPI = {
  // Listar todas as mídias
  listar: async () => {
    const response = await api.get('/midias');
    return response.data;
  },

  // Buscar mídia por ID
  buscarPorId: async (id) => {
    const response = await api.get(`/midias/${id}`);
    return response.data;
  },

  // Criar nova mídia
  criar: async (midia) => {
    const response = await api.post('/midias', midia);
    return response.data;
  },

  // Atualizar mídia
  atualizar: async (id, midia) => {
    const response = await api.put(`/midias/${id}`, midia);
    return response.data;
  },

  // Deletar mídia
  deletar: async (id) => {
    await api.delete(`/midias/${id}`);
  },

  // Buscar por tipo
  buscarPorTipo: async (tipo) => {
    const response = await api.get(`/midias/tipo/${tipo}`);
    return response.data;
  },

  // Buscar por status
  buscarPorStatus: async (status) => {
    const response = await api.get(`/midias/status/${status}`);
    return response.data;
  },
};

export default api;

