import React from 'react';
import { Grid, SiteMeta } from 'components';
import ogImage from 'public/img/og-image.jpg';

export default function Layout({ children }) {
  return (
    <>
      <SiteMeta title="ʕ•́ᴥ•̀ʔっ bea" description="~ engineer ~" imagePath={ogImage.src} />
      <Grid />
      <main>{children}</main>
    </>
  );
}
