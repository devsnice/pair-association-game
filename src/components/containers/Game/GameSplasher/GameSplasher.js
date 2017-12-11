import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { gameStatuses } from '../model/gameReducer';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
`;

class GameSplasher extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    handleUserGotIntro: PropTypes.func.isRequired
  };

  render() {
    const { status } = this.props;

    if (status === gameStatuses.intro) {
      return (
        <Wrapper>
          <div>
            It's game introduction, user should read instructions for continuing
            the game
          </div>

          <div>
            <button onClick={this.props.handleUserGotIntro}>I got it</button>
          </div>
        </Wrapper>
      );
    }

    return null;
  }
}

export default GameSplasher;
