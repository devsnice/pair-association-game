import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameCard from './GameCard/GameCard';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  padding: 24px;
  box-sizing: border-box;
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

  createCards = () => {
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
    const cards = this.createCards();

    return cards;
  };

  selectCard = ({ id, pairId }) => {
    this.props.handleSelectCard({ id, pairId });
  };

  render() {
    return <Wrapper>{this.createField()}</Wrapper>;
  }
}

export default GameField;
