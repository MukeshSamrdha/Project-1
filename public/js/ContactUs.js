let z = 0;
async function Login() {
  const response = await fetch("/LogedIn", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  response.json().then((result) => {
    z = result.Login;
    console.log(z);
    if (z == 0) {
      document.querySelector("#profilebtn").style.display = "none";
      document.querySelector("#initiallogin").style.display = "flex";
       document.querySelector("#homelink").href = "/Login"; 
      document.querySelector('body').style.overflow = "hidden";
      console.log(z);
    } else {
      document.querySelector("#profilebtn").style.display = "block";
      document.querySelector("#initiallogin").style.display = "none";
      document.querySelector("#homelink").href = "/Home"; 
      document.querySelector("body").style.overflow = "auto";
      //console.log(z);
    }
  });
}
Login();
document.querySelectorAll(".imgq").forEach((ele) => {
  ele.addEventListener("click", () => {
    let l = ele.getAttribute("id");
    let p = "a" + l;
    let k = document.getElementById(p);
    // let y = k.style.display;
    // if (y == "none") {
    //     k.style.display = "block";
    // } else {
    //      k.style.display = "none";
    // }
    k.classList.toggle("visible");
    console.log("Hi");
  });
});
let profilebtnimg = document.querySelector("#profilebtnimg");
let pro = 0;
profilebtn.addEventListener("click", () => {
  if (pro == 0) {
    pro = 1;
    profilebtnimg.src = "/assets/circle-x.svg";
    document.querySelector("#profileinfo").style.display = "block";
  } else {
    pro = 0;
    profilebtnimg.src = "/assets/user (1).svg";
    document.querySelector("#profileinfo").style.display = "none";
  }
});

let mode = 0; //light
let modebtn = document.querySelector("#modebtn");
modebtn.addEventListener("click", () => {
  if (mode == 0) {
    document.querySelector("#modebtnimg").src = "/assets/sun-moon.svg";
    mode = 1;
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
    document.querySelector("#main").style.backgroundColor = "#082F49";
    document.querySelector("#body2").style.backgroundColor = "#082F49";
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "white";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "white";
      });
    });
    document.querySelector("#beforelogin").style.backgroundColor = "black";
     document.querySelector("#profileinfo").style.backgroundColor = "black";
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
    document.querySelector("#main").style.backgroundColor = "#F0F9FF";
    document.querySelector("#body2").style.backgroundColor = "#F0f9FF";
    document.querySelectorAll("a").forEach((ele) => {
      ele.style.color = "black";
      ele.addEventListener("mouseover", () => {
        ele.style.color = "#0369A1";
      });
      ele.addEventListener("mouseout", () => {
        ele.style.color = "black";
      });
    });
    document.querySelector("#beforelogin").style.backgroundColor = "white";
      document.querySelector("#profileinfo").style.backgroundColor = "white";
  }
});
