import { useState, useEffect } from 'react'
import { midiaAPI } from './api'
import FormularioMidia from './components/FormularioMidia'
import ListaMidias from './components/ListaMidias'
import Filtros from './components/Filtros'

function App() {
  const [midias, setMidias] = useState([])
  const [midiasFiltradas, setMidiasFiltradas] = useState([])
  const [midiaEditando, setMidiaEditando] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Carregar mídias ao iniciar
  useEffect(() => {
    carregarMidias()
  }, [])

  // Atualizar mídias filtradas quando a lista mudar
  useEffect(() => {
    setMidiasFiltradas(midias)
  }, [midias])

  const carregarMidias = async () => {
    try {
      setCarregando(true)
      setErro(null)
      const dados = await midiaAPI.listar()
      setMidias(dados)
    } catch (err) {
      console.error('Erro ao carregar mídias:', err)
      setErro('Erro ao carregar mídias. Verifique se o backend está rodando.')
    } finally {
      setCarregando(false)
    }
  }

  const adicionarMidia = async (novaMidia) => {
    try {
      const midiaCreated = await midiaAPI.criar(novaMidia)
      setMidias([...midias, midiaCreated])
      return true
    } catch (err) {
      console.error('Erro ao adicionar mídia:', err)
      alert('Erro ao adicionar mídia. Tente novamente.')
      return false
    }
  }

  const atualizarMidia = async (id, midiaAtualizada) => {
    try {
      const midiaUpdated = await midiaAPI.atualizar(id, midiaAtualizada)
      setMidias(midias.map(m => m.id === id ? midiaUpdated : m))
      setMidiaEditando(null)
      return true
    } catch (err) {
      console.error('Erro ao atualizar mídia:', err)
      alert('Erro ao atualizar mídia. Tente novamente.')
      return false
    }
  }

  const deletarMidia = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta mídia?')) {
      return
    }

    try {
      await midiaAPI.deletar(id)
      setMidias(midias.filter(m => m.id !== id))
    } catch (err) {
      console.error('Erro ao deletar mídia:', err)
      alert('Erro ao deletar mídia. Tente novamente.')
    }
  }

  const editarMidia = (midia) => {
    setMidiaEditando(midia)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelarEdicao = () => {
    setMidiaEditando(null)
  }

  const aplicarFiltros = (tipo, status) => {
    let resultado = [...midias]

    if (tipo !== 'todos') {
      resultado = resultado.filter(m => m.tipo === tipo)
    }

    if (status !== 'todos') {
      resultado = resultado.filter(m => m.status === status)
    }

    setMidiasFiltradas(resultado)
  }

  return (
    <>
      <h1>📚 Meu Acervo</h1>
      
      <div className="container">
        <FormularioMidia
          onSubmit={midiaEditando ? atualizarMidia : adicionarMidia}
          midiaEditando={midiaEditando}
          onCancelar={cancelarEdicao}
        />
      </div>

      <div className="container">
        <Filtros onFiltrar={aplicarFiltros} />
        
        {carregando ? (
          <div className="empty-state">
            <h2>Carregando...</h2>
          </div>
        ) : erro ? (
          <div className="empty-state">
            <h2>❌ {erro}</h2>
          </div>
        ) : (
          <ListaMidias
            midias={midiasFiltradas}
            onEditar={editarMidia}
            onDeletar={deletarMidia}
          />
        )}
      </div>
    </>
  )
}

export default App

