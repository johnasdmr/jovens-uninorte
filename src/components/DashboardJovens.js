import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { Users, Calendar, Phone, Mail, Heart } from 'lucide-react';

// Cores do tema
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#22c55e', '#eab308', '#ef4444'];
const FAIXAS_ETARIAS_COLORS = ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#f472b6'];

const DashboardJovens = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    totalRegistros: 0,
    distribuicaoPorSexo: [],
    distribuicaoPorEstadoCivil: [],
    distribuicaoPorEstado: [],
    distribuicaoPorMembro: [],
    distribuicaoPorIdade: [],
    distribuicaoPorAssociacao: [],
    tendenciaMensal: [],
    comunicacao: {
      whatsapp: 0,
      email: 0,
      interesseEventos: 0
    },
    idadeMedia: 0
  });

  useEffect(() => {
    const processarDados = async () => {
      try {
        setLoading(true);
        
        // Simulação de processamento do arquivo XLSX com dados de exemplo baseados na análise anterior
        // Em um ambiente real, você carregaria o arquivo assim:
        // const response = await window.fs.readFile('20231113jovensuniaonortecopiajnwlffn1lhdoykcbnm4kf8l55.xlsx');
        // const workbook = XLSX.read(response, { cellDates: true });

        // Dados pré-processados com base na análise anterior
        const dadosProcessados = {
          totalRegistros: 187,
          
          distribuicaoPorSexo: [
            { name: 'Masculino', value: 69 },
            { name: 'Feminino', value: 79 },
            { name: 'Não informado', value: 39 }
          ],
          
          distribuicaoPorEstadoCivil: [
            { name: 'Solteiro', value: 81 },
            { name: 'Casado', value: 66 },
            { name: 'Viúvo', value: 1 },
            { name: 'Não informado', value: 39 }
          ],
          
          distribuicaoPorMembro: [
            { name: 'Sim', value: 123 },
            { name: 'Não', value: 20 },
            { name: 'Ex-membro', value: 3 },
            { name: 'Não informado', value: 41 }
          ],
          
          distribuicaoPorIdade: [
            { name: 'Menos de 18', value: 12 },
            { name: '18-24', value: 42 },
            { name: '25-35', value: 68 },
            { name: '36-45', value: 13 },
            { name: 'Acima de 45', value: 12 }
          ],
          
          topEstados: [
            { name: 'Distrito Federal', value: 52 },
            { name: 'Amapá', value: 29 },
            { name: 'Pará', value: 22 },
            { name: 'Ceará', value: 12 },
            { name: 'Tocantins', value: 12 }
          ],
          
          distribuicaoPorAssociacao: [
            { name: 'Campo Missionário Amapaense', value: 29 },
            { name: 'Associação Central Brasileira', value: 24 },
            { name: 'Associação Paraense', value: 19 },
            { name: 'Associação Nordeste Brasileira', value: 13 },
            { name: 'Outros', value: 38 }
          ],
          
          tendenciaMensal: [
            { name: 'Fev/2023', registros: 39 },
            { name: 'Mar/2023', registros: 12 },
            { name: 'Abr/2023', registros: 1 },
            { name: 'Mai/2023', registros: 0 },
            { name: 'Jun/2023', registros: 0 },
            { name: 'Jul/2023', registros: 0 },
            { name: 'Ago/2023', registros: 0 },
            { name: 'Set/2023', registros: 0 },
            { name: 'Out/2023', registros: 0 },
            { name: 'Nov/2023', registros: 135 }
          ],
          
          comunicacao: {
            whatsapp: 149,
            email: 149,
            interesseEventos: 96
          },
          
          idadeMedia: 29,
          idadeMinima: 14,
          idadeMaxima: 53
        };
        
        setData(dadosProcessados);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao processar dados:', err);
        setError('Não foi possível carregar os dados. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    processarDados();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Tentar novamente
        </button>
      </div>
    );
  }

  const calcularPorcentagem = (valor, total) => {
    return total > 0 ? Math.round((valor / total) * 100) : 0;
  };

  const formatarLabel = ({ name, value }) => `${name}: ${value} (${calcularPorcentagem(value, data.totalRegistros)}%)`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Censo de Jovens - IASDMR</h1>
        <p className="opacity-90">União Norte - Análise de perfil e participação</p>
      </div>

      {/* Métricas principais */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Card - Total de registros */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total de Jovens</p>
              <p className="text-2xl font-bold">{data.totalRegistros}</p>
            </div>
          </div>

          {/* Card - Idade média */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Calendar size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Idade Média</p>
              <p className="text-2xl font-bold">{data.idadeMedia} anos</p>
              <p className="text-xs text-gray-500">Entre {data.idadeMinima} e {data.idadeMaxima} anos</p>
            </div>
          </div>

          {/* Card - Comunicação WhatsApp */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Phone size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Com WhatsApp</p>
              <p className="text-2xl font-bold">{data.comunicacao.whatsapp}</p>
              <p className="text-xs text-gray-500">{calcularPorcentagem(data.comunicacao.whatsapp, data.totalRegistros)}% dos jovens</p>
            </div>
          </div>

          {/* Card - Interesse em eventos */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <Heart size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Interesse em Eventos</p>
              <p className="text-2xl font-bold">{data.comunicacao.interesseEventos}</p>
              <p className="text-xs text-gray-500">{calcularPorcentagem(data.comunicacao.interesseEventos, data.totalRegistros)}% querem receber novidades</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico - Distribuição por sexo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Distribuição por Sexo</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribuicaoPorSexo}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={formatarLabel}
                  >
                    {data.distribuicaoPorSexo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico - Distribuição por estado civil */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Estado Civil</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribuicaoPorEstadoCivil}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={formatarLabel}
                  >
                    {data.distribuicaoPorEstadoCivil.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico - Distribuição por idade */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Faixas Etárias</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.distribuicaoPorIdade}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Quantidade" fill="#8b5cf6">
                    {data.distribuicaoPorIdade.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={FAIXAS_ETARIAS_COLORS[index % FAIXAS_ETARIAS_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico - Tendência mensal */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Evolução de Registros</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.tendenciaMensal}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="registros" stroke="#3b82f6" fill="#93c5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico - Top estados */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Top Estados</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data.topEstados}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Jovens" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico - Distribuição por associação */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Associações/Campos</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribuicaoPorAssociacao}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={formatarLabel}
                  >
                    {data.distribuicaoPorAssociacao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico - Membros da igreja */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Membros da IASDMR</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribuicaoPorMembro}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={formatarLabel}
                  >
                    {data.distribuicaoPorMembro.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Métricas de Comunicação */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Canais de Comunicação</h2>
            <div className="space-y-4">
              {/* WhatsApp */}
              <div className="flex items-center">
                <div className="w-1/4">
                  <div className="flex items-center">
                    <Phone size={20} className="text-green-600 mr-2" />
                    <span>WhatsApp</span>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                        {calcularPorcentagem(data.comunicacao.whatsapp, data.totalRegistros)}%
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                      <div 
                        style={{ width: `${calcularPorcentagem(data.comunicacao.whatsapp, data.totalRegistros)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center">
                <div className="w-1/4">
                  <div className="flex items-center">
                    <Mail size={20} className="text-blue-600 mr-2" />
                    <span>E-mail</span>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                        {calcularPorcentagem(data.comunicacao.email, data.totalRegistros)}%
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                      <div 
                        style={{ width: `${calcularPorcentagem(data.comunicacao.email, data.totalRegistros)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interesse em eventos */}
              <div className="flex items-center">
                <div className="w-1/4">
                  <div className="flex items-center">
                    <Heart size={20} className="text-red-500 mr-2" />
                    <span>Eventos</span>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-500 bg-red-100">
                        {calcularPorcentagem(data.comunicacao.interesseEventos, data.totalRegistros)}%
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                      <div 
                        style={{ width: `${calcularPorcentagem(data.comunicacao.interesseEventos, data.totalRegistros)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rodapé com informações adicionais */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Período dos dados:</span> Fevereiro a Novembro de 2023
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Completude dos dados:</span> Aproximadamente 80%
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Dicas para melhorar o cadastro:</span>
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-2">
                <li>Incentivar o preenchimento de todos os campos</li>
                <li>Atualizar periodicamente os dados de contato</li>
                <li>Realizar campanhas de recadastramento</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJovens;