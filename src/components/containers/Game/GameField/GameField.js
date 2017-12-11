import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
`;

const CardWrapper = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  float: left;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const Card = params => {
  return (
    <CardWrapper
      onClick={() => {
        params.handleClick(params.id);
      }}
      width={params.width}
      height={params.height}
    >
      {params.id}
    </CardWrapper>
  );
};

class GameField extends Component {
  static propTypes = {
    handleSelectCard: PropTypes.func.isRequired
  };

  createCards = ({ amountImages, cardWidth, cardHeight }) => {
    const images = [];

    for (let i = 0; i < amountImages; i++) {
      images.push(
        <Card
          width={cardWidth}
          height={cardHeight}
          id={i}
          key={i}
          handleClick={this.selectCard}
        />
      );
    }

    return images;
  };

  selectCard = id => {
    this.props.handleSelectCard(id);
  };

  // TODO: create smart field for elements
  createField = () => {
    const amountImages = 60;
    const { availHeight, availWidth } = window.screen;

    const amountInRow = 8;
    const amountInHeight = amountImages / amountInRow;

    const cardWidth = availWidth / amountInRow;
    const cardHeight = availHeight / amountInHeight;

    const images = this.createCards({
      amountImages,
      cardWidth,
      cardHeight
    });

    return images;
  };

  render() {
    return <Wrapper>{this.createField()}</Wrapper>;
  }
}

export default GameField;
