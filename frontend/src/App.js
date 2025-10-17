// frontend/src/App.js (Atualizado)

import React, { useState, useEffect } from 'react';
import './App.css';
import MediaList from './components/MediaList';
import MediaForm from './components/MediaForm';

const API_URL = "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-8000.app.github.dev";

function App() {
  const [items, setItems] = useState([]);

  // useEffect para buscar os dados iniciais da API
  useEffect(() => {
    fetch(`${API_URL}/midias`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Erro ao buscar mídias:", error));
  }, []);

  // Função para adicionar o novo item à lista (sem recarregar a página)
  const handleNewItem = (newItem) => {
    setItems(currentItems => [...currentItems, newItem]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Acervo Pessoal</h1>
      </header>
      <main>
        {/* Passamos a função handleNewItem para o formulário */}
        <MediaForm onNewItem={handleNewItem} />
        <hr />
        {/* Passamos a lista de itens para o componente MediaList */}
        <MediaList items={items} />
      </main>
    </div>
  );
}

export default App;