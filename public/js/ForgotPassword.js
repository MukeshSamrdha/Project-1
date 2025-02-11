let verified = 0;
const otp = document.querySelector("#otp");
const email = document.querySelector("#email");
const newpassword = document.querySelector("#changepassword");
const sendopt = document.querySelector("#sendotp");
async function getotp() {
    let b;
    const response = await fetch("http://localhost:7000/otp", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    await response.json().then((result) => {
        b=result.OTP;
    }).catch((err) => {
        console.log(err);
    })
    return b;
}
// async function postpassword(password) {
//     fetch("http://localhost:7000/NewPassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: json().stringify({ NewPassword: password })
//     })
// }
sendopt.addEventListener("click", () => {
    alert("Click! Ok To Receive An OTP,Check Your Email");
})
otp.addEventListener("click", async () => {
    await getotp().then((result) => {
           let a = prompt(
             "Please enter the OTP"
           );
           console.log(a);
        if (a == result){
            verified = 1;
        alert("Verification Done,please change your password");
    }else{
        alert("try again! the otp you entered is incorrect");
    }
    })
})

newpassword.addEventListener("click", () => {
    console.log("HI");
    if (verified == 1) {
        document.querySelector("#passworddiv").style.display = "block";
        document.querySelector("#newpassword").required = "true";
        document.querySelector("#submitpassword").style.display = "block";
        document.querySelector("form").action = "/NewPassword";
    } else {
        alert("To proceed,verfiy first");
    }
});
