let mode = 0;
const modebtn = document.querySelector("#modebtn");
modebtn.addEventListener("click", () => {
    if (mode == 0) {
      mode = 1;
      document.querySelector("#modebtnimg").src = "/assets/sun-moon.svg";
        document.body.style.backgroundColor = "black";
      document.querySelectorAll("h1, h2, h3, p, a").forEach((ele) => {
        ele.style.color = "white";
      });
      document.querySelectorAll("a").forEach((ele) => {
        ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
        ele.addEventListener("mouseout", () => (ele.style.color = "white"));
      });
        document.querySelector("#main").style.backgroundColor = "#082F49";
      document.querySelectorAll(".seconddivele").forEach((ele) => {
        ele.style.backgroundColor = "black";
      });
        document.querySelector("#thirddiv").style.backgroundColor = "black";
        document.querySelector("#fourthfirst").style.backgroundColor = "black";
    } else {
        mode = 0;
         document.querySelector("#modebtnimg").src = "/assets/moon.svg";
        document.body.style.backgroundColor = "white";
         document.querySelectorAll("h1, h2, h3, p, a").forEach((ele) => {
           ele.style.color = "black";
         });
        document.querySelectorAll("a").forEach((ele) => {
            ele.addEventListener(
                "mouseover",
                () => (ele.style.color = "#0369A1")
            );
            ele.addEventListener("mouseout", () => (ele.style.color = "black"));
        });
         document.querySelector("#main").style.backgroundColor = "rgb(240,240,240)";
         document.querySelectorAll(".seconddivele").forEach((ele) => {
           ele.style.backgroundColor = "white";
         });
        document.querySelector("#thirddiv").style.backgroundColor = "white";
        document.querySelector("#fourthfirst").style.backgroundColor = "white";
    }
})