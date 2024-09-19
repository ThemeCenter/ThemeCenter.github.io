const fs = require('fs');
const path = require('path');

//const path = require('path');
var priceMap = {}
function buildTree(folderPath) {
    const stats = fs.statSync(folderPath);
    if (!stats.isDirectory()) {
        return null;
    }

    const files = fs.readdirSync(folderPath);
    const tree = {
        name: path.basename(folderPath),
        list: []
    };

    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory() && file!=='node_modules' && file!=='.git' && file!=='.vs') {
            const subtree = buildTree(filePath);
            if (subtree) { tree.list.push(subtree);}
        } else {
            if(!priceMap[filePath]){
                priceMap[filePath] = 1
            } 
            tree.list.push({   url:filePath,  name: file.replace(/\.[^.]+$/, ''),price:    (priceMap[filePath] || 1) });
        }
    });

    return tree;
}

const folderPath = './icons'; // 替换为你要遍历的目录路径
const tree = buildTree(folderPath);

console.log(tree);
fs.writeFile('icons.list.json', JSON.stringify(tree, null, 2).replace(/\\\\/g, '/'), (err) => {
    console.log('JSON data has been written to personal_info.json');
});
//fs.writeFile('price.json', JSON.stringify(priceMap, null, 2).replace(/\\\\/g, '/'), (err) => {
  //  console.log('JSON data has been written to personal_info.json');
//});