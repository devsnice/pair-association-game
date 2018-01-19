import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  startGameRequest,
  selectCard,
  changeGameStatus,
  closeGameSplasher
} from './model/gameReducer';

import gameStatuses from './utils/gameStatuses';

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
      userPairsIds: PropTypes.array.isRequired
    }),
    startGameRequest: PropTypes.func.isRequired,
    changeGameStatus: PropTypes.func.isRequired,
    closeGameSplasher: PropTypes.func.isRequired,
    selectCard: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.handleStartGame();
  }

  handleStartGame = () => {
    this.props.startGameRequest({
      mode: 'default'
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
          userPairsIds={game.userPairsIds}
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
  startGameRequest,
  selectCard,
  changeGameStatus,
  closeGameSplasher
})(Game);
