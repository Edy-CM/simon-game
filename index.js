const buttons = Array.from($(".btn"))
let row = []
let playerRow = []
let levels = 1
let on = false

$(document).keypress(function(e) {
  clearInterval()
  row = []
  playerRow = []
  levels = 1
  if (e.key === "a" && on === false) {
    $("h1").text(`Level ${levels}`)
    newSound()
    on = true
  }
})

$("div.btn").on("click", function(){
  if ($(this).is(playerRow[0])) {
    playSound($(this))
    playerRow.shift()
  } else {
    document.querySelector("audio.wrong").play()
    on = false
    $("h1").text("Game Over, press a to play again")
    let count = 0
    let gameoverInterval = setInterval(function(){ 
      $("body").toggleClass("game-over")
      count ++

      if (count > 5) {
        clearInterval(gameoverInterval)
      }
    }, 100)
  }

  if (playerRow.length === 0) {
    levels ++
    $("h1").text(`Level ${levels}`)
    setTimeout(function(){
      newSound()
    }, 1000)
  }
})

function playSound(button) {
  button.toggleClass("pressed")
  setTimeout(() => {
    button.toggleClass("pressed")
  }, 100);

  const source = `audio.${button.attr("id")}`
  const audio = document.querySelector(source)
  audio.currentTime = 0
  audio.play()
}

function newSound() {
  const lastSound = buttons[Math.floor(Math.random() * buttons.length)]
  playSound($(lastSound))
  setTimeout(function() {
    row.push(lastSound)
}, 101)
  setTimeout(function(){
    playerRow = row.map(color => { return color })
    console.log(row) 
  }, 102)
}