const config = require('./config');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// 输入图片路径
const inputPath = './Icon-App-1024x1024@1x.png';

async function generateIcons() {
  // 输出目录
  const outputDir = './output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  for (let image of config.images) {
    const scale = parseInt(image.scale.replace('x', ''));
    const size = parseFloat(image.size.split('x')[1]);
    const outputPath = path.join(
      outputDir,
      `Icon-App-${size}x${size}@${scale}x.png`
    );
    await sharp(inputPath)
      .resize(size * scale, size * scale, {kernel: 'lanczos3'})
      .png()
      .toFile(outputPath);
  }
}
generateIcons();
