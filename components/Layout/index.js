import React from 'react';
import { Grid, SiteMeta } from 'components';

export default function Layout({ children }) {
  return (
    <>
      <SiteMeta title="ʕ•́ᴥ•̀ʔっ bea" description="~ engineer ~" />
      <Grid />
      <main>{children}</main>
    </>
  );
}
