const fs = require('fs');
const path = require('path');

function scanFolder(folderPath) {
  let imageList = [];

  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    if (file === '.git') {
      // 如果是 .git 文件夹，则跳过
      return;
    }

    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      imageList = imageList.concat(scanFolder(filePath));
    } else {
      if (file.match(/\.(jpg|jpeg|png|gif)$/)) { // 可根据需求添加更多图片格式
        imageList.push(filePath);
      }
    }
  });
  imageList = imageList.map(e=>e.replace("\\","/"))
  return imageList;
}
  
fs.writeFileSync('./img.list.json', JSON.stringify(scanFolder('./'), null, 2));
console.log('JSON file has been created successfully.');