// frontend/src/components/MediaList.js (Versão Final com botão de atualizar)

import React from 'react';

// O componente agora recebe 'onUpdateItem'
function MediaList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div>
      <h2>Minha Lista</h2>
      {items.length === 0 ? (
        <p>Nenhum item no acervo...</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> ({item.media_type})
              - Status: {item.status}
              {item.rating ? ` - Nota: ${item.rating}` : ''}
              
              {/* --- NOVO BOTÃO DE ATUALIZAÇÃO --- */}
              <button 
                onClick={() => onUpdateItem(item.id, item)} 
                style={{ marginLeft: '10px' }}
              >
                {item.status === 'Quero Ver/Ler' ? 'Marcar como Visto' : 'Marcar como Não Visto'}
              </button>
              {/* --- FIM DO NOVO BOTÃO --- */}

              <button onClick={() => onDeleteItem(item.id)} style={{ marginLeft: '10px' }}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MediaList;