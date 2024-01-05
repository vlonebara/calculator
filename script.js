let display = document.querySelector(".display");
let btns = Array.from(document.querySelectorAll(".button"));

btns.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        display.innerText = eval(display.innerText);
        break;
      default:
        if (display.innerText.length < 10) {
          if (display.innerText === "0") {
            display.innerText = e.target.innerText;
          } else {
            display.innerText += e.target.innerText;
          }
        }
    }
  });
});
