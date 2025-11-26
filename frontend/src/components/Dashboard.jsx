import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';

function Dashboard({ onLogout }) {
  const { isDark, toggleTheme } = useTheme();
  const [imoveis, setImoveis] = useState([]);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  useEffect(() => {
    carregarImoveis();
  }, []);

  const carregarImoveis = async () => {
    try {
      const response = await api.get('/api/imoveis');
      setImoveis(response.data);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    }
  };

  const carregarDetalhesImovel = async (id) => {
    try {
      const response = await api.get(`/api/imoveis/${id}`);
      setImovelSelecionado(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
    }
  };

  const handleNovoImovel = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/imoveis', formData);
      setShowModal(null);
      setFormData({});
      carregarImoveis();
    } catch (error) {
      alert(error.response?.data?.detail || 'Erro ao criar imóvel');
    } finally {
      setLoading(false);
    }
  };

  const handleNovaUnidade = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/unidades', {
        ...formData,
        imovel_id: imovelSelecionado.id,
        valor_aluguel: parseFloat(formData.valor_aluguel)
      });
      setShowModal(null);
      setFormData({});
      carregarDetalhesImovel(imovelSelecionado.id);
    } catch (error) {
      alert(error.response?.data?.detail || 'Erro ao criar unidade');
    } finally {
      setLoading(false);
    }
  };

  const handleNovoLocatario = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/locatarios', formData);
      setShowModal(null);
      setFormData({});
      carregarDetalhesImovel(imovelSelecionado.id);
    } catch (error) {
      alert(error.response?.data?.detail || 'Erro ao criar locatário');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletarImovel = async (id) => {
    if (!confirm('Deseja realmente deletar este imóvel?')) return;
    try {
      await api.delete(`/api/imoveis/${id}`);
      setImovelSelecionado(null);
      carregarImoveis();
    } catch (error) {
      alert('Erro ao deletar imóvel');
    }
  };

  const handleDeletarUnidade = async (id) => {
    if (!confirm('Deseja realmente deletar esta unidade?')) return;
    try {
      await api.delete(`/api/unidades/${id}`);
      carregarDetalhesImovel(imovelSelecionado.id);
    } catch (error) {
      alert('Erro ao deletar unidade');
    }
  };

  const handleDeletarLocatario = async (id) => {
    if (!confirm('Deseja realmente remover este locatário?')) return;
    try {
      await api.delete(`/api/locatarios/${id}`);
      carregarDetalhesImovel(imovelSelecionado.id);
    } catch (error) {
      alert('Erro ao remover locatário');
    }
  };

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setBuscandoCep(true);
    try {
      const response = await api.get(`/api/imoveis/buscar-cep/${cepLimpo}`);
      setFormData({
        ...formData,
        endereco: response.data.endereco,
        cidade: response.data.cidade,
        estado: response.data.estado,
        cep: response.data.cep
      });
    } catch (error) {
      alert('CEP não encontrado');
    } finally {
      setBuscandoCep(false);
    }
  };

  const handleCepChange = (e) => {
    const cep = e.target.value;
    setFormData({ ...formData, cep });
    if (cep.replace(/\D/g, '').length === 8) {
      buscarCep(cep);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Meus Imóveis</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title={isDark ? 'Modo Claro' : 'Modo Escuro'}
              type="button"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Imóveis */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Imóveis</h2>
              <button
                onClick={() => setShowModal('imovel')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                + Novo Imóvel
              </button>
            </div>

            <div className="space-y-3">
              {imoveis.map((imovel) => (
                <div
                  key={imovel.id}
                  onClick={() => carregarDetalhesImovel(imovel.id)}
                  className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition ${
                    imovelSelecionado?.id === imovel.id ? 'ring-2 ring-red-600 bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                >
                  <h3 className="font-semibold text-lg dark:text-white">{imovel.nome}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{imovel.endereco}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    {imovel.cidade} - {imovel.estado}
                  </p>
                </div>
              ))}
              {imoveis.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Nenhum imóvel cadastrado
                </p>
              )}
            </div>
          </div>

          {/* Detalhes do Imóvel */}
          <div>
            {imovelSelecionado ? (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{imovelSelecionado.nome}</h2>
                    <p className="text-gray-600">{imovelSelecionado.endereco}</p>
                    <p className="text-gray-500">
                      {imovelSelecionado.cidade} - {imovelSelecionado.estado}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletarImovel(imovelSelecionado.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Unidades</h3>
                    <button
                      onClick={() => setShowModal('unidade')}
                      className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                    >
                      + Unidade
                    </button>
                  </div>

                  <div className="space-y-3">
                    {imovelSelecionado.unidades?.map((unidade) => (
                      <div key={unidade.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-semibold">Unidade {unidade.numero}</span>
                            <span
                              className={`ml-2 px-2 py-1 rounded text-xs ${
                                unidade.status === 'alugado'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {unidade.status}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeletarUnidade(unidade.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm">
                          R$ {unidade.valor_aluguel.toFixed(2)}/mês
                        </p>

                        {unidade.locatario ? (
                          <div className="mt-2 bg-gray-50 p-2 rounded">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{unidade.locatario.nome}</p>
                                <p className="text-xs text-gray-600">CPF: {unidade.locatario.cpf}</p>
                                {unidade.locatario.telefone && (
                                  <p className="text-xs text-gray-600">
                                    Tel: {unidade.locatario.telefone}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeletarLocatario(unidade.locatario.id)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setFormData({ unidade_id: unidade.id });
                              setShowModal('locatario');
                            }}
                            className="mt-2 w-full bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            + Adicionar Locatário
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center text-gray-500 dark:text-gray-400">
                Selecione um imóvel para ver os detalhes
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {showModal === 'imovel' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Novo Imóvel</h2>
            <form onSubmit={handleNovoImovel} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">CEP</label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.cep || ''}
                  onChange={handleCepChange}
                  maxLength="9"
                />
                {buscandoCep && (
                  <p className="text-xs text-blue-600 mt-1">Buscando CEP...</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Endereço"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.cidade || ''}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Estado (UF)"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.estado || ''}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  maxLength="2"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(null);
                    setFormData({});
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || buscandoCep}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'unidade' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nova Unidade</h2>
            <form onSubmit={handleNovaUnidade} className="space-y-3">
              <input
                type="text"
                placeholder="Número"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Valor do Aluguel"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, valor_aluguel: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'locatario' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Novo Locatário</h2>
            <form onSubmit={handleNovoLocatario} className="space-y-3">
              <input
                type="text"
                placeholder="Nome"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="CPF"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Telefone (opcional)"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email (opcional)"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="date"
                placeholder="Data Início Contrato"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, data_inicio_contrato: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Data Fim Contrato (opcional)"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, data_fim_contrato: e.target.value })}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
