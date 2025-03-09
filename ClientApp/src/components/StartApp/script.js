import anime from "animejs"
document.addEventListener("DOMContentLoaded", () => {
   anime(
        {
            targets: ".img-start-app",
            scale: 0,
            duration: 0.1
        }
    );
    anime.timeline()
    .add({
      targets: '.ml5 .line',
      opacity: [0.5,1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 400
    }).add({
      targets: '.ml5 .line',
      duration: 600,
      easing: "easeOutExpo",
      translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
    }).add({
      targets: '.ml5 .ampersand',
      opacity: [0,1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5 .letters-left',
      opacity: [0,1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=300'
    }).add({
      targets: '.ml5 .letters-right',
      opacity: [0,1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5',
      opacity: 0,
      duration: 800,
      easing: "easeOutExpo",
      delay: 500,
      complete: () => {
        anime.timeline().add(
            {
                targets: ".img-start-app",
                scale: [0,1],
                opacity: [0,1],
                easing: "linear",
                duration: 200,
            }
        ).add({
            targets: ".img-start-app",
          
            opacity: [1,0],
            easing: "linear",
            duration: 300,
            delay: 800
        });
      }
      
    })
})