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

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset touch end
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={styles.carouselContainer}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={useBaseUrl(img)}
                        alt={`Slide ${idx + 1}`}
                        className={styles.carouselImage}
                    />
                ))}
            </div>

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
