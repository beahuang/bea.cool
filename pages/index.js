import { Gallery } from 'components';

import mobileAppImage from 'public/img/mobile-app.jpg';
import solugenImage from 'public/img/solugen.jpg';
import pbsNewshour from 'public/img/pbs-newshour.jpg';
import arnoldArboretumImage from 'public/img/arnold-arboretum.jpg';
import michelleWuImage from 'public/img/michelle-wu.jpg';
import sasakiImage from 'public/img/sasaki.jpg';
import sportsInnovationImage from 'public/img/sports-innovation-lab.jpg';
import designtexImage from 'public/img/designtex.jpg';
import devotedHealthImage from 'public/img/devoted-health.jpg';
import emergenceCapitalImage from 'public/img/emergence-capital.jpg';

export default function Home() {
  const projects = [
    {
      title: 'Mobile Reading App + Website',
      description: 'React Native, Rails API, Next.js, Sanity',
      imageUrl: mobileAppImage,
    },
    {
      title: 'Solugen',
      description: 'CMS Build',
      imageUrl: solugenImage,
      liveSiteUrl: 'https://solugen.com/',
      caseStudyUrl: 'https://upstatement.com/case-study/solugen/',
    },
    {
      title: 'PBS NewsHour Election Graphics',
      description: 'Web Components',
      imageUrl: pbsNewshour,
      liveSiteUrl: 'https://www.pbs.org/newshour/elections-2020/results',
      caseStudyUrl: 'https://upstatement.com/case-study/pbs-newshour/',
    },
    {
      title: 'Arnold Arboretum',
      description: 'CMS Build',
      imageUrl: arnoldArboretumImage,
      liveSiteUrl: 'https://arboretum.harvard.edu/',
      caseStudyUrl: 'https://upstatement.com/case-study/arnold-arboretum/',
    },
    {
      title: 'Michelle Wu for Mayor of Boston',
      description: 'Brand',
      imageUrl: michelleWuImage,
      liveSiteUrl: 'https://toolkit.michelleforboston.com/',
      caseStudyUrl: 'https://upstatement.com/case-study/michelle-wu-for-mayor-of-boston/',
    },
    {
      title: 'Sasaki',
      description: 'CMS Build',
      imageUrl: sasakiImage,
      liveSiteUrl: 'https://www.sasaki.com/',
    },
    {
      title: 'Sports Innovation Lab',
      description: 'Web Application',
      imageUrl: sportsInnovationImage,
      caseStudyUrl: 'https://upstatement.com/case-study/sports-innovation-lab/',
    },
    {
      title: 'Designtex',
      description: 'Web application for 3D textile visualization',
      imageUrl: designtexImage,
      caseStudyUrl: 'https://upstatement.com/case-study/designtex/',
    },
    {
      title: 'Devoted Health',
      description: 'Prismic React Algolia Multilingual support',
      imageUrl: devotedHealthImage,
      liveSiteUrl: 'https://www.devoted.com/',
    },
    {
      title: 'Emergence Capital',
      description: 'CMS Build',
      imageUrl: emergenceCapitalImage,
      caseStudyUrl: 'https://upstatement.com/case-study/emergence/',
      liveSiteUrl: 'https://www.emcap.com/',
    },
  ];

  return (
    <>
      <Gallery items={projects} />
    </>
  );
}
