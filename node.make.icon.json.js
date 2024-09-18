const fs = require('fs');
const path = require('path');
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
            tree.list.push({ name: filePath +"&price=" +   (priceMap[filePath] || 1) });
        }
    });

    return tree;
} 

fs.writeFile('icons.list.json', JSON.stringify(buildTree('./icons'), null, 2).replace(/\\\\/g, '/'), (err) => {
    console.log('JSON data has been written to personal_info.json');
});


/*
fs.writeFile('price.json', JSON.stringify(priceMap, null, 2).replace(/\\\\/g, '/'), (err) => {
    console.log('JSON data has been written to personal_info.json');
});

1. 读到 ini 文件 给文件夹 添加作者说明 
2. 有 svg 时 给一个 标识 
*/