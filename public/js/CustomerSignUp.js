let mode = 0; //light
let modebtn = document.querySelector("#modebtn");
modebtn.addEventListener("click", () => {
  if (mode == 0) {
    mode = 1;
     document.querySelector("#modebtnimg").src = "/assets/sun-moon.svg";
    document.querySelector("body").style.backgroundColor = "black";
    document.querySelectorAll("h1").forEach((ele) => {
      ele.style.color = "white";
    });
    document.querySelectorAll("h2").forEach((ele) => {
      ele.style.color = "white";
    });
    document.querySelectorAll("h3").forEach((ele) => {
      ele.style.color = "white";
    });
    document.querySelectorAll("p").forEach((ele) => {
      ele.style.color = "white";
    });
      document.querySelectorAll("label").forEach((ele) => {
          ele.style.color = "white";
      })
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "white";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "white";
      });
    });
  } else {
    mode = 0;
     document.querySelector("#modebtnimg").src = "/assets/moon.svg";
    document.querySelector("body").style.backgroundColor = "white";
    document.querySelectorAll("h1").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelectorAll("h2").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelectorAll("h3").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelectorAll("p").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelectorAll("label").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "black";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "black";
      });
    });
  }
});
