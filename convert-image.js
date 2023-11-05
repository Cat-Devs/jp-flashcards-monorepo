const fs = require('fs');

function convertImageToBase64(imagePath) {
  const image = fs.readFileSync(imagePath);
  // eslint-disable-next-line no-undef
  const base64Image = Buffer.from(image).toString('base64');
  return base64Image;
}

(async () => {
  try {
    fs.unlinkSync('assets/images.json');
  } catch (_err) {
    console.log('images.json does not exist');
  }
  fs.appendFileSync('assets/images.json', '{\n');
  fs.readdirSync('_images').forEach((file, index, tot) => {
    const base64Image = convertImageToBase64(`_images/${file}`);
    if (index === tot.length - 1) {
      fs.appendFileSync('assets/images.json', `"${file}":"data:image/png;base64,${base64Image}"\n`);
    } else {
      fs.appendFileSync(
        'assets/images.json',
        `"${file}":"data:image/png;base64,${base64Image}",\n`,
      );
    }
  });

  fs.appendFileSync('assets/images.json', '}');
})();
