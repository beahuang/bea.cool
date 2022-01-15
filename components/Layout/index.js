import React from 'react';
import { Grid, Header, SiteMeta } from 'components';
import ogImage from 'public/img/og-image.jpg';

export default function Layout({ children }) {
  return (
    <>
      <SiteMeta title="ʕ•́ᴥ•̀ʔっ bea" description="~ Engineer ~" imagePath={ogImage.src} />
      <Grid />
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
