function redirect(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}
let redirectid = redirect();
document.querySelector("#shiperarea").addEventListener("click", () => {
  window.location.href = "/ShipmentArea?id=" + redirectid;
});
document.querySelector("#shiperdashboard").addEventListener("click", () => {
  window.location.href = "/ShiperDashboard?id=" + redirectid;
});
async function getshipmentdetails(id) {
  try {
    const response = await fetch("/Shipmentdetails?id=" + id, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function loaddoc() {
    const elements = document.querySelectorAll(".element");
    for (const ele of elements) {
        let result = ele.children;
        let main = result[0].children;
        let id = main[0].getAttribute("id");
        let details = await getshipmentdetails(id);
      if (details.status != 1) {
        ele.style.display = "none";
        }
        if (details) {
           // console.log(details);
            document.querySelector("#dimensions" + id).innerHTML = "Dimensions:" + details.length + 'x' + details.width + 'x' + details.height;
            document.querySelector("#weight" + id).innerHTML = "Weight:" + details.weight;
            document.querySelector("#pickup" + id).innerHTML = "PickUp:" + details.fcity + ',' + details.fstate;
            document.querySelector("#destination" + id).innerHTML = "Destination:" + details.tcity + ',' + details.tstate;
            document.querySelector("#cbp" + id).innerHTML = "Current BestPrice:" + details.bestprice;
            document.querySelector("#bidbtn" + id).addEventListener("click", () => {
                window.location.href = "/Shipmentinfo?id=" + redirectid + "&shipmentid=" + id;
            })
            let cbp = document.querySelector("#cbp" + id).innerHTML;
            let ybp = document.querySelector("#ybp" + id).innerHTML;
            cbp = cbp.slice(18);
            ybp = ybp.slice(15);
            if (cbp == ybp) {
                document.querySelector("#bidbtn" + id).style.backgroundColor = "rgb(14, 179, 14)";
            } else {
                document.querySelector("#bidbtn" + id).style.backgroundColor = "red";
            }
            if (details.status == 0) {
                document.querySelector("#element" + id).style.display = "none";
            }
        } else {
            console.log("No details available for shipment id:", id);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loaddoc();
})

setInterval(() => {
    loaddoc();
}, 3000);




let mode;
async function getmode() {
  //onload
  return fetch("/ModeR?id=" + redirectid, {
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
     document.querySelectorAll("hr").forEach((ele) => {
       ele.style.color = "white";
     });
     document.querySelectorAll(".element").forEach((ele) => {
       ele.style.backgroundColor = "#082F49";
     });
     document.querySelector("#notice").style.backgroundColor = "#082F49";
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
     document.querySelectorAll("h4").forEach((ele) => {
       ele.style.color = "black";
     });
     document.querySelectorAll("p").forEach((ele) => {
       ele.style.color = "black";
     });
     document.querySelectorAll("hr").forEach((ele) => {
       ele.style.color = "black";
     });
     document.querySelectorAll(".element").forEach((ele) => {
       ele.style.backgroundColor = "#F0F9FF";
     });
     document.querySelector("#notice").style.backgroundColor = "#F0F9FF";
  }
}

function changemodeclick(mode) {
  if (mode == "0") {
    mode = "1";
    fetch("/ModeR?id=" + redirectid, {
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
        document.querySelectorAll("hr").forEach((ele) => {
          ele.style.color = "white";
        });
        document.querySelectorAll(".element").forEach((ele) => {
          ele.style.backgroundColor = "#082F49";
        });
        document.querySelector("#notice").style.backgroundColor = "#082F49";
      })
      .catch((err) => {
        console.log("HI");
        console.log(err);
      });
  } else {
    mode = "0";
    fetch("/ModeR?id=" + redirectid, {
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
        document.querySelectorAll("h4").forEach((ele) => {
          ele.style.color = "black";
        });
        document.querySelectorAll("p").forEach((ele) => {
          ele.style.color = "black";
        });
        document.querySelectorAll("hr").forEach((ele) => {
          ele.style.color = "black";
        });
        document.querySelectorAll(".element").forEach((ele) => {
          ele.style.backgroundColor = "#F0F9FF";
        });
        document.querySelector("#notice").style.backgroundColor = "#F0F9FF";
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