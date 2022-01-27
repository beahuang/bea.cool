import React from 'react';
import { Grid, SiteMeta } from 'components';

export default function Layout({ children }) {
  return (
    <>
      <SiteMeta
        title="ʕ•́ᴥ•̀ʔっ bea huang | engineer"
        description="a portfolio to showcase the engineering skills of beatrice huang"
      />
      <Grid />
      <main>{children}</main>
    </>
  );
}
