import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #088ff5, #854dc2);
  color: #fff;
  height: 100px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  font-size: 48px;
  line-height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
`;

class GameBar extends Component {
  static propTypes = {
    score: PropTypes.string.isRequired,
    maxScore: PropTypes.string.isRequired
  };

  render() {
    const { score, maxScore } = this.props;

    return (
      <Wrapper>
        {score} / {maxScore}
      </Wrapper>
    );
  }
}

export default GameBar;
