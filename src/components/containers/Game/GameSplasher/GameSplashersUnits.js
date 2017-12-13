import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

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

export { Title, Description, Button };
