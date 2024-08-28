// /src/components/CustomHead.tsx
import Head from 'next/head';

const CustomHead: React.FC = () => {
    return (
        <Head>
            <title>金訊鴞－尋找你的最佳投資，發掘你的生活</title>
            <link rel="icon" href="/images/favicon.ico" />
            {/* <meta name="description" content="金訊鴞為您提供最專業的投資建議和財經新聞。" /> */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />  
        </Head>
    );
};

export default CustomHead;
