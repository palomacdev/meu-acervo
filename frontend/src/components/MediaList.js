// frontend/src/components/MediaList.js (Refatorado)

import React from 'react';

// Ele só recebe os itens e os mostra.
function MediaList({ items }) {
  return (
    <div>
      <h2>Minha Lista</h2>
      {items.length === 0 ? (
        <p>Nenhum item no acervo...</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> ({item.media_type}) - Status: {item.status}
              {item.rating ? ` - Nota: ${item.rating}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MediaList;