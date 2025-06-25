let verified = 0;
const otp = document.querySelector("#otp");
const email = document.querySelector("#email");
const newpassword = document.querySelector("#changepassword");
const sendopt = document.querySelector("#sendotp");

sendopt.addEventListener("click", () => {
    alert("Click! Ok To Receive An OTP,Check Your Email");
})
otp.addEventListener("click", async () => {
  let a = prompt('please enter the received otp');
  if (!a) {
    alert("No OTP provided");
    return;
  }
    const response = await fetch("/otpr?email=" + email.value, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
        if (a == data.OTP){
            verified = 1;
            alert("Verification Done,please change your password");
            document.querySelector("#sendotp").style.display = "none";
            document.querySelector("#otp").style.display = "none";
             document.querySelector("#passworddiv").style.display = "block";
             document.querySelector("#newpassword").required = "true";
             document.querySelector("#submitpassword").style.display = "block";
             document.querySelector("form").action = "/NewPasswordR";
    }else{
        alert("try again! the otp you entered is incorrect");
    }
    })

