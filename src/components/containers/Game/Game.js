import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { startGame, selectCard } from './model/gameReducer';
import { maxScore } from './config';

import GameField from './GameField/GameField';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const GameBar = styled.div`
  height: 150px;
`;

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
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

  render() {
    const { game, selectCard } = this.props;

    return (
      <Wrapper>
        <GameField handleSelectCard={selectCard} />
        <GameBar>
          {game.score} / {game.maxScore}
        </GameBar>
      </Wrapper>
    );
  }
}

export default connect(state => ({ game: state.game }), {
  startGame,
  selectCard
})(Game);
