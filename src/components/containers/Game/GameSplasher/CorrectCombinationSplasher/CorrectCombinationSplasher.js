import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';
import { Title, Description, Button } from '../GameSplashersUnits';

import { ImagesTable } from '../../resources/imagesConfig';

const CardWrapper = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background: ${props => `url("${props.image}")`};
  background-size: cover;
`;

class CorrectCombinationSplasher extends Component {
  static propTypes = {
    handleContinueGame: PropTypes.func.isRequired,
    combo: PropTypes.array.isRequired,
    msg: PropTypes.string
  };

  static defaultProps = {
    msg: "You're right!"
  };

  // TODO::add animation
  render() {
    const { combo, msg, handleContinueGame } = this.props;

    return (
      <Flex align="center" column>
        <Flex justify="space-between" width="950px">
          <CardWrapper image={ImagesTable[combo[0]]} width="460" height="240" />
          <CardWrapper image={ImagesTable[combo[1]]} width="460" height="240" />
        </Flex>

        <Box width="520px" mt="30px">
          <Title>Correct combination!</Title>

          <Description>
            <p>{msg}</p>
          </Description>

          <Flex justify="flex-end">
            <Button onClick={handleContinueGame}>Сontinue</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default CorrectCombinationSplasher;
