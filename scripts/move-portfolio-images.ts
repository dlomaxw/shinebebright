
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\f3a978a5-abd3-48f5-b266-f4010a120341';
const destDir = 'c:\\Users\\LENOVO\\Documents\\bright\\App\\www.shinebebright.com\\client\\public\\images\\portfolio';

const mappings = [
    { src: 'uploaded_image_0_1767449918276.png', dest: 'Acorns International School.png' },
    { src: 'uploaded_image_1_1767449918276.png', dest: 'Kings Sports Bet.png' },
    { src: 'uploaded_image_2_1767449918276.png', dest: 'Frozen Basket.png' },
    { src: 'uploaded_image_3_1767449918276.jpg', dest: 'Pearl Marina.jpg' }
];

if (!fs.existsSync(destDir)) {
    console.log("Dest dir does not exist!");
    process.exit(1);
}

mappings.forEach(m => {
    const srcPath = path.join(sourceDir, m.src);
    const destPath = path.join(destDir, m.dest);

    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${m.src} -> ${m.dest}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    } catch (e) {
        console.error(`Error copying ${m.src}:`, e);
    }
});
