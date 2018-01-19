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
    userPairsIds: PropTypes.array.isRequired,
    selectedCards: PropTypes.array
  };

  static defaultProps = {
    selectedCards: []
  };

  createCards = ({ amountImages, cardWidth, cardHeight }) => {
    const { userPairsIds, selectedCards, images } = this.props;

    const cards = images.map(card => {
      const isSelected =
        userPairsIds.includes(card.pairId) ||
        selectedCards.find(selectedCard => {
          return (
            selectedCard.cardId === card.id &&
            selectedCard.pairId === card.pairId
          );
        });

      return (
        <GameCard
          width={cardWidth}
          height={cardHeight}
          id={card.id}
          pairId={card.pairId}
          key={card.id}
          image={card.image}
          handleClick={this.selectCard}
          isSelected={isSelected}
        />
      );
    });

    return cards;
  };

  // TODO: create smart field for elements
  createField = () => {
    const amountImages = this.props.images.length;
    const { availHeight, availWidth } = window.screen;

    const amountInRow = 4;
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

  selectCard = ({ id, pairId }) => {
    this.props.handleSelectCard({ id, pairId });
  };

  render() {
    return <Wrapper>{this.createField()}</Wrapper>;
  }
}

export default GameField;
