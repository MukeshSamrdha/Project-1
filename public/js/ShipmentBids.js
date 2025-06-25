
async function details(id) {
    try {
        let response = await fetch("/Retailerdetails?id=" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.Result;
    } catch (err) {
            console.log(err);
        }
}

 function redirect() {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
   return id;
}
function getshipmentid() {
     const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("shipmentid");
   return id;
 }
let id = redirect();
document.querySelector("#homebtn").addEventListener("click", () => {
    window.location.href = "/Home?id=" + id;
})
function checkactiveshipments(kou) {
  let array = document.querySelectorAll(".shiperbids");
  if (kou == array.length) {
      document.querySelector("#noactiveshipers").style.display = "flex";
  }
}
  let kou = 0;
document.querySelectorAll(".shiperbids").forEach(async (ele) => {
    let child = ele.children; 
    let id = child[0].getAttribute('class');
    let getdetails = await details(id);
    if (getdetails.state == 1) {
        kou++;
        ele.style.display = "none"; 
     };
    document.querySelectorAll('.n' + id).forEach((ele) => {
        ele.innerHTML = "FirstName:" + getdetails.fullname;
    })
    document.querySelectorAll('.v' + id).forEach((ele) =>{
        ele.innerHTML = "Vechile:" + getdetails.drivingliscence;
    })
    document.querySelectorAll('.r' + id).forEach((ele) => {
        ele.innerHTML = "Ratings:" + getdetails.ratings;
    })
    checkactiveshipments(kou);
})

let acceptbids = document.querySelectorAll(".acceptbid");
acceptbids.forEach(async (ele) => {
    ele.addEventListener("click", () => {
        let shiperid = ele.getAttribute("id").slice(2, 26);
        let bestprice = ele.getAttribute("id").slice(26);
        fetch("/AcceptBid?shiperid=" + shiperid + "&shipmentid=" + getshipmentid()+"&id="+id+"&bestprice="+bestprice, {
            method: "POST",
            headers:{"Content-Type":"application/json"}
        }).then(() => {
            console.log("HI");
            alert("The Delivery Of This Shipment Has Started");
            window.location.href = "/Home?id=" + id;
        })
    })
})

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
        document.querySelector("#notediv").style.backgroundColor = "#082F49";
        document.querySelectorAll(".shiperbids").forEach((ele) => {
            ele.style.backgroundColor = "#082F49";
        });
        document.querySelectorAll("li").forEach((ele) => {
            ele.style.color = "white";
        });
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
        document.querySelector("#notediv").style.backgroundColor = "#F0F9FF";
        document.querySelectorAll(".shiperbids").forEach((ele) => {
            ele.style.backgroundColor = "#F0F9FF";
        });
        document.querySelectorAll("li").forEach((ele) => {
            ele.style.color = "black";
        })
    }

    function changemodeclick(mode) {
        if (mode == "0") {
            mode = "1";
            fetch("/Mode?id=" + id, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Mode: mode }),
            })
                .then(() => {
                    mode = 1;
                     document.querySelector("#modebtnimg").src =
                       "/assets/sun-moon.svg";
                     document.querySelector("body").style.backgroundColor =
                       "black";
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
                     document.querySelector("#notediv").style.backgroundColor =
                       "#082F49";
                     document.querySelectorAll(".shiperbids").forEach((ele) => {
                       ele.style.backgroundColor = "#082F49";
                     });
                     document.querySelectorAll("li").forEach((ele) => {
                       ele.style.color = "white";
                     });
                })
                .catch((err) => {
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
                    document.querySelector("#notediv").style.backgroundColor = "#F0F9FF";
                    document.querySelectorAll(".shiperbids").forEach((ele) => {
                        ele.style.backgroundColor = "#F0F9FF";
                    });
                    document.querySelectorAll("li").forEach((ele) => {
                        ele.style.color = "black";
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return mode;
    }

    let modebtn = document.querySelector("#modebtn");
    modebtn.addEventListener("click", () => {
        mode = changemodeclick(mode);
    });

}