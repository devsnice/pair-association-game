const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, './images');
const imageRegexp = /(.png)|(.jpg)|(.jpeg)$/i;

const createFile = data => {
  fs.writeFileSync(path.join(__dirname, './imagesConfig.js'), data);
};

const createFileData = images => {
  let importStatements = '';
  let exportImagesStatements = 'export const Images = [\n';
  let exportImagesTableStatements = 'export const ImagesTable = {';
  const exportDefaultStatement = 'export default Images\n';

  images.forEach((image, index) => {
    importStatements += `import image${index} from './images/${image}';\n`;
    exportImagesStatements += `{ image: image${index}, id: ${index}}, `;
    exportImagesTableStatements += `${index}: image${index}, `;
  });

  exportImagesStatements += '];\n';
  exportImagesTableStatements += '}\n';

  return (
    importStatements +
    exportImagesStatements +
    exportImagesTableStatements +
    exportDefaultStatement
  );
};

const createImagesConfigScript = () => {
  const files = fs.readdirSync(imagesDir);
  const images = files.filter(name => imageRegexp.test(name));

  if (images.length !== 0) {
    const data = createFileData(images);
    createFile(data);
  } else {
    throw new Error(`Add images in ${imagesDir} for build config for game`);
  }
};

createImagesConfigScript();

module.exports = createImagesConfigScript;
