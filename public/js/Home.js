
let btns = document.querySelectorAll(".ysb");
btns.forEach((ele) => {
    ele.addEventListener("click", () => {
        let id = ele.getAttribute("id");
        if (id == "ysbcs") {
            document.querySelector("#ysbcs").style.backgroundColor = "#0284C7";
            document.querySelector("#ysbcs").style.color = "white";
            document.querySelector("#ysbps").style.backgroundColor = "white";
            document.querySelector("#ysbps").style.color = "black";
        } else {
              document.querySelector("#ysbcs").style.backgroundColor =
                "white";
              document.querySelector("#ysbcs").style.color = "black";
              document.querySelector("#ysbps").style.backgroundColor = "#0284C7";
              document.querySelector("#ysbps").style.color = "white";
        }
    })
})
document.querySelector("#homelink").href = "/Home"; 
// LogedIn and reult should be sent ;
let p = 1;
let profilebtn = document.querySelector("#profilebtn");
let profileinfo = document.querySelector("#profileinfo");
profilebtn.addEventListener("click", () => {
        if (p == 1) {
        p = 0;
        let child = profilebtn.children;
        child[0].src = "/assets/circle-x.svg";
          profileinfo.style.display = "block";
    } else {
        p = 1;
        let child = profilebtn.children;
        child[0].src = "/assets/user (1).svg";
        profileinfo.style.display = "none";
    }
})
let logout = document.querySelector("#logoutbtn");
logout.addEventListener("click", () => {
  document.querySelector("#loading").style.display = "block";
  setTimeout(() => {
    document.querySelector("#loading").style.display = "none";
  }, 2000);
  setTimeout(() => {
    let Logout = 0; 
    // Logs success
   // console.log("Hello");
    fetch("http://localhost:7000/LogedOut",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Login: Logout, // Ensure 'Logout' is defined before this fetch call
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
       // console.log("HI"); // Logs "HI" on success
        window.document.location.href = "/Login"; // Redirects to /Login
      })
      .catch((err) => {
        console.error("Error:", err);
       // console.log("failed"); // Logs failure
      });

  }, 1000);
});
let closex = document.querySelector("#closex");
closex.addEventListener("click", () => {
  document.querySelector("#viewdetails").style.display = "none";
});

let viewdetailsbtn = document.querySelector(".viewdetailsbtn");
viewdetailsbtn.addEventListener("click", () => {
  document.querySelector("#viewdetails").style.display = "block";
});

let mode = 0; //li
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
    document.querySelectorAll("h4").forEach((ele) => {
      ele.style.color = "white";
    });
    document.querySelectorAll("p").forEach((ele) => {
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
      document.querySelectorAll("label").forEach((ele) => {
          ele.style.color = "white";
      })
      document.querySelector("#yourshipments").style.backgroundColor = "#111827";
      document.querySelectorAll(".di").forEach((ele) => {
          ele.style.backgroundColor = "black";
      })
      document.querySelector("#imghead").style.backgroundColor =
          "rgb(63, 29, 13)";
    document.querySelector("#profileinfo").style.backgroundColor = "black";
    document.querySelector("#viewdetails").style.backgroundColor = "black";
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
       document.querySelectorAll("label").forEach((ele) => {
         ele.style.color = "black";
       });
      document.querySelector("#yourshipments").style.backgroundColor =
        "rgb(217, 217, 217)";
      document.querySelectorAll(".di").forEach((ele) => {
        ele.style.backgroundColor = "white";
      });
       document.querySelector("#imghead").style.backgroundColor =
          "rgb(255, 249, 229)";
    document.querySelector("#profileinfo").style.backgroundColor = "white";
     document.querySelector("#viewdetails").style.backgroundColor = "white";
  }
});
let submitbtnshipment = document.querySelector("#submitbtnshipment");
submitbtnshipment.addEventListener("click", (req, res) => {
  let result;
  fetch('/api/email', (req, res) => {
    result = res.globalemail;
    console.log(result);
    })
});