// frontend/src/components/MediaList.js

import React from 'react';
import './MediaList.css';

function MediaList({ midias, onDelete }) {
  if (midias.length === 0) {
    return (
      <div className="media-list empty">
        <p>Nenhum item no acervo ainda. Adicione o primeiro!</p>
      </div>
    );
  }

  return (
    <div className="media-list">
      <h2>Meu Acervo ({midias.length} {midias.length === 1 ? 'item' : 'itens'})</h2>
      <div className="media-grid">
        {midias.map((media) => (
          <div key={media.id} className="media-card">
            <div className="media-header">
              <h3>{media.title}</h3>
              <button 
                className="delete-btn"
                onClick={() => onDelete(media.id)}
                title="Deletar"
              >
                🗑️
              </button>
            </div>
            
            <div className="media-tags">
              <span className={`tag tag-${media.media_type.toLowerCase()}`}>
                {media.media_type === 'Filme' ? '🎬' : media.media_type === 'Série' ? '📺' : '📚'} {media.media_type}
              </span>
              <span className={`tag tag-status`}>
                {media.status === 'Quero Ver/Ler' ? '⏰' : '✅'} {media.status}
              </span>
              {media.rating && (
                <span className="tag tag-rating">
                  ⭐ {media.rating}/10
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaList;