import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../';
import classes from './Carousel.module.css';

const Carousel = () => {
  const router = useRouter();
  const images = [
    '/images/carousel_one.png',
    '/images/carousel_two.png',
    '/images/carousel_three.png',
    '/images/carousel_four.png'
  ];
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
    },
    {
      hero: 'Dual airmen dorms with kitchinette',
      subtext: 'Want to see your future home?',
      button: 'See Rooms',
      href: '/dorms/rooms'
    },
    {
      hero: 'Have a question?',
      subtext: 'We have answers.',
      button: 'View our FAQ',
      href: '/dorms/faq'
    }
  ];
  const [index, setIndex] = useState(0);

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
  }, [index, images.length]);

  const handleClickLink = href => {
    router.push(href);
  };

  return (
    <div className={classes.carousel} id="carousel">
      <img alt="" className={classes.image} src={images[index]} />
      <div className={classes.controller}>
        <div className={classes['arrow-left']}>
          <img alt="Previous" onClick={prevSlide} src={arrows.arrowLeft} />
        </div>
        <div className={classes['call-to-action']}>
          <h1>{callsToAction[index].hero}</h1>
          <h3>{callsToAction[index].subtext}</h3>
          <Button
            className={classes.button}
            onClick={() => handleClickLink(callsToAction[index].href)}
            type="button"
          >
            {callsToAction[index].button}
          </Button>
        </div>
        <div className={classes['arrow-right']}>
          <img alt="Next" onClick={nextSlide} src={arrows.arrowRight} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
