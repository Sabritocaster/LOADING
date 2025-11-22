const fs = require('fs');
const path = require('path');

const memesDir = path.join(__dirname, 'memes');
const outputFile = path.join(__dirname, 'memes-list.json');

// Supported file extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext) || videoExtensions.includes(ext)) {
                fileList.push({
                    path: `memes/${file}`,
                    name: file,
                    type: imageExtensions.includes(ext) ? 'image' : 'video',
                    extension: ext
                });
            }
        }
    });
    
    return fileList;
}

try {
    const files = getAllFiles(memesDir);
    const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
    
    fs.writeFileSync(outputFile, JSON.stringify(sortedFiles, null, 2));
    console.log(`✅ Found ${sortedFiles.length} meme files`);
    console.log(`📝 Generated memes-list.json`);
    console.log(`\nFiles:`);
    sortedFiles.forEach(file => {
        console.log(`  - ${file.path} (${file.type})`);
    });
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}

