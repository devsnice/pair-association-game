import React, { Component } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  position: relative;
  float: left;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const Card = styled.div`
  background-image: ${props => `url("${props.image}")`};
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background-size: cover;
`;

const CardSelected = styled.div`
  background: ${props => props.isSelected && 'rgba(0, 0, 0, 0.65)'};
  border: ${props => props.isSelected && '2px solid rgba(255, 255, 255, 0.65)'};
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
`;

const GameCard = params => {
  return (
    <CardWrapper
      width={params.width}
      height={params.height}
      onClick={() => {
        params.handleClick(params.id);
      }}
    >
      <Card width={params.width} height={params.height} image={params.image} />
      <CardSelected isSelected={params.isSelected} />
    </CardWrapper>
  );
};

export default GameCard;
