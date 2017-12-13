import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';
import { Title, Description, Button } from '../GameSplashersUnits';

class CorrectCombinationSplasher extends Component {
  render() {
    return (
      <Flex align="center" column>
        <Box width="520px" mt="60px">
          <Title>Correct combination!</Title>

          <Description>
            <p>
              Hey, it’s game for you! Open your eyes and try find out all
              assosiation on the page!
            </p>

            <p>Good game!</p>
          </Description>

          <Flex justify="flex-end">
            <Button>Continue</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default CorrectCombinationSplasher;
