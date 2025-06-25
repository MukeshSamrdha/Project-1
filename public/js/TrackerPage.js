
document.querySelector("#yesbtn").addEventListener("click", () => {
    document.querySelector("#otpcame").style.display = "none";
    document.querySelector("form").style.display = "block";
})

 function redirect() {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
   return id;
}
let id = redirect();
 function getshipmentid() {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("shipmentid");
   return id;
}
document.querySelector("#homebtn").addEventListener("click", () => {
    window.location.href = "/Home?id=" + id;
})
let Shipmentid;
let Ch = document.querySelector("#namediv").children;
 Shipmentid = Ch[1].getAttribute('id');
async function fillshiperdetails(Shipmentid) {
    let response=fetch("/RetailerDetails?id=" + Shipmentid, {
        mehtod: "GET",
        headers:{"Content-Type":"applcation/json"}
    })
    response.then((result) => {
        result.json().then((result) => {
            Ch[1].innerHTML = result.Result.fullname;
            document.querySelector("#phonenumber").innerHTML = result.Result.phonenumber;
        })
    })
}
fillshiperdetails(Shipmentid);

document.querySelector("#otpform").action = "/EndShipmentotp?id="+id+"&shipmentid="+getshipmentid()+"&shiperid="+Shipmentid;
let mode;
async function getmode() {
  //onload
  return fetch("/Mode?id=" + id, {
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
        document.querySelectorAll("p,a").forEach((ele) => {
            ele.style.color = "white";
        });
        document.querySelectorAll("hr").forEach((ele) => {
            ele.style.color = "white";
        });
        document.querySelectorAll(".firstele").forEach((ele) => {
            ele.style.backgroundColor = "#082F49";
        });
        document.querySelector("#third").style.backgroundColor = "#082F49";
      document.querySelector("label").style.color = "white";
      document.querySelector("#packageimg").style.backgroundColor = "#082F49";
       document.querySelectorAll("a").forEach((ele) => {
         ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
         ele.addEventListener("mouseout", () => (ele.style.color = "white"));
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
        document.querySelectorAll("p,a").forEach((ele) => {
            ele.style.color = "black";
        });
        document.querySelectorAll("hr").forEach((ele) => {
            ele.style.color = "black";
        });
        document.querySelectorAll(".element").forEach((ele) => {
            ele.style.backgroundColor = "#F0F9FF";
        });
        document.querySelector("#notediv").style.backgroundColor = "#F0F9FF";
        document.querySelectorAll(".shiperbids").forEach((ele) => {
            ele.style.backgroundColor = "#F0F9FF";
        });
        document.querySelectorAll("li").forEach((ele) => {
            ele.style.color = "black";
        });
        document.querySelectorAll(".firstele").forEach((ele) => {
            ele.style.backgroundColor = "#F0F9FF";
        });
        document.querySelector("#third").style.backgroundColor = "#F0F9FF";
      document.querySelector("label").style.color = "black";
      document.querySelector("#packageimg").style.backgroundColor = "#F0F9FF";
      document.querySelectorAll("a").forEach((ele) => {
        ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
        ele.addEventListener("mouseout", () => (ele.style.color = "black"));
      });
    }
};

function changemodeclick(mode) {
  if (mode == "0") {
    mode = "1";
    fetch("/Mode?id=" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Mode: mode }),
    })
      .then(() => {
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
         document.querySelectorAll("p,a").forEach((ele) => {
           ele.style.color = "white";
         });
         document.querySelectorAll("hr").forEach((ele) => {
           ele.style.color = "white";
         });
        document.querySelectorAll(".firstele").forEach((ele) => {
            ele.style.backgroundColor = "#082F49";
        })
        document.querySelector("#third").style.backgroundColor = "#082F49";
        document.querySelector("label").style.color = "white";
        document.querySelector("#packageimg").style.backgroundColor = "#082F49";
         document.querySelectorAll("a").forEach((ele) => {
      ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
      ele.addEventListener("mouseout", () => (ele.style.color = "white"));
    });
      })
      .catch((err) => {
        console.log("HI");
        console.log(err);
      });
  } else {
    mode = "0";
    fetch("/Mode?id=" + id, {
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
         document.querySelectorAll("p,a").forEach((ele) => {
           ele.style.color = "black";
         });
         document.querySelectorAll("hr").forEach((ele) => {
           ele.style.color = "black";
         });
         document.querySelectorAll(".element").forEach((ele) => {
           ele.style.backgroundColor = "#F0F9FF";
         });
         document.querySelector("#notediv").style.backgroundColor = "#F0F9FF";
         document.querySelectorAll(".shiperbids").forEach((ele) => {
           ele.style.backgroundColor = "#F0F9FF";
         });
         document.querySelectorAll("li").forEach((ele) => {
           ele.style.color = "black";
         });
         document.querySelectorAll(".firstele").forEach((ele) => {
           ele.style.backgroundColor = "#F0F9FF";
         });
        document.querySelector("#third").style.backgroundColor = "#F0F9FF";
        document.querySelector("label").style.color = "black";
        document.querySelector("#packageimg").style.backgroundColor = "#F0F9FF";
        document.querySelectorAll("a").forEach((ele) => {
      ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
      ele.addEventListener("mouseout", () => (ele.style.color = "black"));
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
