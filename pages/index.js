import { Gallery, List, NewsTicker } from 'components';

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
import hbsImage from 'public/img/hbs.png';
import mitImage from 'public/img/mit.png';
import votingRightsLabImage from 'public/img/vrl.png';
import theTraceImage from 'public/img/the-trace.png';
import commonwealthImage from 'public/img/commonwealth.png';

const projects = [
  {
    title: 'Threadable iOS App + Website',
    description: 'A new social e-reader platform that gives readers a community to preview, discuss, and discover books.',
    technologies: ['React', 'React Native', 'Ruby on Rails', 'Tailwind'],
    image: mobileAppImage,
    caseStudyUrl: 'https://upstatement.com/case-study/threadable/',
    appStoreUrl: 'https://apps.apple.com/us/app/threadable/id1550995547',
    liveSiteUrl: 'https://www.threadablebooks.com/',
    altText: 'Grid of illustrated book covers',
    showInGallery: true,
  },
  {
    title: "Harvard Business School",
    description: "Maintained and extended HBS design system components to launch a re-platformed HBS Working Knowledge, Baker Library, and eventually HBS Online.",
    technologies: ['Next.js', 'Storybook', 'Contentful', 'Typescript', 'Elasticsearch'],
    image: hbsImage,
    liveSiteUrl: 'https://www.library.hbs.edu/working-knowledge',
    designSystemUrl: 'https://designsystem.hbs.edu/',
    altText: 'Landing page for Harvard Business School',
    showInGallery: true,
  },
  {
    title: "Voting Rights Lab",
    description: "Conducted an 8-week technical research audit of the current Voting Rights Lab website and tracker in order to provide recommendations for replatforming.",
    image: votingRightsLabImage,
    technologies: [],
    liveSiteUrl: 'https://www.votingrightslab.org/',
    altText: 'Landing page for Voting Rights Lab',
    showInGallery: true,
  },
  {
    title: 'MIT Advancement Intranet',
    description: "Re-platformed MIT Advancement's intranet site to better support their multiple stakeholders. Included a more robust system to search through resources such as one-pagers, brochures, and more as well as MIT staff and faculty.",
    technologies: ['WordPress', 'Algolia', 'MIT API integrations'],
    image: mitImage,
    altText: 'MIT\'s Logo lockup',
    showInGallery: true,
  },
  {
    title: 'PBS NewsHour Election Graphics',
    description:
      'Election Graphics Tool leveraging Web Components and real-time Associated Press election data to generate graphics for the 2020 election. These graphics appeared on PBS NewsHour\'s website, live broadcasting, and social media platforms.',
    image: pbsNewshour,
    technologies: ['Web Components', 'D3'],
    liveSiteUrl: 'https://www.pbs.org/newshour/elections-2020/results',
    caseStudyUrl: 'https://upstatement.com/case-study/pbs-newshour/',
    altText: 'Graphics of the Iowa primary elections',
    showInGallery: true,
  },
  {
    title: 'Arnold Arboretum',
    description: "CMS re-platformed website for Boston's museum of trees. Included integration with the arboretum's ArcGIS data to provide a more dynamic tree location experience for visitors.",
    technologies: ['WordPress', 'Algolia', 'Barba.js', 'ArcGIS', 'Docker'],
    image: arnoldArboretumImage,
    liveSiteUrl: 'https://arboretum.harvard.edu/',
    caseStudyUrl: 'https://upstatement.com/case-study/arnold-arboretum/',
    altText: 'Line illustration of the Arnold Arboretum',
    showInGallery: false,
  },
  {
    title: 'Michelle Wu for Mayor of Boston',
    description: 'Brand Toolkit for generating digital assets to support the Michelle Wu campaign in 2021. Supporters could download digital assets in various formats and languages to use on social media platforms, print for their lawn signs, and more.',
    technologies: ['Gatsby', 'Netlify', 'Styled Components'],
    image: michelleWuImage,
    liveSiteUrl: 'https://toolkit.michelleforboston.com/',
    caseStudyUrl: 'https://upstatement.com/case-study/michelle-wu-for-mayor-of-boston/',
    altText: 'Michelle Wu for mayor digital branding',
    showInGallery: true,
  },
  {
    title: 'Solugen',
    description:
      'CMS re-platformed website showcasing the new branding for a sustainable chemicals start-up.',
    technologies: ['WordPress', 'Docker', 'Twig'],
    image: solugenImage,
    liveSiteUrl: 'https://solugen.com/',
    caseStudyUrl: 'https://upstatement.com/case-study/solugen/',
    altText: 'Particle animation resembling an orb',
    showInGallery: false,
  },
  {
    title: 'Sasaki',
    description:
      'CMS re-platformed website for interdisciplinary architecture, planning, landscape, and design firm.',
    technologies: ['WordPress', 'Algolia', 'Barba.js'],
    image: sasakiImage,
    liveSiteUrl: 'https://www.sasaki.com/',
    altText: 'Multicolored lines making the Sasaki logo ',
    showInGallery: false,
  },
  {
    title: 'Devoted Health',
    description: 'Digital platform for a healthcare company for seniors with a focus on simplicity, accessibility, and bilingual support.',
    technologies: ['Prismic', 'Gatsby', 'Algolia', 'i18n', 'Typescript'],
    image: devotedHealthImage,
    liveSiteUrl: 'https://www.devoted.com/',
    altText: 'Screenshot of the provider search on DevotedHeath.com',
    showInGallery: true,
  },
  {
    title: 'Sports Innovation Lab',
    description:
      'Web Application that delivers personalized, data-driven insights for the sports industry.',
    technologies: ['Algolia', 'Auth0', 'Express', 'Storybook', 'Stream'],
    image: sportsInnovationImage,
    caseStudyUrl: 'https://upstatement.com/case-study/sports-innovation-lab/',
    altText: 'Bar chart graphic displaying scoreboards',
    showInGallery: true,
  },
  {
    title: 'Designtex',
    description:
      'Web application for users to visualize, customize, and order on-demand swatches specially suited to their projects needs.',
    technologies: ['Three.js', 'Typescript', 'React', 'Redux'],
    image: designtexImage,
    caseStudyUrl: 'https://upstatement.com/case-study/designtex/',
    altText: '3D visualization of textiles wrapped around a bench',
    showInGallery: true,
  },
  {
    title: 'The Trace',
    description: "CMS re-platformed website for a newsroom dedicated to reporting on gun violence in the United States.",
    technologies: ['WordPress', 'Timber', 'Twig'],
    image: theTraceImage,
    liveSiteUrl: 'https://www.thetrace.org/',
    altText: 'Landing page for The Trace',
    showInGallery: true,
  },
  {
    title: 'Commonwealth Financial Network',
    description: 'CMS re-platformed website for a financial services company.',
    technologies: ['Contentful', 'React', 'Gatsby', 'Three.js', 'Algolia'],
    image: commonwealthImage,
    liveSiteUrl: 'https://www.commonwealth.com/',
    altText: 'Landing page for Commonwealth Financial Network',
    showInGallery: false,
  },
  {
    title: 'Emergence Capital',
    description: 'CMS re-platformed website for a Silicon Vallery VC Firm.',
    technologies: ['Contentful', 'Gatsby', 'Netlify'],
    image: emergenceCapitalImage,
    caseStudyUrl: 'https://upstatement.com/case-study/emergence/',
    liveSiteUrl: 'https://www.emcap.com/',
    altText: 'Screenshot of the blog page of Emergence Capital',
    showInGallery: false,
  },
];

export default function Home({ view }) {
  return (
    <>
      <NewsTicker />
      {view === 'GALLERY' && <Gallery items={projects.filter(project => project.showInGallery)} />}
      {view === 'LIST' && <List items={projects} />}
    </>
  );
}
