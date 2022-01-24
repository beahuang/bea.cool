import { ExternalArrow } from 'svgs';
import { className } from 'utils';
import styles from './itemDescription.module.scss';

export default function ItemDescription({ item, isList }) {
  return (
    <div {...className(styles.container, isList && styles.list)}>
      <div className={styles.content}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.description}>{item.description}</p>
        <ul className={styles.technologies}>
          {item.technologies.map((tech, i) => (
            <li className={styles.technology} key={i}>
              <span>
                {tech}
                {i < item.technologies.length - 1 ? ', ' : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.links}>
        {item.liveSiteUrl && (
          <li className={styles.item}>
            <a href={item.liveSiteUrl} target="_blank" rel="noreferrer">
              LIVE SITE <ExternalArrow />
            </a>
          </li>
        )}
        {item.caseStudyUrl && (
          <li className={styles.item}>
            <a href={item.caseStudyUrl} target="_blank" rel="noreferrer">
              CASE STUDY <ExternalArrow />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
