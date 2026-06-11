import styles from './page.module.css';

export default function JournalPage() {
  const articles = [
    { id: 1, title: 'The Origins of Organic Cotton', date: 'March 15, 2026', excerpt: 'Discover the journey from seed to fabric and why sustainable materials matter to Ginkgo.' },
    { id: 2, title: 'A Weekend in Paris', date: 'February 28, 2026', excerpt: 'Our design team explores the streets of Le Marais to find inspiration for the Spring Edit.' },
    { id: 3, title: 'Craftsmanship in Vietnam', date: 'January 10, 2026', excerpt: 'Meeting the local artisans who carefully stitch every garment to perfection.' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Journal</h1>
      <p className={styles.subtitle}>Stories, inspiration, and notes on sustainability.</p>

      <div className={styles.grid}>
        {articles.map(article => (
          <article key={article.id} className={styles.articleCard}>
            <div className={styles.imagePlaceholder} />
            <span className={styles.articleDate}>{article.date}</span>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
