import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import './hero.css';

import category1 from '../media/category-1.jpg';
import category2 from '../media/category-2.jpg';

export default function Hero() {
  useEffect(() => {
    const glide = new Glide('#glide_1', {
      type: 'carousel',
      startAt: 0,
      autoplay: 2000,
      gap: 0,
      hoverpause: true,
      perView: 1,
      animationDuration: 800,
      animationTimingFunc: 'linear',
    });

    glide.mount();

    return () => glide.destroy();
  }, []);

  return (
    <div className="hero">
      <div className="glide" id="glide_1">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <div className="center">
                <div className="left">
                  <span>New Inspiration 2024</span>
                  <h1>New Collection</h1>
                  <p>Trending from men's and women's style collections</p>
                  <a href="/shopttems" className="hero-btn">Shop Now</a>
                </div>
                <div className="right">
                  <img src={category1} className="img1" alt="hero" />
                </div>
              </div>
            </li>
            <li className="glide__slide">
              <div className="center">
                <div className="left">
                  <span>New Inspiration 2024</span>
                  <h1>New Collection</h1>
                  <p>Trending from men's and women's style collections</p>
                  <a href="/shopItems" className="hero-btn">Shop Now</a>
                </div>
                <div className="right">
                  <img src={category2} className="img2" alt="hero" />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="glide__arrows" data-glide-el="controls">
          <button className=" glide__arrow--left" data-glide-dir="<"></button>
          <button className=" glide__arrow--right" data-glide-dir=">"></button>
        </div>

        <div className="glide__bullets" data-glide-el="controls[nav]">
          <button className="glide__bullet" data-glide-dir="=0"></button>
          <button className="glide__bullet" data-glide-dir="=1"></button>
        </div>
      </div>
    </div>
  );
};
