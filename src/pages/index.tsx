import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Carousel from '@site/src/components/Carousel';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs">
                        Get Started 
                    </Link>
                </div>
            </div>
        </header>
    );
}

function DocumentationGallery() {
    return (
        <section className={clsx(styles.section, styles.sectionAlt)}>
            <Heading as="h2">Documentation Gallery</Heading>
            <p>Explore our latest events and workshops.</p>
            <Carousel />
        </section>
    );
}

function VideoTutorial() {
    return (
        <section className={styles.section}>
            <Heading as="h2">Video Guide</Heading>
            <p>Watch our intro video to get started quickly.</p>
            <div className={styles.placeholder}>
                <p>▶️ YouTube Video Placeholder<br />(Embed video here later)</p>
            </div>
        </section>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <DocumentationGallery />
                <VideoTutorial />
            </main>
        </Layout>
    );
}
