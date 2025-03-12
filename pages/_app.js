import '../styles/App.css';
import '../styles/index.css'
import '../styles/global.css';
import Layout from '../components/Layout';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>Scholar Connect</title>
            <meta name="description" content="Explore academic theses and connect with scholars." />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>
  );
}

export default MyApp;