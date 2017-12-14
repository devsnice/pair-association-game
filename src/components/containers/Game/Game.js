import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  startGame,
  selectCard,
  changeGameStatus,
  closeGameSplasher,
  gameStatuses
} from './model/gameReducer';

import { maxScore } from './config';
import Images from './resources/imagesConfig';

import GameField from './GameField/GameField';
import GameBar from './GameBar/GameBar';
import GameSplasher from './GameSplasher/GameSplasher';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      status: PropTypes.string,
      score: PropTypes.number.isRequired,
      maxScore: PropTypes.number.isRequired,
      selectedCards: PropTypes.array.isRequired,
      userCombos: PropTypes.array.isRequired
    })
  };

  componentDidMount() {
    this.handleStartGame();
  }

  getImagesForGame = () => {
    let inputImages = [...Images];
    const outputImages = [];

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    while (inputImages.length > 0) {
      const randomNumber = getRandomInt(0, inputImages.length);

      for (
        let i = 0;
        i <= randomNumber && inputImages.length;
        i += randomNumber
      ) {
        outputImages.push(inputImages[i]);

        inputImages = [
          ...inputImages.slice(0, i),
          ...inputImages.slice(i + 1, inputImages.length)
        ];
      }
    }

    return outputImages;
  };

  handleStartGame = () => {
    this.props.startGame({
      maxScore,
      startGameTime: new Date(),
      images: this.getImagesForGame()
    });
  };

  handleUserPassedIntro = () => {
    this.props.changeGameStatus(gameStatuses.playing);
  };

  handleContinueGame = () => {
    this.props.closeGameSplasher();
  };

  // TODO:: images -> cards rename
  // TODO:: add animation for gameBar
  render() {
    const { game, selectCard } = this.props;

    return (
      <Wrapper>
        <GameField
          handleSelectCard={selectCard}
          images={game.images}
          selectedCards={game.selectedCards}
        />

        {game.status !== 'intro' && (
          <GameBar score={game.score} maxScore={game.maxScore} />
        )}

        <GameSplasher
          type={game.splasherType}
          data={game.splasherData}
          handleUserPassedIntro={this.handleUserPassedIntro}
          handleStartGame={this.handleStartGame}
          handleContinueGame={this.handleContinueGame}
        />
      </Wrapper>
    );
  }
}

export default connect(state => ({ game: state.game }), {
  startGame,
  selectCard,
  changeGameStatus,
  closeGameSplasher
})(Game);
