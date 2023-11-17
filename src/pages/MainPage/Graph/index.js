import React, {useState, useEffect} from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './styles.css';

const COLORS = {
  lucro: "#82ca9d", // Cor para "lucro"
  perda: "#EB4942", // Cor para "perda"
};

const Graph = ({ movimentacoes }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (movimentacoes && movimentacoes.length > 0) {
      // Crie um objeto para armazenar a soma dos valores para "lucro" e "perda"
      const dataMap = {
        lucro: 0,
        perda: 0,
      };

      // Itere sobre movimentacoes para somar os valores correspondentes
      movimentacoes.forEach(item => {
        if (item.operacao === "Lucro" || item.operacao === "Gasto") {
          const action = item.operacao === "Lucro" ? "lucro" : "perda";
          dataMap[action] += parseFloat(item.valor);
        }
      });

      // Converta o objeto de soma em um array de dados
      const newData = Object.keys(dataMap).map(action => ({
        action: action==='lucro'?'Lucro':'Perda',
        value: dataMap[action],
      }));

      setData(newData);
    }
  }, [movimentacoes]);

  return (
    <div className="direita">
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="action"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
           <Cell
           key={`cell-${index}`}
           fill={COLORS[data[index].action.toLowerCase()]} // Use a cor correspondente com base na ação
         />
          ))}
        </Pie>
        <Tooltip />
        <Legend formatter={(value, entry) => entry.payload.action === 'Lucro' ? 'Lucro' : 'Perda'} />
      </PieChart>
    </div>
  );
};

export default Graph;
