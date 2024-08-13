// pages/stockTreeMap.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const StockTreeMap = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/stockData');
        const data = await res.json();
        setTreeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {treeData ? (
        <Plot
          data={[{
            type: 'treemap',
            labels: treeData.map(item => item.label),
            parents: treeData.map(item => item.parent),
            values: treeData.map(item => item.value),
            textinfo: "label+value+percent parent+percent entry",
            outsidetextfont: {size: 20, color: "#377eb8"},
            marker: {line: {width: 2}},
          }]}
          layout={{
            title: '股票資訊板塊圖',
            height: 600,
            width: 800
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockTreeMap;
