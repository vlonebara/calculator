let display = document.querySelector(".display");
let btns = Array.from(document.querySelectorAll(".button"));
let switchThemeBtn = document.querySelector(".switchTheme");
let content = Array.from(document.querySelectorAll(".light"));
const btnAudio = new Audio("audio/btn.wav");
const equalAudio = new Audio("audio/equal.wav");
let operation = "";
let a = "";
let b = "";

btns.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "ac":
        btnAudio.play();
        display.innerText = "0";
        operation = "";
        a = "";
        b = "";
        break;
      case "=":
        if (a !== "" && b !== "") {
          equalAudio.play();
          display.innerText = eval(a + operation + b);
          operation = "";
          a = display.innerText;
          b = "";
          break;
        } else {
          break;
        }
      case "+":
        btnAudio.play();
        operation = "+";
        break;
      case "-":
        btnAudio.play();
        operation = "-";
        break;
      default:
        if (display.innerText.length < 9) {
          if (display.innerText === "0") {
            btnAudio.play();
            display.innerText = e.target.innerText;
            a += e.target.innerText;
          } else {
            btnAudio.play();
            if (operation === "") {
              display.innerText += e.target.innerText;
              a += e.target.innerText;
              break;
            } else {
              if (b === "") {
                display.innerText = e.target.innerText;
              } else {
                display.innerText += e.target.innerText;
              }
              b += e.target.innerText;
              break;
            }
          }
        }
    }
  });
});

display.addEventListener("click", (e) => {
  if (display.innerText.length > 1) {
    if (operation === "") {
      display.innerText = display.innerText.slice(0, -1);
      a = e.target.innerText;
    } else {
      display.innerText = display.innerText.slice(0, -1);
      b = e.target.innerText;
    }
  }
});

switchThemeBtn.addEventListener("click", (e) => {
  const currentTheme = document.body.className;
  if (currentTheme === "light") {
    document.body.className = "dark";
  } else {
    document.body.className = "light";
  }
});
