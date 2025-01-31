require("dotenv").config(); //Load the .env Variables
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otp_generator = require("otp-generator");
const CustomerModel = require("./models/CustomerSignUp");
const ShipmentModel = require("./models/ShipmentDetails");
const ContactModel = require("./models/Contact");
const RetailerModel = require("./models/RetailerSignUp");
const LoginoptModel = require("./models/Loginotp");
const LoginotpModel = require("./models/Loginotp");
let HOMEURL = "";

//functions
function sendAlert(res, message, redirect) {
  res.send(
    `<script>
      alert('${message}');
      window.location.href = '${redirect}';
    </script>
  `
  );
}
function promptgenerate(message) {
  `<script>
  let a=prompt('${message}');
  </script>`;
  return a;
}
function generateotp() {
  let otp = otp_generator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return otp;
}

const app = express();
let LogedIn = 0;
let otp = 0;
//package-lock.json has information about the modules in detail
//package.json has little information and what file to compile in starting the server

//set engine
app.set("view engine", "ejs");

//mongodb connection
const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then((result) => {
    app.listen(7000, "localhost", () => {
      console.log("connected to the desired port and database:7000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mode = 0;

//basic routes
app.get("/", (req, res) => {
  res.redirect("/Login");
});
app.get("/AboutUs", (req, res) => {
  res.render("AboutUs", { title: "AboutUs" });
});
app.get("/ContactUs", (req, res) => {
  let mode = req.body.mode;
  res.render("ContactUs", { title: "ContactUs", mode: mode });
});
app.get("/dark", (req, res) => {
  mode == 0 ? (mode = 1) : (mode = 0);
  res.redirect("/ContactUs", { mode: mode });
});
app.get("/Login", (req, res) => {
  res.render("Login", { title: "Login" });
});
app.get("/CustomerSignUp", (req, res) => {
  res.render("CustomerSignUp", { title: "SignUp" });
});
app.get("/RetailerSignUp", (req, res) => {
  res.render("RetailerSignUp", { title: "SignUp" });
});
//HOMEURL NOT DEFINED DOUBT
app.get("/Home", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  // Validate the 'id' before creating a new ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendAlert(res, "Invalid or missing user ID", "/Login");  
  }
  let _id = new mongoose.Types.ObjectId(id);
  CustomerModel.findOne({ _id }).then((Customer) => {
    let email = Customer.email;
    ShipmentModel.find({ email: email }).then((result) => {
      res.render("Home", { title: "Home", Result: Customer, Shipment: result });
    }).catch((err) => {
      console.log("Shipment loading failed");
    })
  }).catch((err) => {
    console.log(err);
  });
});
//LOGOUT
app.get("/LogedIn", (req, res) => {
   const urlParams = new URLSearchParams(req.query);
   const id = urlParams.get("id");
   // Validate the 'id' before creating a new ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
     return sendAlert(res, "Invalid or missing user ID", "/Login");
   }

  let _id = new mongoose.Types.ObjectId(id);
  let answer = { Login: LogedIn };
  res.status(200).json(answer);
});

app.get("/ForgotPassword", (req, res) => {
  res.render("ForgotPassword");
});
//OTP
app.get("/otp", (req, res) => {
  res.status(200).json({ OTP: otp });
});
app.get("/ShipmentArea", (req, res) => {
  let r = {
    fromaddress: null,
    toaddress: null,
    weightrange: null,
  };
  ShipmentModel.find().then((result) => {
     res.render("ShipmentArea", { title: "ShipmentArea",Shipment:result,Form:r});
  }).catch((err) => {
    console.log(err);
  })
})
app.get("/ShiperDashboard", (req, res) => {
  res.render("ShiperDashboard", { title: "ShiperDashboard" });
});

//post requests  //processing
//LOGOUT
app.post("/LogedOut", (req, res) => { //change
  const { email, loged } = req.body; // Extract 'Login' value from the request body
  LoginotpModel.updateOne({ email }, { loged }).then(() => {
    // res.status(200).send("Login status received successfully"); // Sends a success response
    res.status(200).send("Response sended successfully");
  }).catch((err) => {
    console.log(err);
  })
});
//ADD HOMEURL
app.post("/CustomerSignUp", (req, res) => {
  const Customers = new CustomerModel(req.body);
  let emailid = req.body.email;
  CustomerModel.find()
    .then((result) => {
      let k = 1;
      let j = 0;
      for (let i of result) {
        if (i.email == emailid) {
          k = 0;
          j = i;
          break;
        }
      }
      if (k) {
        if (req.body.createpassword == req.body.verifypassword) {
          Customers.save()
            .then((result) => {
              let record = new LoginoptModel({
                email: emailid,
                otp: "",
                loged: true,
                mode: 0
              });
              record
                .save()
                .then(() => {
                  console.log("Saved Details Successfully");
                   HOMEURL = result._id;
                   sendAlert(res, "Login Successful", "/Home?id=" + HOMEURL);
                })
                .catch((err) => {
                  console.log("Failed to load Details");
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log("submission failed");
              console.log(err);
            });
        } else {
          sendAlert(
            res,
            "Passwords Mismatched,please enter carefully",
            "/CustomerSignUp"
          );
        }
      } else {
        sendAlert(res, "Email Already Exists,kindly Login", "/Login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//logins
app.post("/CustSignIn", (req, res) => {
  let email = req.body.custemail;
  let password = req.body.custpassword;
  let k = CustomerModel.findOne({ email })
    .then((result) => {
      if (result != null) {
        if (result.verifypassword == password) {
          let login = { loged: true };
          LoginoptModel.updateOne({email}, login).then(() => {
             HOMEURL = result._id;
             sendAlert(res, "Login Successful", "/Home?id=" + HOMEURL);
          }).catch((err) => {
            console.log(err);
          })
        } else {
          sendAlert(
            res,
            "Incorrect Password,try again or click forgot password",
            "/Login"
          );
        }
      } else {
        sendAlert(res, "Email does not exist,please signup", "/CustomerSignUp");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/SubmitShipment", (req, res) => {
  const shipment = new ShipmentModel(req.body);
  let email = req.body.email;
  CustomerModel.findOne({ email }).then((result) => {
    shipment
      .save()
      .then(() => {
        HOMEURL = result._id;
        sendAlert(res, "Shipment Submitted Successfully", "/Home?id=" + HOMEURL);
      })
      .catch((err) => {
        console.log("failed");
      });
  }).catch((err) => {
    console.log(err);
  })
});

//Conatct Form Submission
app.post("/ContactForm", (req, res) => {
  const ContactRecord = new ContactModel(req.body);
  ContactRecord.save()
    .then((result) => {
      console.log("Form Submitted Successfully");
      sendAlert(res, "Response Saved Successfully", "/ContactUS");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/ForgotPassword", (req, res) => {
  let email = req.body.email;
  CustomerModel.findOne({ email }).then((result) => {
    if (result == null) {
      sendAlert(
        res,
        "Email Does Not Exist,Please Create An Accout",
        "/CustomerSignUp"
      );
    } else {
      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mukeshsamardhaginne@gmail.com",
          pass: "tdqr pbuy oxzl gdiy",
        },
      });
      otp = generateotp();
      const mailoptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: "ShipIt Password Recovery",
        html: `<P>Don't worry, you lost your account. Type this OTP to retrieve it back:<br><h2>${otp}</h2></p>`,
      };
      transport.sendMail(mailoptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    }
  });
});

app.post("/NewPassword", async (req, res) => {
  const Email = { email: req.body.email };
  const email = req.body.email;
  await CustomerModel.findOne({ email }).then((result) => {
      const pass = {
        createpassword: req.body.newpassword,
        verifypassword: req.body.newpassword,
      };
      CustomerModel.updateOne(Email, pass)
        .then(() => {
           let login = { loged: true };
           LoginoptModel.updateOne({ email }, login)
             .then(() => {
               HOMEURL = result._id;
               //  res.redirect("/AboutUs");
                
               sendAlert(res, "Login Successful", "/Home?id=" + HOMEURL);
             })
             .catch((err) => {
               console.log("error1");
               console.log("error");
             });
        }).catch((err) => {
          console.log("error2");
      console.log(err);
    })
  }).catch((err) => {
    console.log("error3");
    console.log(err);
  })
});

app.post("/RetailerSignUp", (req, res) => {
  const Retailer = new RetailerModel(req.body);
  if (req.body.confirmpassword == req.body.verifypassword) {
    Retailer.save()
      .then((result) => {})
      .catch((err) => {
        console.log("Login failed");
      });
  } else {
    sendAlert(res, "Password mismatch,please try again", "/RetailerSignUp");
  }
});

app.post("/ShipmentArea", (req, res) => {
  //no need model if u are not stroing the details
  ShipmentModel.find().then((result) => {
      res.render("ShipmentArea", { title: "ShipmentArea",Shipment:result,Form:req.body });
  }).catch((err) => {
    console.log(err);
  })
});
//start
//post for changing mode
//----------------------------------------------------------------
//end

//4o4 page
app.use((req, res) => {
  res.render("4o4page");
});
