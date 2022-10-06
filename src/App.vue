<template>
  <div id="router-view" class="transition-all duration-1000 relative bg-[#aad999]">
    <router-view></router-view>
  </div>
  <div class="alert-bottom alert shadow-lg fixed z-[100] bottom-40 font-['joystix'] w-1/2" data-aos="zoom-in"
    v-if="store.state.showAlert">
    <div>{{ store.state.alertMsg}}</div>
    <div class="flex-none">
      <button class="btn btn-sm btn-ghost text-red-500"
        @click="store.dispatch('setStateData', { name: 'showAlert', data: false })">Close</button>
    </div>
  </div>
  <div
    class="fixed right-0 md:right-8 bottom-0 md:bottom-8 drop-shadow-md bg-black/70 z-[100] w-full md:w-auto py-2 md:py-4 px-2 md:px-8 font-['joystix'] flex flex-row md:flex-col items-center justify-center text-xs gap-4 md:gap-0 md:rounded-xl overflow-hidden">
    <div class="md:border-b md:mb-4 md:pb-4 border-white text-white text-right md:text-center z-10"><span
        class="font-bold hidden md:block">Music</span><br class="hidden md:block"><span class="text-yellow-300">Japanese garden</span></div>
    <audio id="audio" class="z-10">
    </audio>
    <canvas id="audio-canvas" class="audio-canvas"></canvas>
    <div class="inline text-white border px-2 md:px-4 py-1 rounded-md cursor-pointer z-10 hover:opacity-50"
      @click="togglePlay()">
      {{isPlayAudio ?
      'pause':'play'}}</div>
  </div>
</template>

<style lang="scss" scoped>
.alert-bottom {
  width: 900px;
  left: 50%;
  margin-left: -450px;
}

@media screen and (max-width: 768px) {
  .alert-bottom {
    width: 90%;
    margin-left: -45%;
  }
}

.audio-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import store from "@/store"

const isPlayAudio = ref(false);
let isLoadMusic = false;

const togglePlay = () => {
  var audio = document.getElementById("audio");
  isPlayAudio.value = !isPlayAudio.value;
  if (!isLoadMusic) {
    loadMusic()
  }
  audio.volume = 0.5
  if (isPlayAudio.value) {
    audio.play();
  } else {
    audio.pause();
  }
}

const loadMusic = () => {
  isLoadMusic = true;
  var audio = document.getElementById("audio");
  audio.src = './music.mp3'
  audio.load();

  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("audio-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 3.5;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 1.5;

      var r = barHeight + (205 * (i / bufferLength));
      var g = 102 + i;
      var b = 0;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
}

</script>