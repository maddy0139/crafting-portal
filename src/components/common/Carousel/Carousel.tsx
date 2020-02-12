import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import image1 from '../../../assets/images/image-1.png';
import image2 from '../../../assets/images/image-5.png';

export default class CarouselComponents extends React.Component<{},{}>{
    constructor(props:{}){
        super(props);
        this.state = {

        };
    }

    render() {
        return(
                <Carousel className="home_page_banner">
                    <Carousel.Item>
                        <img src={image1} className="d-block w-100" alt="banner" style={{height:'300px'}}/>
                        <Carousel.Caption>
                            <h3>First Slide</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image2} className="d-block w-100" alt="banner" style={{height:'300px'}}/>
                        <Carousel.Caption>
                            <h3>Second Slide</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
        );
    }

}