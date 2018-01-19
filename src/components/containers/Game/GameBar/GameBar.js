import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  padding: 24px 16px;
  height: 100%;
  font-weight: 400;
  font-size: 48px;
  text-align: center;
  width: 240px;
`;

class GameBar extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    maxScore: PropTypes.number.isRequired
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
