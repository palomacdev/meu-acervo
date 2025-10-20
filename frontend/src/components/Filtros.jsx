import { useState } from 'react'

const Filtros = ({ onFiltrar }) => {
  const [tipoFiltro, setTipoFiltro] = useState('todos')
  const [statusFiltro, setStatusFiltro] = useState('todos')

  const handleTipoChange = (e) => {
    const novoTipo = e.target.value
    setTipoFiltro(novoTipo)
    onFiltrar(novoTipo, statusFiltro)
  }

  const handleStatusChange = (e) => {
    const novoStatus = e.target.value
    setStatusFiltro(novoStatus)
    onFiltrar(tipoFiltro, novoStatus)
  }

  const limparFiltros = () => {
    setTipoFiltro('todos')
    setStatusFiltro('todos')
    onFiltrar('todos', 'todos')
  }

  return (
    <div>
      <h2>🔍 Filtros</h2>
      <div className="filters">
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="filtro-tipo">Filtrar por Tipo</label>
          <select
            id="filtro-tipo"
            value={tipoFiltro}
            onChange={handleTipoChange}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="Livro">📚 Livros</option>
            <option value="Filme">🎬 Filmes</option>
            <option value="Série">📺 Séries</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="filtro-status">Filtrar por Status</label>
          <select
            id="filtro-status"
            value={statusFiltro}
            onChange={handleStatusChange}
          >
            <option value="todos">Todos os Status</option>
            <option value="Quero Ver/Ler">Quero Ver/Ler</option>
            <option value="Já Vi/Li">Já Vi/Li</option>
          </select>
        </div>

        {(tipoFiltro !== 'todos' || statusFiltro !== 'todos') && (
          <button onClick={limparFiltros} style={{ alignSelf: 'flex-end' }}>
            🔄 Limpar Filtros
          </button>
        )}
      </div>
    </div>
  )
}

export default Filtros

