const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// 이미지 경로 목록
// const imagePaths = ["1-original.jpg", "1-original.jpg"];
const imagePaths = ["01.jpeg", "04.jpeg", "03.jpeg"];

// 리사이즈할 크기 설정
const outputWidth = 1024;
const outputHeight = 1024;

// 이미지를 리사이즈하면서 비율 유지
async function resizeImage(imagePath, outputWidth, outputHeight) {
  const metadata = await sharp(imagePath).metadata();
  const aspectRatio = metadata.width / metadata.height;

  let width = outputWidth;
  let height = outputHeight;

  if (aspectRatio > 1) {
    // 가로가 긴 이미지 (Landscape)
    height = Math.round(outputWidth / aspectRatio);
  } else {
    // 세로가 긴 이미지 (Portrait)
    width = Math.round(outputHeight * aspectRatio);
  }

  return sharp(imagePath).resize(width, height).toBuffer();
}

// 여러 이미지를 하나로 합치는 함수
async function combineImages(imagePaths, outputWidth, outputHeight) {
  const resizedImages = await Promise.all(
    imagePaths.map((imagePath) => resizeImage(imagePath, outputWidth, outputHeight))
  );

  const compositeImages = resizedImages.map((image, index) => ({
    input: image,
    left: outputWidth * index,
    top: 0,
  }));

  const canvas = sharp({
    create: {
      width: outputWidth * imagePaths.length,
      height: outputHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  });

  return canvas.composite(compositeImages).png().toBuffer(); // PNG 포맷으로 결과를 반환
}

// 실행 예제
combineImages(imagePaths, outputWidth, outputHeight)
  .then((buffer) => {
    fs.writeFileSync("combined_image.png", buffer);
    console.log("Combined image saved as combined_image.png");
  })
  .catch((err) => {
    console.error("Error combining images:", err);
  });
