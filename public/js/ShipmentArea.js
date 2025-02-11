function redirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}
let id = redirect();
document.querySelector("#aboutus").href = "/AboutUsR?id=" + id;
document.querySelector("#contactus").href = "/ContactUsR?id=" + id;
document.querySelector("#homelink").href = "/ShiperDashboard?id=" + id;
document.querySelector("#addressform").action = "/ShipmentArea?id=" + id;

document.querySelectorAll(".shipmentbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let id1 = btn.getAttribute("id");
    console.log(id1);
    let shipmentid = id1.slice(11, id1.length);
    console.log(shipmentid);
    window.location.href = "/ShipmentInfo?id=" + id + "&shipmentid=" + shipmentid;
  })
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
    document.querySelectorAll("h4").forEach((ele) => {
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
    document.querySelector("span").style.color = "white";
    document.querySelectorAll(".shipmentdiv").forEach((ele) => {
      ele.style.backgroundColor = "black";
    });
  } else {
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
    document.querySelectorAll("h4").forEach((ele) => {
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
    document.querySelector("span").style.color = "black";
    document.querySelectorAll(".shipmentdiv").forEach((ele) => {
      ele.style.backgroundColor = "white";
    });
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
        document.querySelectorAll("h4").forEach((ele) => {
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
        document.querySelector("span").style.color = "white";
        document.querySelectorAll(".shipmentdiv").forEach((ele) => {
          ele.style.backgroundColor = "black";
        });
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
        document.querySelectorAll("h4").forEach((ele) => {
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
        document.querySelector("span").style.color = "black";
        document.querySelectorAll(".shipmentdiv").forEach((ele) => {
          ele.style.backgroundColor = "white";
        });
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