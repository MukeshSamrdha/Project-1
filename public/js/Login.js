
let btn = document.querySelectorAll(".btnelediv");
btn.forEach((ele) => {
  ele.addEventListener("click", () => {
    let id = ele.getAttribute("id");
    if (id == "customer") {
      document.querySelector("#retailerform").style.display = "none";
      document.querySelector("#customerform").style.display = "block";
      document.querySelector("#customer").style.backgroundColor = "#0369A1";
      document.querySelector("#customer").style.color = "white";
      document.querySelector("#retailer").style.backgroundColor = "white";
      document.querySelector("#retailer").style.color = "#0369A1";
    } else {
      document.querySelector("#retailerform").style.display = "block";
      document.querySelector("#customerform").style.display = "none";
      document.querySelector("#customer").style.backgroundColor = "white";
      document.querySelector("#customer").style.color = "#0369A1";
      document.querySelector("#retailer").style.backgroundColor = "#0369A1";
      document.querySelector("#retailer").style.color = "white";
    }
  });
});

document.querySelectorAll(".togglebtnp").forEach((ele) => {
  ele.addEventListener("click", () => {
    console.log("HI");
    let password = document.querySelector("#cpassword");
    let password1 = document.querySelector("#rpassword");
    let type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    let type1 =
      password1.getAttribute("type") === "password" ? "text" : "password";
    password1.setAttribute("type", type);
    if (ele.innerHTML == "SHOW") {
      ele.innerHTML = "HIDE";
    } else {
      ele.innerHTML = "SHOW";
    }
  });
});

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
    });
    document.querySelector("#main").style.backgroundColor = "#082F49";
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "white";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "white";
      });
    });
    document.querySelectorAll(".forma").forEach((ele) => {
      ele.style.color = "#0284C7";
    });
    document.querySelector("#googlebtnpara").style.color = "white";
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
    document.querySelector("#main").style.backgroundColor = "#F0F9FF";
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "black";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "black";
      });
    });
    document.querySelectorAll(".forma").forEach((ele) => {
      ele.style.color = "#0284C7";
    });
    document.querySelector("#googlebtnpara").style.color = "white";
  }
});
