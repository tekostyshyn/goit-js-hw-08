import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const currentTime = JSON.stringify(data.seconds);
  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

function setCurrentTime() {
  const currentTimeFromStorage = localStorage.getItem(CURRENT_TIME_KEY);
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
