import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = function (data) {
  const currentTime = JSON.stringify(data.seconds);
  localStorage.setItem('videoplayer-current-time', currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

function setCurrentTime() {
  const currentTimeFromStorage = localStorage.getItem('videoplayer-current-time');
  if (currentTimeFromStorage) {
    player
      .setCurrentTime(currentTimeFromStorage)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;

          default:
            break;
        }
      });
  }
};

setCurrentTime();
