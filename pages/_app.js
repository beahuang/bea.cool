import { useState } from 'react';

import { Layout, Header } from 'components';
import 'styles/globals.scss';

export default function App({ Component, pageProps }) {
  const [view, setView] = useState('LIST');

  return (
    <Layout>
      <Header view={view} setView={setView} />
      <Component {...pageProps} view={view} />
    </Layout>
  );
}
