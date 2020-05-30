/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import CarouselSlide from './CarouselSlide.jsx';
import {
  CarouselSlides, ThumbnailContainer, Thumbnail,
} from '../StyledComponents.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      selected: {},
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(target) {
    this.setState({ selected: target });
  }

  render() {
    if (Object.keys(this.state.selected).length === 0 && this.props.media.images[0]) {
      const item = { image: this.props.media.images[0] };
      this.setState({ selected: item });
    }

    return (
      <div>
        <CarouselSlide selected={this.state.selected} />
        <CarouselSlides>
          {this.props.media.video.map((video, index) => (
            <li key={index}>
              <ThumbnailContainer>
                <Thumbnail src={video.thumbnail} alt="game trailer" onClick={() => { this.clickHandler({ video }); }} />
              </ThumbnailContainer>
            </li>
          ))}
          {this.props.media.images.map((image, index) => (
            <li key={index}>
              <ThumbnailContainer>
                <Thumbnail src={image} alt="screenshot of game" onClick={() => { this.clickHandler({ image }); }} />
              </ThumbnailContainer>
            </li>
          ))}
        </CarouselSlides>
      </div>
    );
  }
}

export default Carousel;
