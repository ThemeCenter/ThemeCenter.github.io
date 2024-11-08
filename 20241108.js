const fs = require('fs');
const path = require('path');

const folderPath = './Wallpapers'; // 文件夹路径

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const imgList = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');

  fs.writeFile('./img.json', JSON.stringify(imgList, null, 2), (err) => {
    if (err) {
      console.error('Error writing img.json:', err);
      return;
    }
    console.log('Image list saved to img.json');
  });
});