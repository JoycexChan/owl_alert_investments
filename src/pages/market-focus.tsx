// // pages/stockTreeMap.js
// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js-basic-dist';

// const StockTreeMap = () => {
//     const [treeData, setTreeData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await fetch('/api/stockData');
//             const data = await res.json();
//             setTreeData(data);
//         };
//         fetchData();
//     }, []);

//     return (
//         <div>
//             {treeData ? (
//                 <Plot
//                     data={[
//                         {
//                             type: 'treemap',
//                             labels: treeData.map(item => item.stock_name + ' ' + item.industry_category),
//                             parents: treeData.map(item => item.industry_category),
//                             values: treeData.map(item => item.trading_money),
//                             textinfo: "label+value+percent parent+percent entry",
//                             outsidetextfont: {size: 20, color: "#377eb8"},
//                             marker: {line: {width: 2}},
//                             pathbar: {visible: false}
//                         }
//                     ]}
//                     layout={{width: 900, height: 600, title: 'Stock Information TreeMap'}}
//                 />
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default StockTreeMap;
