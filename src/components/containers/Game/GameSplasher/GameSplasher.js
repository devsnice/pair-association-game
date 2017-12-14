import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from 'grid-styled';

import IntroductionSplasher from './IntroductionSplasher/IntroductionSplasher';
import CorrectCombinationSplasher from './CorrectCombinationSplasher/CorrectCombinationSplasher';
import WrongCombinationSplasher from './WrongCombinationSplasher/WrongCombinationSplasher';
import GameEndSplasher from './GameEndSplasher/GameEndSplasher';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(63, 112, 154, 0.91), #854dc2);
  color: #fff;
`;

class GameSplasher extends Component {
  static propTypes = {
    handleUserPassedIntro: PropTypes.func.isRequired,
    handleContinueGame: PropTypes.func.isRequired,
    handleStartGame: PropTypes.func.isRequired,
    type: PropTypes.string,
    data: PropTypes.object
  };

  static defaultProps = {
    type: null,
    data: {}
  };

  getContent = () => {
    const {
      type,
      data,
      handleUserPassedIntro,
      handleStartGame,
      handleContinueGame
    } = this.props;

    switch (type) {
      case 'introduction':
        return (
          <IntroductionSplasher
            handleUserPassedIntro={handleUserPassedIntro}
            {...data}
          />
        );
      case 'combinationCorrect':
        return (
          <CorrectCombinationSplasher
            handleContinueGame={handleContinueGame}
            {...data}
          />
        );
      case 'combinationWrong':
        return (
          <WrongCombinationSplasher
            handleContinueGame={handleContinueGame}
            {...data}
          />
        );
      case 'gameEnd':
        return <GameEndSplasher handleStartGame={handleStartGame} />;
      default:
        return null;
    }
  };

  render() {
    const content = this.getContent();

    if (!content) return null;

    return (
      <Wrapper justify="center" pt="150px">
        {content}
      </Wrapper>
    );
  }
}

export default GameSplasher;
