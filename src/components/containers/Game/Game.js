import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  startGame,
  selectCard,
  changeGameStatus,
  gameStatuses
} from './model/gameReducer';
import { maxScore } from './config';

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
    this.props.startGame({
      maxScore,
      startGameTime: new Date()
    });
  }

  handleUserPassedIntro = () => {
    this.props.changeGameStatus(gameStatuses.playing);
  };

  // TODO:: added animation for gameBar
  render() {
    const { game, selectCard } = this.props;

    return (
      <Wrapper>
        <GameField handleSelectCard={selectCard} />

        {game.status !== 'intro' && (
          <GameBar score={game.score} maxScore={game.maxScore} />
        )}

        <GameSplasher
          type={game.splasherType}
          handleUserPassedIntro={this.handleUserPassedIntro}
        />
      </Wrapper>
    );
  }
}

export default connect(state => ({ game: state.game }), {
  startGame,
  selectCard,
  changeGameStatus
})(Game);
