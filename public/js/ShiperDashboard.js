function redirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}
let id = redirect();
document.querySelector("#aboutus").href = "/AboutUsR?id=" + id;
document.querySelector("#contactus").href = "/ContactUsR?id=" + id;
document.querySelector("#homelink").href = "/ShiperDashboard?id=" + id;
document.querySelector("#newshipmentlink").href = "/ShipmentArea?id=" + id;
document.querySelector("#mybidslink").href = "/ShipmentMybids?id=" + id;

let logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  document.querySelector("#loading").style.display = "block";
  setTimeout(() => {
    document.querySelector("#loading").style.display = "none";
  }, 5000);
  setTimeout(() => {
    let Logout = false;
    let email = document.querySelector("#emailhead").innerHTML;
    fetch("http://localhost:7000/LogedOutR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        loged: Logout,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        window.document.location.href = "/Login";
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, 2000);
});

async function getshipmentdetails(sid) {
  console.log("hello");
  let response = fetch("/ShipmentDetails?id=" + sid, {
    method:"GET",
    headers: { "Content-Type": "application/json" },
  })
  response.then((result) => {
    result.json().then((result) => {
      document.querySelector("#bid" + sid).innerHTML = result.email;
      document.querySelector("#len" + sid).innerHTML = result.length+'cm';
      document.querySelector("#wid" + sid).innerHTML = result.width + "cm";
      document.querySelector("#hei" + sid).innerHTML = result.height + "cm";
      document.querySelector("#wei" + sid).innerHTML = result.weight+'Kg';
       document.querySelector("#fhno" + sid).innerHTML = result.fhno;
       document.querySelector("#fcol" + sid).innerHTML = result.fcolony;
      document.querySelector("#fcity" + sid).innerHTML = result.fcity;
       document.querySelector("#fs" + sid).innerHTML = result.fstate;
       document.querySelector("#fpc" + sid).innerHTML = result.fpincode;
       document.querySelector("#thno" + sid).innerHTML = result.thno;
       document.querySelector("#tcol" + sid).innerHTML = result.tcolony;
       document.querySelector("#tcity" + sid).innerHTML = result.tcity;
       document.querySelector("#ts" + sid).innerHTML = result.tstate;
      document.querySelector("#tpc" + sid).innerHTML = result.tpincode;
      documentquerySelector("#pud" + sid).innerHTML = result.pud;
    })})
}
document.querySelectorAll(".endridebtn").forEach((ele) => {
  let sid = ele.getAttribute('id').slice(2);
  ele.addEventListener("click", () => {
    alert("Are You Sure You Want To End This Ride?");
    fetch("/EndRide?sid=" + sid+"&shiperid="+id, {
      method: "POST",
      headers:{"Content-Type":"application/json"}
    }).then(() => {
      alert("An Otp Has Been Sent To The Customer,Please Tell Him/Her To Enter In Tracking page of This Shipment");
    })
   })
})
let viewdetailsbtn = document.querySelectorAll(".viewdetailsbtn");
viewdetailsbtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    let id = ele.getAttribute("id");
    let k = id.slice(5);
    let newid = "#vddiv" + k;
    document.querySelector(newid).style.display = "block";
    console.log("hi");
    getshipmentdetails(k);
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.querySelector(newid).style.backdropFilter = "blur(10px)";
  });
});

let closex = document.querySelectorAll(".closex");
closex.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelectorAll(".viewdetailsdiv").forEach((ele) => {
      document.body.style.overflow = "auto";
      ele.style.display = "none";
    });
  });
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
    document.body.style.backgroundColor = "black";
    document.querySelectorAll("h1, h2, h3,h4, p, a").forEach((ele) => {
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
    document.querySelectorAll(".viewdetailsdiv").forEach((ele) => {
      ele.style.backgroundColor = "black";
    })
  } else {
    mode = 0;
     document.querySelector("#modebtnimg").src = "/assets/moon.svg";
     document.body.style.backgroundColor = "white";
     document.querySelectorAll("h1, h2, h3,h4, p, a").forEach((ele) => {
       ele.style.color = "black";
     });
     document.querySelectorAll("a").forEach((ele) => {
       ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
       ele.addEventListener("mouseout", () => (ele.style.color = "black"));
     });
     document.querySelector("#main").style.backgroundColor = "#F0F9FF";
     document.querySelectorAll(".seconddivele").forEach((ele) => {
       ele.style.backgroundColor = "white";
     });
     document.querySelector("#thirddiv").style.backgroundColor = "white";
    document.querySelector("#fourthfirst").style.backgroundColor = "white";
     document.querySelectorAll(".viewdetailsdiv").forEach((ele) => {
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
        document.querySelector("#modebtnimg").src = "/assets/sun-moon.svg";
        document.body.style.backgroundColor = "black";
        document.querySelectorAll("h1, h2, h3,h4, p, a").forEach((ele) => {
          ele.style.color = "white";
        });
        document.querySelectorAll("a").forEach((ele) => {
          ele.addEventListener(
            "mouseover",
            () => (ele.style.color = "#0369A1")
          );
          ele.addEventListener("mouseout", () => (ele.style.color = "white"));
        });
        document.querySelector("#main").style.backgroundColor = "#082F49";
        document.querySelectorAll(".seconddivele").forEach((ele) => {
          ele.style.backgroundColor = "black";
        });
        document.querySelector("#thirddiv").style.backgroundColor = "black";
        document.querySelector("#fourthfirst").style.backgroundColor = "black";
         document.querySelectorAll(".viewdetailsdiv").forEach((ele) => {
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
        document.body.style.backgroundColor = "white";
        document.querySelectorAll("h1, h2, h3,h4, p, a").forEach((ele) => {
          ele.style.color = "black";
        });
        document.querySelectorAll("a").forEach((ele) => {
          ele.addEventListener(
            "mouseover",
            () => (ele.style.color = "#0369A1")
          );
          ele.addEventListener("mouseout", () => (ele.style.color = "black"));
        });
        document.querySelector("#main").style.backgroundColor = "#F0F9FF";
        document.querySelectorAll(".seconddivele").forEach((ele) => {
          ele.style.backgroundColor = "white";
        });
        document.querySelector("#thirddiv").style.backgroundColor = "white";
        document.querySelector("#fourthfirst").style.backgroundColor = "white";
         document.querySelectorAll(".viewdetailsdiv").forEach((ele) => {
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
