import dynamic from 'next/dynamic';

// 动态导入 TaiwanStockIndicesChart 组件，禁用服务端渲染
const TaiwanStockIndicesChart = dynamic(() => import('../../components/TaiwanStockTotalReturnIndex'), { ssr: false });

function MyPage() {
    return (
        <div>
            <h1>台灣股市總回報指數走勢</h1>
            <TaiwanStockIndicesChart />
        </div>
    );
}

export default MyPage;
