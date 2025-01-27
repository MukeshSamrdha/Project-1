let z = 0;
async function Login() {
  const response=await fetch("/LogedIn", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  response.json().then((result) => {
    z = result.Login;
    console.log(z);
    if (z==0) {
      document.querySelector("#profilebtn").style.display = "none";
      document.querySelector("#homelink").href = "/Login";     //change this first here 
     // console.log(z);
    } else {
      document.querySelector("#profilebtn").style.display = "block";
       document.querySelector("#homelink").href = "/Home";
      //console.log(z);
    }
   })
}
//  <div class="middleele"><a  href="/Login" id="homelink">Home</a></div>
  // async function getLogin(){
  //   let z = await Login();
  //   console.log(z);
  // }

//getLogin();
Login();
let mode = 0; // Default to light mode
let modebtn = document.querySelector("#modebtn");
let body3btns = document.querySelectorAll(".body3btns").forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelector("#loading").style.display = "block";
    setTimeout(() => {
        document.querySelector("#loading").style.display = "none";
    }, 3000);
  })
})
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
})
modebtn.addEventListener("click", () => {
  if (mode === 0) {
    // Dark mode styles
    mode = 1;
    document.querySelector("#modebtnimg").src = "/assets/sun-moon.svg";
    document.body.style.backgroundColor = "black";
    document.querySelectorAll("h1, h2, h3, p, a").forEach((ele) => {
      ele.style.color = "white";
    });
    document.querySelector("#main").style.backgroundColor = "#082F49";
    document.querySelector("#body1child2").style.backgroundColor = "#111827";
    document.querySelector("#body2").style.backgroundColor = "#111827";
    document.querySelectorAll("a").forEach((ele) => {
      ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
      ele.addEventListener("mouseout", () => (ele.style.color = "white"));
    });
    document.querySelector("#profileinfo").style.backgroundColor = "black";
  } else {
    // Light mode styles
    mode = 0;
      document.querySelector("#modebtnimg").src = "/assets/moon.svg";
    document.body.style.backgroundColor = "white";
    document.querySelectorAll("h1, h2, h3, p, a").forEach((ele) => {
      ele.style.color = "black";
    });
    document.querySelector("#main").style.backgroundColor = "#F0F9FF";
    document.querySelector("#body1child2").style.backgroundColor = "";
    document.querySelector("#body2").style.backgroundColor =
      "rgb(233, 233, 233)";
    document.querySelectorAll("a").forEach((ele) => {
      ele.addEventListener("mouseover", () => (ele.style.color = "#0369A1"));
      ele.addEventListener("mouseout", () => (ele.style.color = "black"));
    });
    document.querySelector("#profileinfo").style.backgroundColor = "white";
  }
})

