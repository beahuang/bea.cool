import { Gallery, List } from 'components';

import mobileAppImage from 'public/img/mobile-app.png';
import solugenImage from 'public/img/solugen.jpeg';
import pbsNewshour from 'public/img/pbs-newshour.png';
import arnoldArboretumImage from 'public/img/arboretum.png';
import michelleWuImage from 'public/img/michelle-wu.png';
import sasakiImage from 'public/img/sasaki.png';
import sportsInnovationImage from 'public/img/sports-innovation-lab.jpg';
import designtexImage from 'public/img/designtex.png';
import devotedHealthImage from 'public/img/devoted-health.png';
import emergenceCapitalImage from 'public/img/emergence-capital.png';

const projects = [
  {
    title: 'Mobile Reading App + Website',
    description: 'A new social e-reader that will give readers a new way to engage with books',
    technologies: ['React Native', 'Ruby on Rails', 'Next.js', 'Sanity'],
    image: mobileAppImage,
    altText: 'Grid of illustrated book covers',
  },
  {
    title: 'Solugen',
    description: 'Website for a sustainable chemicals start-up',
    technologies: ['WordPress', 'Docker'],
    image: solugenImage,
    liveSiteUrl: 'https://solugen.com/',
    caseStudyUrl: 'https://upstatement.com/case-study/solugen/',
    altText: 'Particle animation resembling an orb',
  },
  {
    title: 'PBS NewsHour Election Graphics',
    description:
      'Election Graphics Tool using Web Components and data feed from the Associated Press',
    image: pbsNewshour,
    technologies: ['Web Components', 'D3'],
    liveSiteUrl: 'https://www.pbs.org/newshour/elections-2020/results',
    caseStudyUrl: 'https://upstatement.com/case-study/pbs-newshour/',
    altText: 'Graphics of the Iowa primary elections',
  },
  {
    title: 'Arnold Arboretum',
    description: "Website for Boston's museum of trees",
    technologies: ['WordPress', 'Algolia', 'Barba.js', 'ArcGIS', 'Docker'],
    image: arnoldArboretumImage,
    liveSiteUrl: 'https://arboretum.harvard.edu/',
    caseStudyUrl: 'https://upstatement.com/case-study/arnold-arboretum/',
    altText: 'Line illustration of the Arnold Arboretum',
  },
  {
    title: 'Michelle Wu for Mayor of Boston',
    description: 'Brand Toolkit for generating digital assets to support the Michelle Wu campaign',
    technologies: ['Gatsby', 'Netlify', 'Styled Components'],
    image: michelleWuImage,
    liveSiteUrl: 'https://toolkit.michelleforboston.com/',
    caseStudyUrl: 'https://upstatement.com/case-study/michelle-wu-for-mayor-of-boston/',
    altText: 'Michelle Wu for mayor digital branding',
  },
  {
    title: 'Sasaki',
    description: 'Website for interdisciplinary architecture, planning, landscape, and design firm',
    technologies: ['WordPress', 'Algolia', 'Barba.js'],
    image: sasakiImage,
    liveSiteUrl: 'https://www.sasaki.com/',
    altText: 'Multicolored lines making the Sasaki logo ',
  },
  {
    title: 'Sports Innovation Lab',
    description:
      'Web Application that delivers personalized, data-driven insights for the sports industry',
    technologies: ['Algolia', 'Auth0', 'Express', 'Storybook', 'Stream'],
    image: sportsInnovationImage,
    caseStudyUrl: 'https://upstatement.com/case-study/sports-innovation-lab/',
    altText: 'Bar chart graphic displaying scoreboards',
  },
  {
    title: 'Designtex',
    description:
      'Web application for users to order on-demand swatches customized to their projects needs',
    technologies: ['Three.js', 'Typescript', 'React', 'Redux'],
    image: designtexImage,
    caseStudyUrl: 'https://upstatement.com/case-study/designtex/',
    altText: '3D visualization of textiles wrapped around a bench',
  },
  {
    title: 'Devoted Health',
    description: 'Digital platform for a healthcare company for seniors',
    technologies: ['Prismic', 'Gatsby', 'Algolia', 'i18n', 'Typescript'],
    image: devotedHealthImage,
    liveSiteUrl: 'https://www.devoted.com/',
    altText: 'Screenshot of the provider search on DevotedHeath.com',
  },
  {
    title: 'Emergence Capital',
    description: 'Digital platform for a Silicon Vallery VC Firm',
    technologies: ['Contentful', 'Gatsby', 'Netlify'],
    image: emergenceCapitalImage,
    caseStudyUrl: 'https://upstatement.com/case-study/emergence/',
    liveSiteUrl: 'https://www.emcap.com/',
    altText: 'Screenshot of the blog page of Emergence Capital',
  },
];

export default function Home({ view }) {
  return (
    <>
      {view === 'GALLERY' && <Gallery items={projects} />}
      {view === 'LIST' && <List items={projects} />}
    </>
  );
}
