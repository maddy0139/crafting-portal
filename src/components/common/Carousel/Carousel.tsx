import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../../assets/images/gifts.jpg';
import image2 from '../../../assets/images/gift.jpg';

export default class CarouselComponents extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Carousel className="home_page_banner">
        <Carousel.Item>
          <img
            src={image1}
            className="d-block w-100"
            alt="banner"
          />
          <Carousel.Caption>
            <h3></h3>
            <p>Gifts that makes a difference</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image2}
            className="d-block w-100"
            alt="banner"
          />
          <Carousel.Caption>
          <h3></h3>
            <p>Give your loved ones a perfect Gift</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
