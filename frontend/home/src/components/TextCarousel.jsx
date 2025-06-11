import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const messages = [
  'Connect with top recruiters',
  'Track every interview effortlessly',
  'Boost your chances with analytics',
];

const TextCarousel = () => {
  const containerRef = useRef();
  const itemRef = useRef();
  const [lineHeight, setLineHeight] = useState(0);
  const [index, setIndex] = useState(0);

  const extendedMessages = [...messages, messages[0]]; // Add clone of first

  useEffect(() => {
    if (itemRef.current) {
      setLineHeight(itemRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (lineHeight === 0) return;

    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1;

        if (next === messages.length + 1) return prev; // prevent overflow
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lineHeight]);

  useEffect(() => {
    if (lineHeight === 0) return;

    // Animate scroll
    gsap.to(containerRef.current, {
      y: -index * lineHeight,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (index === messages.length) {
          // Jump instantly to start (index 0) with no animation
          gsap.set(containerRef.current, { y: 0 });
          setIndex(0);
        }
      },
    });
  }, [index, lineHeight]);

  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${lineHeight}px`,
        width: 'fit-content',
        position: 'relative',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {extendedMessages.map((msg, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? itemRef : null}
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              padding: '0 1rem',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
