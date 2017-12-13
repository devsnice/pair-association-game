import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box, Flex } from 'grid-styled';
import { Title, Description, Button } from '../GameSplashersUnits';

import introHeader from './introHeader.png';

class IntroductionSplasher extends Component {
  static propTypes = {
    handleUserPassedIntro: PropTypes.func.isRequired
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
            <Button onClick={this.props.handleUserPassedIntro}>
              Start game
            </Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default IntroductionSplasher;
