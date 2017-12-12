import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';

import introHeader from './introHeader.png';

const Title = styled.h1`
  letter-spacing: 1px;
`;

const Description = styled.div`
  font-size: 18px;
  font-weight: 300;
`;

const Button = styled(Box)`
  font-size: 24px;
  letter-spacing: 0.8;
  cursor: pointer;
`;

class Introduction extends Component {
  static propTypes = {
    handleUserGotIntro: PropTypes.func.isRequired
  };

  render() {
    return (
      <Flex align="center" column>
        <img width="700px" src={introHeader} alt="game introduction header" />

        <Box width="520px" mt="60px">
          <Title>Introduction</Title>

          <Description>
            <p>
              Hey, it’s game for you! Open your eyes and try find out all
              assosiation on the page!
            </p>

            <p>Good game!</p>
          </Description>

          <Flex justify="flex-end">
            <Button onClick={this.props.handleUserGotIntro}>Start game</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default Introduction;
