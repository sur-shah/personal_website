import * as THREE from 'three';

const width = 1024;
const height = 512;

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

const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;

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
  const ink = [9, 29, 22];
  const forest = [29, 83, 57];
  const moss = [82, 112, 63];
  const ridge = [165, 189, 144];
  const olive = [122, 120, 72];

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
      const oliveVein = Math.pow(
        Math.max(0, -Math.sin(flow * Math.PI * 2 + 0.9)),
        26,
      );
      const relief = clamp(
        0.31 + coarse * 0.26 + medium * 0.14 + paleVein * 0.22 + strata * 0.075,
      );

      const mossAmount = clamp((medium - 0.42) * 1.5);
      const ridgeAmount = paleVein * (0.35 + fine * 0.34);
      const grain = (fine - 0.5) * 21;
      const index = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel++) {
        const base = mix(ink[channel], forest[channel], 0.25 + coarse * 0.75);
        const ground = mix(base, moss[channel], mossAmount);
        const vein = mix(ground, ridge[channel], ridgeAmount);
        colorImage.data[index + channel] =
          mix(vein, olive[channel], oliveVein * 0.55) + grain;
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
