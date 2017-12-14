import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box, Flex } from 'grid-styled';
import { Title, Description, Button } from '../GameSplashersUnits';

class GameEndSplasher extends Component {
  static propTypes = {
    handleStartGame: PropTypes.func.isRequired
  };

  render() {
    const { combo, msg, handleStartGame } = this.props;

    return (
      <Flex align="center" column>
        <Box width="520px" mt="30px">
          <Title>It's the end!</Title>

          <Description>
            <p>You're win</p>
          </Description>

          <Flex justify="flex-end">
            <Button onClick={handleStartGame}>Repeat game</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default GameEndSplasher;
