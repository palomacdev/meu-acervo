// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import MediaForm from './components/MediaForm';
import MediaList from './components/MediaList';
import './App.css';

const API_URL = "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-8000.app.github.dev";

function App() {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca todas as mídias quando o componente carrega
  useEffect(() => {
    fetchMidias();
  }, []);

  const fetchMidias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/midias`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setMidias(data);
      console.log('Mídias carregadas:', data);
    } catch (err) {
      console.error('Erro ao buscar mídias:', err);
      setError('Não foi possível carregar o acervo. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  // Função chamada quando um novo item é adicionado
  const handleNewItem = (newItem) => {
    setMidias([...midias, newItem]);
  };

  // Função para deletar um item
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este item?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/midias/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar');
      }

      setMidias(midias.filter(media => media.id !== id));
      console.log('Item deletado com sucesso');
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao deletar o item');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Meu Acervo</h1>
        <p>Gerencie seus livros, filmes e séries</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <MediaForm onNewItem={handleNewItem} />

        {loading ? (
          <p className="loading">Carregando acervo...</p>
        ) : (
          <MediaList midias={midias} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default App;