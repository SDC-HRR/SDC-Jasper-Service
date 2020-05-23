/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import Carousel from './components/Carousel.jsx';
import Summary from './components/Summary.jsx';
import TagOverlay from './components/TagOverlay.jsx';
import Navbar from './components/Navbar.jsx';
import {
  GlobalStyle, MediaBackground, MediaTitle, MediaFilepath,
  MediaFilepathLink, Button, Grid1, MediaHighlights, Grid2, GameTitle,
} from './StyledComponents.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        summary: {
          title: '',
          splash: '',
          description: '',
          reviews: { general: '', total: 0 },
          releaseDate: '',
          developer: '',
          publisher: '',
          tags: [],
        },
        media: {
          video: [],
          images: [],
        },
      },
      overlay: false,
    };
    this.overlayHandler = this.overlayHandler.bind(this);
  }

  componentDidMount() {
    const url = window.location.search;
    const id = url.substring(2);
    axios.get('/media', {
      params: {
        proxyId: id,
      },
    })
      .then((result) => {
        console.log(result);
        this.setState({
          game: result.data[0],
        });
      });
  }

  overlayHandler() {
    const change = !this.state.overlay;
    this.setState({ overlay: change });
  }

  render() {
    const { game } = this.state;
    const { title } = game.summary;
    return (
      <MediaBackground>
        <>
          <GlobalStyle />
        </>
        <Navbar />
        <MediaTitle>
          <MediaFilepath>
            <MediaFilepathLink href="">All Games</MediaFilepathLink>
            &nbsp;&gt;&nbsp;
            <MediaFilepathLink href="">Action Games</MediaFilepathLink>
            &nbsp;&gt;&nbsp;
            <MediaFilepathLink href="">{title}</MediaFilepathLink>
          </MediaFilepath>
          <GameTitle>{title}</GameTitle>
          <Button type="button">Community Hub</Button>
        </MediaTitle>
        <Grid1>
          <span />
          <MediaHighlights>
            <Grid2>
              <span><Carousel media={game.media} /></span>
              <span><Summary details={game.summary} overlayHandler={this.overlayHandler} /></span>
            </Grid2>
          </MediaHighlights>
          <span />
          {this.state.overlay
          && (<TagOverlay tags={game.summary.tags} overlayHandler={this.overlayHandler} />)}
        </Grid1>
      </MediaBackground>

    );
  }
}

export default App;
