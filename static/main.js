var socket = io(location.href);
var mic;
var colors = ['#F9690E', '#F22613', '#FF0000', '#1BA39C', '#36D7B7', '#3FC380', '#59ABE3'];

var rSlider, gSlider, bSlider;
var osc, fft;

function setup() {
  var cv = createCanvas(350, 120);
  cv.parent("Micanvas");
  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  rectMode(CENTER);
  translate(175, 50);
  background("rgba(0,0,0,0.5)");
  var vol = mic.getLevel();
  var val = parseInt(map(vol, 0, 0.5, 1, 30));
  fill(random(colors));
    for (i = 200, j = 0; i >= 0, j <= val; i -= 10, j += 1) {
      rect(i, 10, 8, j * 3);
    }
    for (i = -200, j = 0; i <= 0, j <= val; i += 10, j += 1) {
      rect(i, 10, 8, -j * 3);
    }
  socket.emit('data', val);
}