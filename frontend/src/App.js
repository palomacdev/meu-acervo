// frontend/src/App.js (Versão Final com todas as funções)

import React, { useState, useEffect } from 'react';
import './App.css';
import MediaList from './components/MediaList';
import MediaForm from './components/MediaForm';

const API_URL = "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-8000.app.github.dev";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/midias`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Erro ao buscar mídias:", error));
  }, []);

  const handleNewItem = (newItem) => {
    setItems(currentItems => [...currentItems, newItem]);
  };

  const handleDeleteItem = (idToDelete) => {
    fetch(`${API_URL}/midias/${idToDelete}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        setItems(currentItems => currentItems.filter(item => item.id !== idToDelete));
      } else { console.error("Falha ao deletar o item."); }
    })
    .catch(error => console.error("Erro ao deletar item:", error));
  };

  // --- NOVA FUNÇÃO PARA ATUALIZAR ---
  const handleUpdateItem = (idToUpdate, currentItem) => {
    // Determina o novo status
    const newStatus = currentItem.status === 'Quero Ver/Ler' ? 'Já Vi/Li' : 'Quero Ver/Ler';
    
    // Cria o corpo da requisição com os dados para atualizar
    const updatePayload = {
      title: currentItem.title,
      media_type: currentItem.media_type,
      status: newStatus,
      rating: currentItem.rating // Mantém a nota atual por enquanto
    };

    fetch(`${API_URL}/midias/${idToUpdate}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload),
    })
    .then(response => response.json())
    .then(updatedItemFromServer => {
      // Atualiza a lista no frontend com o item que a API retornou
      setItems(currentItems => 
        currentItems.map(item => 
          item.id === idToUpdate ? updatedItemFromServer : item
        )
      );
    })
    .catch(error => console.error("Erro ao atualizar item:", error));
  };
  // --- FIM DA NOVA FUNÇÃO ---

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Acervo Pessoal</h1>
      </header>
      <main>
        <MediaForm onNewItem={handleNewItem} />
        <hr />
        {/* nova função de atualizar para o MediaList */}
        <MediaList 
          items={items} 
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem} 
        />
      </main>
    </div>
  );
}

export default App;