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
      document.querySelector("#homelink").href = "/Login";
      document.querySelector("body").style.overflow = "hidden";
      //console.log(z);
    } else {
      document.querySelector("#profilebtn").style.display = "block";
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
function redirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}
let id = redirect();
document.querySelector("#homelink").href = "/ShiperDashboard?id=" + id;
document.querySelector("#aboutus").href = "/AboutUsR?id=" + id;
document.querySelector("#contactus").href = "/ContactUsR?id=" + id;
document.querySelector("#homeredirectbtn").href = "/ShiperDashboard?id=" + id;
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

let mode;
async function getmode() {
  //onload
  return fetch("/ModeR?id=" + id, {
    method: "GET",
    headers: { "Content-Type": "Application/JSON" },
  })
    .then((result) => result.json())
    .then((Answer) => {
      return Answer.Mode;
    });
}
async function mode1() {
  document.querySelector("#loading").style.display = "block";
  setTimeout(() => {
    document.querySelector("#loading").style.display = "none";
  }, 3000);
  mode = await getmode();
  changemode(mode);
}
document.addEventListener("DOMContentLoaded", () => {
  mode1();
});
function changemode(mode) {
  if (mode == 1) {
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
    document.querySelector("#profileinfo").style.backgroundColor = "white";
  }
}

function changemodeclick(mode) {
  if (mode == "0") {
    mode = "1";
    fetch("/ModeR?id=" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Mode: mode }),
    })
      .then(() => {
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
        document.querySelector("#profileinfo").style.backgroundColor = "black";
      })
      .catch((err) => {
        console.log("HI");
        console.log(err);
      });
  } else {
    mode = "0";
    fetch("/ModeR?id=" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Mode: mode }),
    })
      .then(() => {
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
        document.querySelector("#profileinfo").style.backgroundColor = "white";
      })
      .catch((err) => {
        console.log("HI");
        console.log(err);
      });
  }
  return mode;
}
let modebtn = document.querySelector("#modebtn");
modebtn.addEventListener("click", () => {
  mode = changemodeclick(mode);
});
