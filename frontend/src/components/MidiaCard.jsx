const MidiaCard = ({ midia, onEditar, onDeletar }) => {
  const renderEstrelas = (nota) => {
    if (!nota) return <span style={{ color: '#999' }}>Sem avaliação</span>
    return '⭐'.repeat(nota)
  }

  const getEmojiTipo = (tipo) => {
    const emojis = {
      'Livro': '📚',
      'Filme': '🎬',
      'Série': '📺'
    }
    return emojis[tipo] || '📄'
  }

  const getCorBorda = (tipo) => {
    const cores = {
      'Livro': '#667eea',
      'Filme': '#f093fb',
      'Série': '#4facfe'
    }
    return cores[tipo] || '#667eea'
  }

  return (
    <div className="midia-card" style={{ borderLeftColor: getCorBorda(midia.tipo) }}>
      <div className="midia-header">
        <div>
          <div className="midia-title">
            {getEmojiTipo(midia.tipo)} {midia.titulo}
          </div>
          <span className="midia-type" style={{ background: getCorBorda(midia.tipo) }}>
            {midia.tipo}
          </span>
        </div>
      </div>

      <div className="midia-info">
        <div className="midia-status">
          Status: <span style={{ color: getCorBorda(midia.tipo) }}>{midia.status}</span>
        </div>
        
        <div className="midia-rating">
          Avaliação: {renderEstrelas(midia.nota)}
        </div>
      </div>

      <div className="midia-actions">
        <button className="edit" onClick={() => onEditar(midia)}>
          ✏️ Editar
        </button>
        <button className="delete" onClick={() => onDeletar(midia.id)}>
          🗑️ Deletar
        </button>
      </div>
    </div>
  )
}

export default MidiaCard

