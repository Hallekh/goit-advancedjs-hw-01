import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const LS_KEY = 'videoplayer-current-time';

const saveCurrentTime = throttle(function (currentTime) {
  localStorage.setItem(LS_KEY, currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

const savedCurrentTime = localStorage.getItem(LS_KEY);
if (savedCurrentTime !== null) {
  player.setCurrentTime(savedCurrentTime);
}
