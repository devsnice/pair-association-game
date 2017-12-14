import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameCard from './GameCard/GameCard';

import Images from '../resources/imagesConfig';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
`;

class GameField extends Component {
  static propTypes = {
    handleSelectCard: PropTypes.func.isRequired,
    selectedCards: PropTypes.array
  };

  static defaultProps = {
    selectedCards: []
  };

  // TODO: get image should be a random process
  createCards = ({ amountImages, cardWidth, cardHeight }) => {
    const { selectedCards } = this.props;

    const images = [];

    for (let i = 0; i < amountImages; i++) {
      const isSelected = selectedCards.includes(i);

      images.push(
        <GameCard
          width={cardWidth}
          height={cardHeight}
          id={i}
          key={i}
          image={Images[`image${i}`]}
          handleClick={this.selectCard}
          isSelected={isSelected}
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
    const amountImages = Object.keys(Images).length;
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
