const shuffleImages = (images = []) => {
  let inputImages = [...images];
  const shuffledImages = [];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  while (inputImages.length > 0) {
    const randomNumber = getRandomInt(0, inputImages.length);

    for (
      let i = 0;
      i <= randomNumber && i < inputImages.length;
      i += randomNumber
    ) {
      shuffledImages.push(inputImages[i]);

      inputImages = [
        ...inputImages.slice(0, i),
        ...inputImages.slice(i + 1, inputImages.length)
      ];
    }
  }

  return shuffledImages;
};

const getPairsImagesForGame = (images = []) => {
  const preparedImages = [...images, ...images].map((image, index) => {
    return {
      ...image,
      id: index,
      pairId: image.id
    };
  });

  return preparedImages;
};

export const getShuffledImagePairsForGame = (images = []) => {
  const pairsImages = getPairsImagesForGame(images);
  const shuffledImages = shuffleImages(pairsImages);

  return shuffledImages;
};
