import { useState, useEffect } from 'react'

const FormularioMidia = ({ onSubmit, midiaEditando, onCancelar }) => {
  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('Livro')
  const [status, setStatus] = useState('Quero Ver/Ler')
  const [nota, setNota] = useState('')

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (midiaEditando) {
      setTitulo(midiaEditando.titulo)
      setTipo(midiaEditando.tipo)
      setStatus(midiaEditando.status)
      setNota(midiaEditando.nota || '')
    } else {
      limparFormulario()
    }
  }, [midiaEditando])

  const limparFormulario = () => {
    setTitulo('')
    setTipo('Livro')
    setStatus('Quero Ver/Ler')
    setNota('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!titulo.trim()) {
      alert('Por favor, preencha o título')
      return
    }

    const midia = {
      titulo: titulo.trim(),
      tipo,
      status,
      nota: nota ? parseInt(nota) : null
    }

    const sucesso = midiaEditando 
      ? await onSubmit(midiaEditando.id, midia)
      : await onSubmit(midia)

    if (sucesso) {
      limparFormulario()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{midiaEditando ? '✏️ Editar Mídia' : '➕ Adicionar Nova Mídia'}</h2>
      
      <div className="form-group">
        <label htmlFor="titulo">Título *</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo *</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="Livro">Livro</option>
          <option value="Filme">Filme</option>
          <option value="Série">Série</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Quero Ver/Ler">Quero Ver/Ler</option>
          <option value="Já Vi/Li">Já Vi/Li</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="nota">Nota (1 a 5 estrelas)</label>
        <select
          id="nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        >
          <option value="">Sem nota</option>
          <option value="1">⭐ 1 estrela</option>
          <option value="2">⭐⭐ 2 estrelas</option>
          <option value="3">⭐⭐⭐ 3 estrelas</option>
          <option value="4">⭐⭐⭐⭐ 4 estrelas</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 estrelas</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">
          {midiaEditando ? '💾 Salvar Alterações' : '➕ Adicionar'}
        </button>
        
        {midiaEditando && (
          <button type="button" onClick={onCancelar} className="edit">
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioMidia

