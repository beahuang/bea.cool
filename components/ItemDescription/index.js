import styles from './itemDescription.module.scss';

export default function ItemDescription({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.description}>{item.description}</p>
      </div>
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
      <ul className={styles.links}>
        {item.liveSiteUrl && (
          <li className={styles.item}>
            <a href={item.liveSiteUrl} target="_blank" rel="noreferrer">
              Live Site
            </a>
          </li>
        )}
        {item.caseStudyUrl && (
          <li className={styles.item}>
            <a href={item.caseStudyUrl} target="_blank" rel="noreferrer">
              Case Study
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
