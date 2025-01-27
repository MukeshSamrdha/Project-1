let companybtn = document.querySelector("#companybtn");
let toggle = 0;
companybtn.addEventListener("click", () => {
    if (toggle == 0) {
        toggle = 1;
        document.querySelector("#togglediv").style.display = "block";
        companybtn.innerHTML = "I Don't Have A Company";
    } else {
        toggle = 0;
        document.querySelector("#togglediv").style.display = "none";
        companybtn.innerHTML = "I Have A Company";
    }
});
let modebtn = document.querySelector("#modebtn");
let mode = 0;
modebtn.addEventListener("click", (req, res) => {
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
        //  document.querySelectorAll("h3").forEach((ele) => {
        //    ele.style.color = "white";
        //  });
         document.querySelectorAll("p").forEach((ele) => {
           ele.style.color = "white";
         });
         document.querySelectorAll("label").forEach((ele) => {
           ele.style.color = "white";
         });
         document.querySelectorAll("a").forEach((ele) => {
           ele.style.color = "white";
           ele.addEventListener("mouseover", () => {
             ele.style.color = "#0369A1";
           });
           ele.addEventListener("mouseout", () => {
             ele.style.color = "white";
           });
         });
        document.querySelector("#formdiv").style.backgroundColor = "#111827";
        document.querySelector("form").style.backgroundColor = "black";
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
        // document.querySelectorAll("h3").forEach((ele) => {
        //   ele.style.color = "black";
        // });
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
        document.querySelector("#formdiv").style.backgroundColor = "#F0F9FF";
        document.querySelector("form").style.backgroundColor = "white";
    }
})