import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';
import Script from 'next/script';

import { Layout, Header } from 'components';
import 'styles/globals.scss';

const handleRouteChange = url => {
  gtag.pageview(url);
};

export default function App({ Component, pageProps }) {
  const [view, setView] = useState('GALLERY');

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Header view={view} setView={setView} />
      <Component {...pageProps} view={view} />
    </Layout>
  );
}
