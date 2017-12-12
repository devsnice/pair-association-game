import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';

import { gameStatuses } from '../model/gameReducer';

import Introduction from './Introduction/Introduction';

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
    status: PropTypes.string.isRequired,
    handleUserGotIntro: PropTypes.func.isRequired
  };

  getSplasherContent = () => {
    const { status, handleUserGotIntro } = this.props;

    if (status === gameStatuses.intro) {
      return <Introduction handleUserGotIntro={handleUserGotIntro} />;
    }

    return null;
  };

  render() {
    const content = this.getSplasherContent();

    if (!content) return null;

    return (
      <Wrapper justify="center" pt="150px">
        {content}
      </Wrapper>
    );
  }
}

export default GameSplasher;
