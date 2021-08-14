import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { useRouter } from 'next/router';

import classes from './Carousel.module.css';

import Button from './Button';

const Carousel = props => {
  const router = useRouter();
  const images = ['/images/carousel_one.png', '/images/carousel_two.png'];
  const arrows = {
    arrowLeft: '/images/arrow-left.svg',
    arrowRight: '/images/arrow-right.svg'
  };
  const callsToAction = [
    {
      hero: 'Easy first term airman processing',
      subtext: 'New to Joint Base Andrews?',
      button: 'In-Process',
      href: '/dorms/processing'
    },
    {
      hero: 'Hassle free work order process',
      subtext: 'Having issues with your dorm?',
      button: 'Get it fixed',
      href: '/dorms/work-orders'
    }
  ];
  const [index, setIndex] = useState(0);

  const transition = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 }
  });

  const mod = (n, m) => ((n % m) + m) % m;

  const nextSlide = () => {
    setIndex(state => mod(state + 1, images.length));
  };

  const prevSlide = () => {
    setIndex(state => mod(state - 1, images.length));
  };

  useEffect(() => {
    const t = setInterval(
      () => setIndex(state => (state + 1) % images.length),
      10000
    );
    return () => clearTimeout(t);
  }, []);

  const handleClickLink = href => {
    router.push(href);
  };

  return (
    <div className={classes.carousel} id="carousel">
      {transition((style, i) => (
        <animated.div
          style={{
            ...style
          }}
        >
          <img alt="" className={classes.image} src={images[i]} />
          <div className={classes.controller}>
            <div className={classes['arrow-left']}>
              <img alt="Previous" onClick={prevSlide} src={arrows.arrowLeft} />
            </div>
            <div className={classes['call-to-action']}>
              <h1>{callsToAction[i].hero}</h1>
              <h3>{callsToAction[i].subtext}</h3>
              <Button
                className={classes.button}
                onClick={() => handleClickLink(callsToAction[i].href)}
                type="button"
              >
                {callsToAction[i].button}
              </Button>
            </div>
            <div className={classes['arrow-right']}>
              <img alt="Next" onClick={nextSlide} src={arrows.arrowRight} />
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default Carousel;
