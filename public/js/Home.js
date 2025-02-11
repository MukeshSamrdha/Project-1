
let btns = document.querySelectorAll(".ysb");
 function redirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}
btns.forEach((ele) => {
    ele.addEventListener("click", () => {
        let id = ele.getAttribute("id");
        if (id == "ysbcs"){
            document.querySelector("#ysbcs").style.backgroundColor = "#0284C7";
            document.querySelector("#ysbcs").style.color = "white";
            document.querySelector("#ysbps").style.backgroundColor = "white";
          document.querySelector("#ysbps").style.color = "black";
            document.querySelector("#ysbrt").style.backgroundColor = "white";
            document.querySelector("#ysbrt").style.color = "black";
          document.querySelector("#displaysection").style.display = "flex";
          document.querySelector("#displaysectionpast").style.display = "none";
          document.querySelector("#displaysectionready").style.display = "none";
        }else if(id=="ysbrt"){
              document.querySelector("#ysbcs").style.backgroundColor ="white";
              document.querySelector("#ysbcs").style.color = "black";
              document.querySelector("#ysbps").style.backgroundColor = "white";
          document.querySelector("#ysbps").style.color = "black";
            document.querySelector("#ysbrt").style.backgroundColor = "#0284C7";
            document.querySelector("#ysbrt").style.color = "white";
            document.querySelector("#displaysection").style.display = "none";
            document.querySelector("#displaysectionpast").style.display = "none";
            document.querySelector("#displaysectionready").style.display = "flex";
        }else {
           document.querySelector("#ysbcs").style.backgroundColor ="white";
              document.querySelector("#ysbcs").style.color = "black";
              document.querySelector("#ysbps").style.backgroundColor = "#0284C7";
          document.querySelector("#ysbps").style.color = "white";
            document.querySelector("#ysbrt").style.backgroundColor = "white";
            document.querySelector("#ysbrt").style.color = "black";
            document.querySelector("#displaysection").style.display = "none";
          document.querySelector("#displaysectionpast").style.display = "flex";
            document.querySelector("#displaysectionready").style.display = "none";
        }
    })
})
document.querySelectorAll(".viewdetailsbtnready").forEach((ele) => {
  let sid = ele.getAttribute('id');
  ele.addEventListener("click", () => {
    window.location.href = "/ShipmentBids?id=" + id + "&shipmentid=" + sid;
  })
})
let id = redirect();
document.querySelector("#aboutus").href = "/AboutUs?id=" + id;
document.querySelector("#contactus").href = "/ContactUs?id=" + id;
document.querySelector("#homelink").href = "/Home?id=" + id;
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
  },5000);
  setTimeout(() => {
    let Logout = false; 
    let email = document.querySelector("#emailhead").innerHTML;
    fetch("http://localhost:7000/LogedOut",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:email,
        loged: Logout 
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

  },2000);
});
let closex = document.querySelectorAll(".closex");
closex.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelectorAll(".viewdetails").forEach((ele) => {
      document.body.style.overflow = "auto";
      ele.style.display = "none";
    });
  });
});

let viewdetailsbtn = document.querySelectorAll(".viewdetailsbtn");
viewdetailsbtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    let id = ele.getAttribute("id");
    let k = id.slice(14);
    let newid = "#viewdetails" + k;
    document.querySelector(newid).style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.querySelector(newid).style.backdropFilter = "blur(10px)";
  });
});

let mode;
async function getmode(){  //onload
  return fetch("/Mode?id=" + id, {
    method: "GET",
    headers: { "Content-Type": "Application/JSON" },
  }).then((result) => result.json()).then((Answer) => {
    return Answer.Mode;
  })
}
async function mode1() {
  document.querySelector("#loading").style.display = "block";
  setTimeout(()=>{
   document.querySelector("#loading").style.display = "none";
  }, 3000);
  mode = await getmode();
  changemode(mode);
}
document.addEventListener("DOMContentLoaded", () => {
  mode1();
})
function changemode(mode){
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
     });
    document.querySelector("#yourshipments").style.backgroundColor = "#111827";
     document.querySelectorAll(".di").forEach((ele) => {
       ele.style.backgroundColor = "black";
     });
     document.querySelector("#imghead").style.backgroundColor =
      "rgb(63, 29, 13)";
     document.querySelectorAll(".viewdetails").forEach((ele) => {
       ele.style.backgroundColor = "black";
     });
    document.querySelector("#profileinfo").style.backgroundColor = "black";
    document.querySelectorAll(".noshipment").forEach((ele) => {
           ele.style.backgroundColor = "black";
         })
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
    document.querySelectorAll(".viewdetails").forEach((ele) => {
      ele.style.backgroundColor = "white";
    });        
     document.querySelectorAll(".noshipment").forEach((ele) => {
       ele.style.backgroundColor = "white";
     });
  }
}

function changemodeclick(mode){
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
        });
        document.querySelector("#yourshipments").style.backgroundColor =
          "#111827";
        document.querySelectorAll(".di").forEach((ele) => {
          ele.style.backgroundColor = "black";
        });
        document.querySelector("#imghead").style.backgroundColor =
          "rgb(63, 29, 13)";
        document.querySelector("#profileinfo").style.backgroundColor = "black";
        document.querySelectorAll(".viewdetails").forEach((ele) => {
          ele.style.backgroundColor = "black";
        });
         document.querySelectorAll(".noshipment").forEach((ele) => {
           ele.style.backgroundColor = "black";
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
    }).then(() => {
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
        document.querySelectorAll(".viewdetails").forEach((ele) => {
          ele.style.backgroundColor = "white";
        });              
       document.querySelectorAll(".noshipment").forEach((ele) => {
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
  mode=changemodeclick(mode);
});