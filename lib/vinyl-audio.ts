export function createVinylAudio() {
  const context = new AudioContext();
  const length = context.sampleRate * 4;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);
  let noise = 0;
  let pop = 0;

  for (let i = 0; i < samples.length; i++) {
    const random = Math.random() * 2 - 1;
    noise = noise * 0.92 + random * 0.08;
    if (Math.random() < 14 / context.sampleRate) {
      pop = (0.12 + Math.random() * 0.18) * Math.sign(random);
    }
    samples[i] = noise * 0.16 + random * 0.014 + pop;
    pop *= -0.9;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const gain = context.createGain();
  gain.gain.value = 0;
  source.connect(gain).connect(context.destination);
  source.start();

  return { context, gain };
}
