import * as THREE from 'three';

const width = 768;
const height = 384;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

function hash(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function noise(x: number, y: number, period: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = smooth(x - x0);
  const fy = smooth(y - y0);
  const sample = (dx: number, dy: number) =>
    hash((((x0 + dx) % period) + period) % period, y0 + dy);
  const low = sample(0, 0) * (1 - fx) + sample(1, 0) * fx;
  const high = sample(0, 1) * (1 - fx) + sample(1, 1) * fx;
  return low * (1 - fy) + high * fy;
}

function mixColor(a: number[], b: number[], amount: number) {
  return a.map((channel, index) =>
    Math.round(channel + (b[index] - channel) * clamp(amount)),
  );
}

export function createMineralTextures() {
  const colorCanvas = document.createElement('canvas');
  const heightCanvas = document.createElement('canvas');
  colorCanvas.width = heightCanvas.width = width;
  colorCanvas.height = heightCanvas.height = height;
  const colorContext = colorCanvas.getContext('2d');
  const heightContext = heightCanvas.getContext('2d');
  if (!colorContext || !heightContext) return null;

  const colorImage = colorContext.createImageData(width, height);
  const heightImage = heightContext.createImageData(width, height);
  const ink = [18, 25, 58];
  const cobalt = [48, 64, 133];
  const teal = [54, 111, 126];
  const silver = [175, 190, 201];
  const copper = [164, 73, 71];

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const coarse = noise(u * 6, v * 6, 6);
      const medium = noise(u * 18, v * 18, 18);
      const fine = noise(u * 48, v * 48, 48);
      const warp = (coarse - 0.5) * 4.8 + (medium - 0.5) * 0.9;
      const flow =
        v * 34 +
        Math.sin(u * Math.PI * 4 + v * 5) * 2.5 +
        Math.sin(u * Math.PI * 10 - v * 11) * 0.6 +
        warp;
      const band = Math.sin(flow * Math.PI * 2);
      const strata = Math.sin(flow * Math.PI * 5 + fine * 2);
      const paleVein = Math.pow(Math.max(0, band), 9);
      const redVein = Math.pow(
        Math.max(0, -Math.sin(flow * Math.PI * 2 + 0.9)),
        26,
      );
      const relief = clamp(
        0.31 + coarse * 0.26 + medium * 0.14 + paleVein * 0.22 + strata * 0.075,
      );

      let color = mixColor(ink, cobalt, 0.28 + coarse * 0.7);
      color = mixColor(color, teal, clamp((medium - 0.45) * 1.3));
      color = mixColor(color, silver, paleVein * (0.47 + fine * 0.38));
      color = mixColor(color, copper, redVein * 0.82);
      const grain = (fine - 0.5) * 21;
      const index = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel++) {
        colorImage.data[index + channel] = color[channel] + grain;
        heightImage.data[index + channel] = relief * 255;
      }
      colorImage.data[index + 3] = heightImage.data[index + 3] = 255;
    }
  }

  colorContext.putImageData(colorImage, 0, 0);
  heightContext.putImageData(heightImage, 0, 0);
  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const heightMap = new THREE.CanvasTexture(heightCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = heightMap.wrapS = THREE.RepeatWrapping;
  colorMap.anisotropy = 4;
  return { colorMap, heightMap };
}
