import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const images = [
    'img/landingpage1.png',
    'img/landingpage2.png',
    'img/landingpage3.png',
    'img/landingpage4.png',
    'img/landingpage5.png',
    'img/landingpage6.png',
    'img/landingpage7.png',
    'img/landingpage8.png',
    'img/landingpage9.png',
];

export default function Carousel(): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carouselContainer}>
            <img
                src={useBaseUrl(images[currentIndex])}
                alt={`Slide ${currentIndex + 1}`}
                className={styles.carouselImage}
            />
            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                ❮
            </button>
            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextSlide}
                aria-label="Next Slide"
            >
                ❯
            </button>
            <div className={styles.indicators}>
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles.indicator} ${idx === currentIndex ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
