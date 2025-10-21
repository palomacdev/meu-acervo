import React, { useState, useEffect, useCallback } from 'react';
import { midiaAPI } from './api';
import FormularioMidia from './components/FormularioMidia';
import ListaMidias from './components/ListaMidias';
import Filtros from './components/Filtros';

const LIMIT_PER_PAGE = 10; // Itens por página

function App() {
  // Estados de Dados e UI
  const [midias, setMidias] = useState([]); // Apenas as mídias da página atual
  const [totalItems, setTotalItems] = useState(0); // Total de itens para calcular as páginas
  const [midiaEditando, setMidiaEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados de Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // --- FUNÇÃO PRINCIPAL DE CARREGAMENTO COM PAGINAÇÃO E FILTROS ---
  const carregarMidias = useCallback(async (page, limit, tipo, status) => {
    try {
      setCarregando(true);
      setErro(null);

      // Calcula o skip (quantos itens pular)
      const skip = (page - 1) * limit;

      // Chamada à API
      const dados = await midiaAPI.listar(skip, limit, tipo, status);

      // O backend deve retornar { total: X, midias: [...] }
      setMidias(dados.midias);
      setTotalItems(dados.total);
    } catch (err) {
      console.error('Erro ao carregar mídias:', err);
      setErro('Erro ao carregar mídias. Verifique a conexão com o backend.');
    } finally {
      setCarregando(false);
    }
  }, []);

  // Efeito para carregar mídias ao iniciar e ao mudar de página/filtro
  useEffect(() => {
    carregarMidias(currentPage, LIMIT_PER_PAGE, filtroTipo, filtroStatus);
  }, [currentPage, filtroTipo, filtroStatus, carregarMidias]);

  // Funções CRUD - Ajustadas para recarregar a página ou voltar ao início

  const adicionarMidia = async (novaMidia) => {
    try {
      await midiaAPI.criar(novaMidia);
      // Volta para a primeira página para o usuário ver o novo item
      setCurrentPage(1);
      return true;
    } catch (err) {
      console.error('Erro ao adicionar mídia:', err);
      alert('Erro ao adicionar mídia. Tente novamente.');
      return false;
    }
  };

  const atualizarMidia = async (id, midiaAtualizada) => {
    try {
      await midiaAPI.atualizar(id, midiaAtualizada);
      // Recarrega a página atual para refletir a atualização
      carregarMidias(currentPage, LIMIT_PER_PAGE, filtroTipo, filtroStatus);
      setMidiaEditando(null);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar mídia:', err);
      alert('Erro ao atualizar mídia. Tente novamente.');
      return false;
    }
  };

  const deletarMidia = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta mídia?')) {
      return;
    }

    try {
      await midiaAPI.deletar(id);
      // Após deletar, recarrega a página atual
      carregarMidias(currentPage, LIMIT_PER_PAGE, filtroTipo, filtroStatus);
    } catch (err) {
      console.error('Erro ao deletar mídia:', err);
      alert('Erro ao deletar mídia. Tente novamente.');
    }
  };

  const editarMidia = (midia) => {
    setMidiaEditando(midia);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setMidiaEditando(null);
  };

  // Funções de Filtro e Paginação

  const aplicarFiltros = (tipo, status) => {
    // Ao aplicar filtros, voltamos para a primeira página
    setCurrentPage(1);
    setFiltroTipo(tipo);
    setFiltroStatus(status);
    // O useEffect fará a chamada de API automaticamente
  };

  // Lógica da Paginação
  const totalPages = Math.ceil(totalItems / LIMIT_PER_PAGE);
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const handleNextPage = () => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (canGoPrev) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400">
            📚 Meu Acervo
          </h1>
          <p className="text-gray-400 mt-2">
            Sua lista pessoal de filmes, séries e livros.
          </p>
        </header>
        <main>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <FormularioMidia
              onSubmit={midiaEditando ? atualizarMidia : adicionarMidia}
              midiaEditando={midiaEditando}
              onCancelar={cancelarEdicao}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Acervo Total ({totalItems} itens)
            </h2>
            
            <div className='mb-4'>
              <Filtros onFiltrar={aplicarFiltros} />
            </div>

            {carregando ? (
              <div className="empty-state">
                <h2 className="text-xl text-gray-400">Carregando...</h2>
              </div>
            ) : erro ? (
              <div className="empty-state">
                <h2 className="text-xl text-red-500">❌ {erro}</h2>
              </div>
            ) : (
              <>
                <ListaMidias
                  midias={midias}
                  onEditar={editarMidia}
                  onDeletar={deletarMidia}
                />

                {/* --- CONTROLES DE PAGINAÇÃO --- */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-6 p-4 bg-gray-700 rounded-md">
                    <button 
                      onClick={handlePrevPage} 
                      disabled={!canGoPrev}
                      className={`px-4 py-2 rounded-md font-semibold transition-colors ${canGoPrev ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                      Página Anterior
                    </button>
                    
                    <span className="text-white">
                      Página {currentPage} de {totalPages}
                    </span>
                    
                    <button 
                      onClick={handleNextPage} 
                      disabled={!canGoNext}
                      className={`px-4 py-2 rounded-md font-semibold transition-colors ${canGoNext ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                      Próxima Página
                    </button>
                  </div>
                )}
                {/* --- FIM DOS CONTROLES DE PAGINAÇÃO --- */}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
