import React, { Component } from 'react';
import styled from 'styled-components';

const cardsInRow = 5;
const cardsInHeight = 4;
const cardsWidthSize = `${100 / cardsInRow}%`;
const cardsHeightSize = `${100 / cardsInHeight}%`;

const CardWrapper = styled.div`
  width: ${cardsWidthSize};
  height: ${cardsHeightSize};
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
`;

const Card = styled.div`
  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background-size: cover;
`;

const CardSelected = styled.div`
  background: ${props => (props.isSelected ? 'rgba(0, 0, 0, 0)' : '#088ff5')};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.isSelected ? '#088ff5' : '#854dc2')};
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  transition: 0.2s all ease;
`;

const GameCard = params => {
  return (
    <CardWrapper
      onClick={() => {
        params.handleClick({ id: params.id, pairId: params.pairId });
      }}
    >
      <Card image={params.image} />
      <CardSelected isSelected={params.isSelected} />
    </CardWrapper>
  );
};

export default GameCard;
