// frontend/src/components/MediaForm.js

import React, { useState } from 'react';

// URL da API aqui
const API_URL = "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-8000.app.github.dev";

function MediaForm({ onNewItem }) {
  // Criamos um estado para cada campo do formulário
  const [title, setTitle] = useState('');
  const [media_type, setMediaType] = useState('Filme');
  const [status, setStatus] = useState('Quero Ver/Ler');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue ao enviar

    const newItem = {
      title,
      media_type,
      status,
      rating: null
    };

    // Faz a chamada POST para a API
    fetch(`${API_URL}/midias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item adicionado com sucesso:', data);
      onNewItem(data); // Avisa o componente pai (App.js) sobre o novo item
      // Limpa o formulário
      setTitle('');
    })
    .catch(error => console.error("Erro ao adicionar item:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Adicionar Novo Item</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <select value={media_type} onChange={(e) => setMediaType(e.target.value)}>
        <option value="Filme">Filme</option>
        <option value="Série">Série</option>
        <option value="Livro">Livro</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Quero Ver/Ler">Quero Ver/Ler</option>
        <option value="Já Vi/Li">Já Vi/Li</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default MediaForm;