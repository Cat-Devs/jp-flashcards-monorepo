const { Buffer } = require('buffer');
const fs = require('fs');

const ASSETS_FOLDER = '_assets';
const ASSETS_JSON_OUTPUT = 'assets/images/images.json';

function convertImageToBase64(imagePath) {
  const image = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(image).toString('base64');
  return base64Image;
}

(async () => {
  try {
    fs.unlinkSync(ASSETS_JSON_OUTPUT);
  } catch (_err) {
    console.log('images.json does not exist');
  }
  console.log(`Generating ${ASSETS_JSON_OUTPUT}`);
  fs.appendFileSync(ASSETS_JSON_OUTPUT, '{\n');
  fs.readdirSync(ASSETS_FOLDER).forEach((file, index, tot) => {
    const base64Image = convertImageToBase64(`${ASSETS_FOLDER}/${file}`);
    console.log(`Adding ${file}`);
    if (index === tot.length - 1) {
      fs.appendFileSync(ASSETS_JSON_OUTPUT, `"${file}":"data:image/png;base64,${base64Image}"\n`);
    } else {
      fs.appendFileSync(ASSETS_JSON_OUTPUT, `"${file}":"data:image/png;base64,${base64Image}",\n`);
    }
  });

  fs.appendFileSync(ASSETS_JSON_OUTPUT, '}');
})();
