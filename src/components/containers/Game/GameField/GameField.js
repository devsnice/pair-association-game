import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameCard from './GameCard/GameCard';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
`;

class GameField extends Component {
  static propTypes = {
    handleSelectCard: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    selectedCards: PropTypes.array
  };

  static defaultProps = {
    selectedCards: []
  };

  createCards = ({ amountImages, cardWidth, cardHeight }) => {
    const { selectedCards, images } = this.props;

    const cards = images.map((image, id) => {
      const isSelected = selectedCards.includes(id);

      return (
        <GameCard
          width={cardWidth}
          height={cardHeight}
          id={id}
          key={id}
          image={image}
          handleClick={this.selectCard}
          isSelected={isSelected}
        />
      );
    });

    return cards;
  };

  selectCard = id => {
    this.props.handleSelectCard(id);
  };

  // TODO: create smart field for elements
  createField = () => {
    const amountImages = Object.keys(this.props.images).length;
    const { availHeight, availWidth } = window.screen;

    const amountInRow = 9;
    const amountInHeight = amountImages / amountInRow;

    const cardWidth = availWidth / amountInRow;
    const cardHeight = (availHeight - 100) / amountInHeight;

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
