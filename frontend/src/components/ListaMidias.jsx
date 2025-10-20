import MidiaCard from './MidiaCard'

const ListaMidias = ({ midias, onEditar, onDeletar }) => {
  if (midias.length === 0) {
    return (
      <div className="empty-state">
        <h2>📭 Nenhuma mídia encontrada</h2>
        <p>Adicione sua primeira mídia usando o formulário acima!</p>
      </div>
    )
  }

  return (
    <div className="midias-list">
      {midias.map((midia) => (
        <MidiaCard
          key={midia.id}
          midia={midia}
          onEditar={onEditar}
          onDeletar={onDeletar}
        />
      ))}
    </div>
  )
}

export default ListaMidias

