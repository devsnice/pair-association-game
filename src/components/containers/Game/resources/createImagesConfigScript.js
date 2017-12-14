const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, './images');
const imageRegexp = /(.png)|(.jpg)|(.jpeg)$/i;

const createFile = data => {
  fs.writeFileSync(path.join(__dirname, './imagesConfig.js'), data);
};

const createFileData = images => {
  let importStatements = '';
  let exportStatements = 'export default {\n';

  images.forEach((image, index) => {
    importStatements += `import image${index} from './images/${image}';\n`;
    exportStatements += `image${index}, `;
  });

  exportStatements += '}';

  return importStatements + exportStatements;
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
