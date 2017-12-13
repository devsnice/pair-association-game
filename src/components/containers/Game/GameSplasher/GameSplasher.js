import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from 'grid-styled';

import IntroductionSplasher from './IntroductionSplasher/IntroductionSplasher';
import CorrectCombinationSplasher from './CorrectCombinationSplasher/CorrectCombinationSplasher';

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
    type: PropTypes.string,
    handleUserPassedIntro: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: null
  };

  getContent = () => {
    const { type, handleUserPassedIntro } = this.props;

    switch (type) {
      case 'introduction':
        return (
          <IntroductionSplasher handleUserPassedIntro={handleUserPassedIntro} />
        );
      case 'combinationCorrect':
        return <CorrectCombinationSplasher />;
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
