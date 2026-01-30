import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Creation Block',
    description: (
      <>
        Creators struggle to consistently write viral, engaging content.
      </>
    ),
  },
  {
    title: 'UX Friction',
    description: (
      <>
        Most Web3 dApps feel like "finance tools" - rigid, complex, and intimidating.
      </>
    ),
  },
  {
    title: 'AI Trust',
    description: (
      <>
        Users never know if the AI model is authentic or manipulated.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureBox}>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
