import Head from 'next/head';

const Title = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="title" content={title} key="title" />
    <meta property="og:title" content={title} key="og:title" />
    <meta property="twitter:title" content={title} key="twitter:title" />
  </Head>
);

const Description = ({ description }) => (
  <Head>
    <meta name="description" content={description} key="description" />
    <meta property="og:description" content={description} key="og:description" />
    <meta property="twitter:description" content={description} key="twitter:description" />
  </Head>
);

const ImageTag = ({ image }) => (
  <Head>
    <meta property="og:image" content={image} key="og:image" />
    <meta property="twitter:image" content={image} key="twitter:image" />
    <meta property="twitter:card" content="summary" key="twitter:card" />
  </Head>
);

/**
 * Meta tags for title, description and image with support
 * for Open Graph, Facebook, and Twitter.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} image
 */
export default function SiteMeta({ title, description, imagePath }) {
  const URL = 'https://bea.cool';

  /**
   * Meta tags need to be direct children to `Head` for
   * deduplication to work.
   *
   * @see https://nextjs.org/docs/api-reference/next/head
   */
  return (
    <>
      {title && <Title title={title} />}
      {description && <Description description={description} />}
      {imagePath && <ImageTag image={imagePath} />}

      <Head>
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:url" content={URL} key="og:url" />
        <meta property="twitter:url" content={URL} key="twitter:url" />
      </Head>
    </>
  );
}
