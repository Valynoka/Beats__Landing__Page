// часть сделанная при помощи API 
let  player;
let ytplayer;

const playerContainer = $(".video__container-contant");
const soundContainer = $(".sound");

let eventsInit = () => {
  $(".duration__img").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("video__container-contant--active")) {
      player.pauseVideo();
    } else {      
      player.playVideo();
    };
    
    $(".duration__length-wrap").click( e => {
      const bar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      const newDuttonPositionPercent = (clickedPosition / bar.width()) * 100;
      const newPlaybackPositionSec = (player.getDuration() / 100) * newDuttonPositionPercent;

      $(".duration__length-button").css({
        left: `${newDuttonPositionPercent}%`
      });
      player.seekTo(newPlaybackPositionSec);
    })

  });
  $(".video__poster").click (e =>{
    player.playVideo();
    if (playerContainer.hasClass("video__container-contant--active")) {
      player.pauseVideo();
    } else {      
      player.playVideo();
    };
  })
};

let soundVol = () => {
  $('#volLevel').on('change', function () {
    player.setVolume($(this).val());
  });
};



let soudMute = () => {
  $(".sound__button").click (e => {
    e.preventDefault();
    if (player.getVolume() == 0) {
      player.setVolume(50);// не знаю как вписать сюда значение из id="volLevel html
      soundContainer.removeClass("sound--active");
    } else {
      player.setVolume('0');
      soundContainer.addClass("sound--active");
      
    }
  })
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".duration__length-button").css({
      left: `${completedPercent}%`,
    });
  },1000);
};

const onPlayerStateChange = event => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("video__container-contant--active");
      
      break;
  
    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("video__container-contant--active");
      
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    // height: "405", думаю параметры ширины и  высоты лучше задавать в scss
    // width: "660",
    color: "red",
    videoId: "Dd1VIeTMGQs",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}
soundVol()
soudMute()
eventsInit();
// конец блока API 

// let durationControl;
// durationControl = document.getElementById("durationLevel");
// durationControl.min = 0;
// durationControl.Value = 0;
// durationControl.max = video.duration;
// durationControl.addEventListener("input", SetVideoDuration);


// function updateTime() {
//   durationControl.value = video.getCurrentTime;
//   const step = video.duration / 100;
//   const precent = video.currentTime / step;

//   durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${precent}%, #E01F3D 0%, #333333 ${precent}%)`;

// }

// let video;
// let durationControl;
// let soundControl;
// let intervalId;

// durationControl = document.getElementById("durationLevel");
// durationControl.min = 0;
// durationControl.Value = 0;
// durationControl.max = video.duration;
// durationControl.addEventListener("input", SetVideoDuration);


// function seSetVideoDurationt (){
//   video.currentTime = durationControl.value;
// }


// //кнопки

// const playBtn = document.querySelector(".video__player-btn");
// const soundBtm = document.querySelector(".sound");
// // поскольку в API есть переменная player, то использовать ее нельзя.
// const startPlayBtn = document.querySelector(".duration__img");

// // Так как у меня внедрено АPi, то код для видео решил записать в комментах
// // video = document.getElementById("player")

// video.addEventListener("click", playStop);
// let playButtons = document.querySelectorAll("play");
// for (let i = 0; i < playButtons.length; i ++) {
//   playButtons[i].addEventListener("click", playStop);
// }

// function playStop () {
  
//   if (video.paused) {
//     video.play();
//     startPlayBtn.classList.add("active");
//   }else {
//     video.paused();
//     startPlayBtn.classList.remove("active");
//   }
// }


