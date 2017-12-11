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
  position: relative;
`;

const GameBar = styled.div`
  height: 75px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
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

  render() {
    const { game, selectCard } = this.props;

    return (
      <Wrapper>
        <GameField handleSelectCard={selectCard} />
        <GameBar>
          {game.score} / {game.maxScore}
          <div>{game.status}</div>
        </GameBar>
      </Wrapper>
    );
  }
}

export default connect(state => ({ game: state.game }), {
  startGame,
  selectCard
})(Game);
