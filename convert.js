const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png'));

async function convert() {
    for (const file of files) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));
        console.log(`Converting ${file} to WebP...`);
        try {
            await sharp(inputPath)
                .resize(800)
                .webp({ quality: 60 })
                .toFile(outputPath);
            console.log(`Created ${outputPath}`);
            const stats = fs.statSync(outputPath);
            console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
}

convert();
