let mic, fft;
let angleX = 0;
let angleY = 0;
let zoom = 1;

function setup() {
  createCanvas(800, 600, WEBGL); // 使用WebGL模式创建画布
  
  // 创建一个音频输入对象
  mic = new p5.AudioIn();
  mic.start();
  
  // 创建一个FFT对象，用于分析音频频谱
  fft = new p5.FFT(0.8, 512); // 参数表示平滑度和FFT大小
  fft.setInput(mic);
}

function draw() {
  background(30);

  // 获取音频频谱数据
  let spectrum = fft.analyze();

  // 设置视角
  rotateX(angleX);
  rotateY(angleY);
  scale(zoom);

  // 绘制频谱图
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, -width / 2, width / 2);
    let h = map(spectrum[i], 0, 255, 0, 200);
    let z = map(i, 0, spectrum.length, -200, 200);
    let w = width / spectrum.length;
    let c = map(i, 0, spectrum.length, 0, 255); // 颜色随频谱变化
    fill(c, 255, 255);
    translate(x + w / 2, height / 2, z);
    box(w, h, 10);
    translate(-x - w / 2, -height / 2, -z);
  }

  // 添加频谱图上的一些文本信息
  textSize(16);
  fill(255);
  text('音频频谱图 (3D)', 10, 20);
  text('频率 (Hz)', width - 80, height - 10);
}

function mouseWheel(event) {
  zoom += event.delta * 0.01;
  zoom = constrain(zoom, 0.1, 4); // 限制缩放的范围
  return false; // 防止页面滚动
}

function mouseDragged() {
  angleX += (pmouseY - mouseY) * 0.01;
  angleY -= (pmouseX - mouseX) * 0.01;
}
