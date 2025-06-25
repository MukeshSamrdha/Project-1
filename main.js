require("dotenv").config(); //Load the .env Variables
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otp_generator = require("otp-generator");
const CustomerModel = require("./models/CustomerSignUp");
const ShipmentModel = require("./models/ShipmentDetails");
const ContactModel = require("./models/Contact");
const RetailerModel = require("./models/RetailerSignUp");
const LoginotpModel = require("./models/Loginotp");
const LoginotpModelr = require("./models/Loginotpr");
const { send } = require("process");
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

async function updateShipments() {
  let rdate = new Date();
  let result = await ShipmentModel.find();
  for (let i = 0; i < result.length; i++) {
   // console.log("hi");
   // console.log("hello");
    if (result[i].status == 1) {
      console.log("HI");
      let k = rdate.setHours(0, 0, 0, 0);
      let m = result[i].pud.setHours(0, 0, 0, 0);
      if (rdate.getTime() === result[i].pud.getTime()) {
        console.log("hiiii");
        let _id = new mongoose.Types.ObjectId(result[i]._id);
        //  console.log(_id);
        ShipmentModel.updateOne({ _id }, { status: 0 })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
}
// setInterval(() => {
//   updateShipments();
// }, 100000);

//api's for lisence and vechile regrestration
async function initiateDLVerification(idNumber, dateOfBirth) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: "eve.idfy.com",
      path: "/v3/tasks/async/verify_with_source/ind_driving_license",
      headers: {
        "Content-Type": "application/json",
        "account-id": process.env.IDFY_ACCOUNT_ID,
        "api-key": process.env.IDFY_API_KEY,
      },
      maxRedirects: 20,
    };

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        resolve(body.request_id); // Obtain the request ID
      });
      res.on("error", (error) => reject(error));
    });

    const postData = JSON.stringify({
      task_id: process.env.DRIVING_LICENSE_TASK_ID,
      group_id: process.env.DRIVING_LICENSE_GROUP_ID,
      data: {
        id_number: idNumber,
        date_of_birth: dateOfBirth,
        advanced_details: {
          state_info: true,
          age_info: true,
        },
      },
    });

    req.write(postData);
    req.end();
  });
}

async function checkDLVerificationStatus(requestId) {
  return new Promise((resolve, reject) => {
    const interval = 5000; // Interval between checks in milliseconds
    const timeout = 60000; // Maximum time to wait before timing out
    let elapsedTime = 0;

    const poll = () => {
      const options = {
        method: "GET",
        hostname: "eve.idfy.com",
        path: `/v3/tasks?request_id=${requestId}`,
        headers: {
          "api-key": process.env.IDFY_API_KEY,
          "Content-Type": "application/json",
          "account-id": process.env.IDFY_ACCOUNT_ID,
        },
        maxRedirects: 20,
      };

      const req = https.request(options, (res) => {
        let chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const responseString = Buffer.concat(chunks).toString();

          let body;
          try {
            body = JSON.parse(responseString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return reject(error);
          }

          // Access the first task in the response array
          const task = body[0];
          console.log("Task:Driving license \n", task);

          // Check if the task has a "completed_at" field
          if (task.completed_at) {
            const sourceOutput = task.result?.source_output;
            if (sourceOutput) {
              // Process the sourceOutput data
              // Check if validity dates are present
              if (
                sourceOutput.nt_validity_from &&
                sourceOutput.nt_validity_to
              ) {
                const validityFrom = new Date(sourceOutput.nt_validity_from);
                const validityTo = new Date(sourceOutput.nt_validity_to);
                const currentDate = new Date();

                // Check if current date is within validity period
                if (currentDate >= validityFrom && currentDate <= validityTo) {
                  return resolve({
                    valid: true,
                    DL_Address: sourceOutput.address, // Save address as DL_Address
                    state: sourceOutput.state,
                  });
                } else {
                  return resolve({ valid: false });
                }
              } else {
                console.error("Validity dates not found in source_output");
                return resolve({ valid: false });
              }
            } else {
              console.error("No source_output found in task result");
              return reject(new Error("No source_output in task result"));
            }
          } else if (task.status === "failed") {
            console.error("Verification task failed");
            return reject(new Error("Verification task failed"));
          } else if (task.status === "in_progress") {
            // Wait and poll again
            if (elapsedTime < timeout) {
              elapsedTime += interval;
              console.log(
                `Verification in progress... Retrying in ${
                  interval / 1000
                } seconds.`
              );
              setTimeout(poll, interval);
            } else {
              console.error("Verification timed out");
              return reject(new Error("Verification timed out"));
            }
          } else {
            console.error(`Unknown task status: ${task.status}`);
            return reject(new Error(`Unknown task status: ${task.status}`));
          }
        });
        res.on("error", (error) => {
          console.error("Request Error:", error);
          reject(error);
        });
      });

      req.on("error", (error) => {
        console.error("Request Error:", error);
        reject(error);
      });

      req.end();
    };

    // Start polling
    poll();
  });
}

async function initiateVehicleVerification(rcNumber) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: "eve.idfy.com",
      path: "/v3/tasks/async/verify_with_source/ind_rc_basic",
      headers: {
        "Content-Type": "application/json",
        "account-id": process.env.IDFY_ACCOUNT_ID,
        "api-key": process.env.IDFY_API_KEY,
      },
      maxRedirects: 20,
    };

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        resolve(body.request_id);
      });
      res.on("error", (error) => reject(error));
    });

    const postData = JSON.stringify({
      task_id: process.env.VEHICLE_TASK_ID,
      group_id: process.env.VEHICLE_GROUP_ID,
      data: {
        rc_number: rcNumber,
      },
    });

    req.write(postData);
    req.end();
  });
}

async function checkVehicleVerificationStatus(requestId) {
  return new Promise((resolve, reject) => {
    const interval = 5000; // Interval between checks in milliseconds
    const timeout = 60000; // Maximum time to wait before timing out
    let elapsedTime = 0;

    const poll = () => {
      const options = {
        method: "GET",
        hostname: "eve.idfy.com",
        path: `/v3/tasks?request_id=${requestId}`,
        headers: {
          "api-key": process.env.IDFY_API_KEY,
          "Content-Type": "application/json",
          "account-id": process.env.IDFY_ACCOUNT_ID,
        },
        maxRedirects: 20,
      };

      const req = https.request(options, (res) => {
        let chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const responseString = Buffer.concat(chunks).toString();
          let body;

          try {
            body = JSON.parse(responseString);
          } catch (error) {
            return reject(error);
          }

          const task = body[0];
          console.log("Task:Vehicle Registration \n", task);

          if (task.completed_at) {
            const extractionOutput = task.result?.extraction_output;
            if (extractionOutput) {
              if (new Date(extractionOutput.fitness_upto) > new Date()) {
                return resolve({
                  valid: true,
                  vehicleClass: extractionOutput.vehicle_class,
                  registrationNumber: extractionOutput.registration_number,
                  maker_model: extractionOutput.maker_model,
                  avg_gross_vehicle_weight:
                    extractionOutput.avg_gross_vehicle_weight,
                  unladen_weight: extractionOutput.unladen_weight,
                });
              } else {
                return resolve({ valid: false });
              }
            } else {
              return reject(new Error("No extraction_output in task result"));
            }
          } else if (task.status === "failed") {
            return reject(new Error("Verification task failed"));
          } else if (task.status === "in_progress") {
            if (elapsedTime < timeout) {
              elapsedTime += interval;
              setTimeout(poll, interval);
            } else {
              return reject(new Error("Verification timed out"));
            }
          } else {
            return reject(new Error(`Unknown task status: ${task.status}`));
          }
        });
        res.on("error", (error) => reject(error));
      });

      req.on("error", (error) => reject(error));
      req.end();
    };

    poll();
  });
}

//update shipmets for every 2 sec  function rai ikkada
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
app.get("/AboutUsR", (req, res) => {
  res.render("AboutUsR", { title: "AboutUs" });
});
app.get("/ContactUs", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  if (id.length == 24) {
    const _id = new mongoose.Types.ObjectId(id);
    CustomerModel.findOne({ _id })
      .then(() => {
        res.render("ContactUs", { title: "ContactUs" });
      })
      .catch((err) => {
        sendAlert(res, "Please Login", "/Login");
      });
  } else {
    sendAlert(res, "Please Login", "/Login");
  }
});
app.get("/ContactUsR", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne({ _id }).then(() => {
    res.render("ContactUsR", { title: "ContactUs" });
  });
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
  CustomerModel.findOne({ _id })
    .then((Customer) => {
      let email = Customer.email;
      ShipmentModel.find({ email: email })
        .then((result) => {
          //console.log(result);
          res.render("Home", {
            title: "Home",
            Result: Customer,
            Shipment: result,
          });
        })
        .catch((err) => {
          console.log("Shipment loading failed");
        });
    })
    .catch((err) => {
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
app.get("/ForgotPasswordR", (req, res) => {
  res.render("ForgotPasswordR");
});
//OTP
app.get("/otp", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const email = urlParams.get('email');
  console.log(email);
  LoginotpModel.findOne({ email }).then((result) => {
    let otp = result.otp;
    console.log(result.otp);
     res.status(200).send({ OTP: otp });
  }).catch((err) => {
    console.log(err);
  })
});
app.get("/otpr", (req, res) => {
   const urlParams = new URLSearchParams(req.query);
   const email = urlParams.get("email");
  console.log(email);
  LoginotpModelr.findOne({ email })
    .then((result) => {
      let otp = result.otp;
      console.log(result.otp);
      res.status(200).send({ OTP: otp });
    })
    .catch((err) => {
      console.log(err);
    });
})
app.get("/ShipmentArea", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne({ _id })
    .then(() => {
      let r = {
        fromaddress: null,
        toaddress: null,
        weightrange: null,
      };
      ShipmentModel.find()
        .then((result) => {
          res.render("ShipmentArea", {
            title: "ShipmentArea",
            Shipment: result,
            Form: r,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/ShipmentBids", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  const shipmentid = urlParams.get("shipmentid");
  const sid = new mongoose.Types.ObjectId(shipmentid);
  CustomerModel.findOne({ _id })
    .then(() => {
      ShipmentModel.findOne({ _id: sid })
        .then((result) => {
          let Result = result.bid;
          res.render("Shipmentbids", { title: "ShipmentBids", Bids: Result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ShipmentMybids", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne({ _id })
    .then((result) => {
      res.render("ShipmentMybids", {
        title: "MyBids",
        Shipment: result.shipments,
      });
    })
    .catch(() => {
      sendAlert(res, "Invalid UserID", "/ShiperDashboard?=" + id);
    });
});
app.get("/ShiperDashboard", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne(_id)
    .then((Retailer) => {
      res.render("ShiperDashboard", {
        title: "ShiperDashboard",
        Result: Retailer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/Mode", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  let _id = new mongoose.Types.ObjectId(id);
  CustomerModel.findOne({ _id })
    .then((Customer) => {
      let mode = Customer.mode;
      res.status(200).send({ Mode: mode });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ModeR", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  let _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne({ _id })
    .then((Retailer) => {
      let mode = Retailer.mode;
      res.status(200).send({ Mode: mode });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ShipmentInfo", (req, res) => {
  let urlParams = new URLSearchParams(req.query);
  let id = urlParams.get("id");
  let shipmentid = urlParams.get("shipmentid");
  const _id = new mongoose.Types.ObjectId(id);
  const shipment_id = new mongoose.Types.ObjectId(shipmentid);
  // console.log(_id);
  //console.log(shipment_id);
  RetailerModel.findOne({ _id })
    .then(() => {
      ShipmentModel.findOne({ _id: shipment_id })
        .then((result) => {
          res.render("ShipmentInfo", {
            title: "ShipmentInfo",
            Shipment: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/Shipmentdetails", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  ShipmentModel.findOne({ _id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/Retailerdetails", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  RetailerModel.findOne({ _id })
    .then((result) => {
      res.status(200).send({ Result: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/TrackerPage", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  const shipmentid = urlParams.get("shipmentid");
  const _sid = new mongoose.Types.ObjectId(shipmentid);
  CustomerModel.findOne({ _id })
    .then(() => {
      ShipmentModel.findOne({ _id: _sid })
        .then((result) => {
          res.render("TrackerPage", { title: "Tracking", Result: result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/RatingsPage", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get('id');
  const _id = new mongoose.Types.ObjectId(id);
  CustomerModel.findOne({ _id }).then(() => {
    res.render("RatingsPage", { title: "RatingsPage" });
  }).catch((err) => {
    console.log(err);
  })
  res.render("RatingsPage",{title:"Ratings Page"});
})
//post requests  //processing

app.post("/LogedOut", (req, res) => {
  const { email, loged } = req.body;
  LoginotpModel.updateOne({ email }, { loged })
    .then(() => {
      res.status(200).send("Updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/LogedOutR", (req, res) => {
  const { email, loged } = req.body;
  LoginotpModelr.updateOne({ email }, { loged }).then(() => {
    res.status(200).send("Updated successfully");
  }).catch((err) => {
    console.log(err);
  })
})
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
              let record = new LoginotpModel({
                email: emailid,
                otp: "",
                loged: true,
              });
              record
                .save()
                .then(() => {
                  console.log("Saved Details Successfully");
                  let HOMEURL = result._id;
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
          LoginotpModel.updateOne({ email }, login)
            .then(() => {
              HOMEURL = result._id;
              sendAlert(res, "Login Successful", "/Home?id=" + HOMEURL);
            })
            .catch((err) => {
              console.log(err);
            });
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
  CustomerModel.findOne({ email })
    .then((result) => {
      shipment
        .save()
        .then(() => {
          HOMEURL = result._id;
          sendAlert(
            res,
            "Shipment Submitted Successfully",
            "/Home?id=" + HOMEURL
          );
        })
        .catch((err) => {
          console.log("failed");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Conatct Form Submission
app.post("/ContactForm", (req, res) => {
  const ContactRecord = new ContactModel(req.body);
  ContactRecord.save()
    .then((result) => {
      const urlParams = new URLSearchParams(req.query);
      const id = urlParams.get("id");
      let _id = new mongoose.Types.ObjectId(id);
      CustomerModel.findOne({ _id }).then(() => {
        sendAlert(res, "Response Saved Successfully", "/ContactUS?id=" + id);
      });
    })
    .catch((err) => {
      console.log("HI");
      console.log(err);
    });
});

app.post("/ForgotPassword", (req, res) => {
  let email = req.body.email;
  //console.log(email);
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
      LoginotpModel.updateOne({ email }, { otp }).then(() => {
        console.log("otp saved successfully");
      })
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
  await CustomerModel.findOne({ email })
    .then((result) => {
      const pass = {
        createpassword: req.body.newpassword,
        verifypassword: req.body.newpassword,
      };
      CustomerModel.updateOne(Email, pass)
        .then(() => {
          let login = { loged: true };
          LoginotpModel.updateOne({ email }, login)
            .then(() => {
              HOMEURL = result._id;
              //  res.redirect("/AboutUs");

              sendAlert(res, "Login Successful", "/Home?id=" + HOMEURL);
            })
            .catch((err) => {
              console.log("error1");
              console.log("error");
            });
        })
        .catch((err) => {
          console.log("error2");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("error3");
      console.log(err);
    });
});

app.post("/ForgotPasswordR", (req, res) => {
  let email = req.body.email;
    RetailerModel.findOne({ email }).then((result) => {
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
      LoginotpModelr.updateOne({ email }, { otp }).then(() => {
        console.log("otp saved successfully");
      })
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

app.post("/NewPasswordR", async (req, res) => {
  const Email = { email: req.body.email };
  const email = req.body.email;
  await RetailerModel.findOne({ email })
    .then((result) => {
      const pass = {
        createpassword: req.body.newpassword,
        verifypassword: req.body.newpassword,
      };
      RetailerModel.updateOne(Email, pass)
        .then(() => {
          let login = { loged: true };
          LoginotpModelr.updateOne({ email }, login)
            .then(() => {
              HOMEURL = result._id;
              //  res.redirect("/AboutUs");

              sendAlert(
                res,
                "Login Successful",
                "/ShiperDashboard?id=" + HOMEURL
              );
            })
            .catch((err) => {
              console.log("error1");
              console.log("error");
            });
        })
        .catch((err) => {
          console.log("error2");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("error3");
      console.log(err);
    });
});

app.post("/RetailerSignUp", async (req, res) => {
  const Retailer = new RetailerModel(req.body);
  let email = req.body.email;
  RetailerModel.findOne({ email }).then(async (Result) => {
    if (Result == null) {
      if (req.body.confirmpassword == req.body.verifypassword) {
        console.log(req.body.dob);
        try {
          // Initiate Driving License Verification
          const dlRequestId = await initiateDLVerification(
            req.body.drivingliscence,
            req.body.dob
          );
          console.log(dlRequestId);
          const dlVerificationResult = await checkDLVerificationStatus(
            dlRequestId
          );
          console.log(dlVerificationResult);

          if (!dlVerificationResult.valid) {
            return sendAlert(
              res,
              "Driving License is not valid for transport use",
              "/shipperRegistration"
            );
          }
          if (dlVerificationResult.valid) {
            console.log("Driving License Verification Successfull");
          }

          //Initiate Vehicle Registration Verification
          const vehicleRequestId = await initiateVehicleVerification(
            req.body.vr
          );
          const vehicleVerificationResult =
            await checkVehicleVerificationStatus(vehicleRequestId);

          // Handle failed vehicle registration validation
          if (!vehicleVerificationResult.valid) {
            return sendAlert(
              res,
              "Vehicle registration number is invalid or fitness has expired. Please check and try again.",
              "/shipperRegistration"
            );
          }
          if (!vehicleVerificationResult.valid) {
            console.log("Vehicle Registration Verification Successfull");
          }
          let Capacity =
            vehicleVerificationResult.avg_gross_vehicle_weight -
            vehicleVerificationResult.unladen_weight;
          Retailer.capacity = Capacity;
          Retailer.save()
            .then((result) => {
              console.log("Saved Successfully");
              console.log(result);
                 let record = new LoginotpModelr({
                   email:Retailer.email,
                   otp: "",
                   loged: true,
                 });
                 record
                   .save()
                   .then(() => {
                     console.log("Saved Details Successfully");
                     sendAlert(res, "Login Successful", "/ShiperDashboard?id=" +Retailer._id);
                   })
                   .catch((err) => {
                     console.log("Failed to load Details");
                     console.log(err);
                   });
            })
            .catch((err) => {
              console.log(err);
              console.log("Login failed");
            });
        } catch (error) {
          if (error.message && error.message.includes("BAD_REQUEST")) {
            sendAlert(
              res,
              "Vehicle registration number is invalid. Please enter a valid RC number.",
              "/shipperRegistration"
            );
          }
          if (
            error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.email
          ) {
            return sendAlert(
              res,
              "User with this email already exists. Please use a different email.",
              "/shipperRegistration"
            );
          }

          console.error(error);
          sendAlert(
            res,
            "An error occurred during registration. Please try again later.",
            "/shipperRegistration"
          );
        }
      } else {
        sendAlert(res, "Password mismatch,please try again", "/RetailerSignUp");
      }
    } else {
      sendAlert(res, "Email Already Exists,kindly login", "/Login");
    }
  });
});

app.post("/RetaSignInn", (req, res) => {
  let Email = req.body.retaemail;
  let password = req.body.retapassword;
  RetailerModel.findOne({ email: Email }).then((Retailer) => {
    if (Retailer == null) {
      // sendAlert(res, "Email Doesn't Exist,Please SignUP", "/RetailerSignUp");
      res.send(`
    <script>
      alert("Email doesn't exist , Please Sign Up");
      window.location.href = "/RetailerSignUp";
    </script>
  `);
    } else {
      if (Retailer.confirmpassword == password) {
        let login = { loged: true };
        let email = Retailer.email;
        LoginotpModelr.updateOne({ email }, login).then(() => {
          let id = Retailer._id;
            sendAlert(res, "Login Successful", "/ShiperDashboard?id=" + id);
        }).catch((err) => {
          console.log(err);
         })
      } else {
        sendAlert(
          res,
          "Incorrect Password,try again or click forgot password",
          "/Login#RetaSignIn"
        );
      }
    }
  });
});

app.post("/Mode", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  const Mode = { mode: req.body.Mode };
  CustomerModel.updateOne({ _id: _id }, Mode)
    .then((result) => {
      res.status(200).send("Successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/ModeR", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  const Mode = { mode: req.body.Mode };
  RetailerModel.updateOne({ _id: _id }, Mode)
    .then((result) => {
      res.status(200).send("Successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/ShipmentArea", (req, res) => {
  let r = { weightrange: req.body.weightrange };
  ShipmentModel.find({ fcity: req.body.fromaddress }).then((result) => {
    res.render("ShipmentArea", {
      title: "ShipmentArea",
      Shipment: result,
      Form: r,
    });
  });
});

app.post("/PlaceBid", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const _id = new mongoose.Types.ObjectId(id);
  const sid = urlParams.get("shipmentid");
  const shipmentid = new mongoose.Types.ObjectId(sid);
  let bidprice = req.body.bidamount;
  RetailerModel.findOne({ _id })
    .then(() => {
      ShipmentModel.findOne({ _id: shipmentid })
        .then((result) => {
          if (result.bestprice === -1 && bidprice > -1) {
            let k = 1;
            result.bid.push({ Shiperid: _id, Bestprice: Number(bidprice) });
            ShipmentModel.updateOne(
              { _id: shipmentid },
              {
                bestprice: Number(bidprice),
                bid: result.bid,
              }
            )
              .then(() => {
                RetailerModel.findOne({ _id })
                  .then((Result) => {
                    Result.shipments.push({
                      shipmentid: shipmentid,
                      bestprice: Number(bidprice),
                      status: 1,
                    });
                    RetailerModel.updateOne(
                      { _id },
                      {
                        shipments: Result.shipments,
                      }
                    ).then(() => {
                      sendAlert(
                        res,
                        "Bid placed successfully",
                        "/ShipmentMybids?id=" + id
                      );
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (bidprice > result.cutoff) {
            if (bidprice >= result.bestprice) {
              sendAlert(
                res,
                "There is already a better offer than yours,Try different price",
                "/Shipmentinfo?id=" + id + "&shipmentid=" + sid
              );
            } else {
              result.bid.push({ Shiperid: _id, Bestprice: Number(bidprice) });
              ShipmentModel.updateOne(
                { _id: shipmentid },
                { bestprice: Number(bidprice), bid: result.bid }
              ).then(() => {
                RetailerModel.findOne({ _id })
                  .then(async (Result) => {
                    let Shipmententry = Result.shipments.find((entry) =>
                      entry.shipmentid.equals(shipmentid)
                    );

                    if (Shipmententry) {
                      Shipmententry.bestprice = Number(bidprice);

                      await Result.save(); // ✅ Ensure the update is saved

                      sendAlert(
                        res,
                        "Bid placed successfully",
                        "/ShipmentMybids?id=" + id
                      );
                    } else {
                      await RetailerModel.updateOne(
                        { _id },
                        {
                          $push: {
                            shipments: {
                              shipmentid,
                              bestprice: Number(bidprice),
                              status: 1,
                            },
                          },
                        }
                      );

                      sendAlert(
                        res,
                        "Bid placed successfully",
                        "/ShipmentMybids?id=" + id
                      );
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          } else {
            sendAlert(
              res,
              "Your bidprice is less than the cutoff",
              "/Shipmentinfo?id=" + id + "&shipmentid=" + sid
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/GetStatus", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("shipmentid");
  //console.log(req.body);
  const _id = new mongoose.Types.ObjectId(id);
  ShipmentModel.findOne({ _id })
    .then((result) => {
      //Retailer lo kuda cheyali ikkada
      ShipmentModel.updateOne({ _id }, req.body)
        .then(() => {
          //  console.log("Status Updated Successfully");
          res.status(200).send("Updated");
        })
        .catch((err) => {
          console.log("error occured");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/UpdateShipmentDate", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  const sid = urlParams.get("shipmentid");
  const _id = new mongoose.Types.ObjectId(id);
  const _sid = new mongoose.Types.ObjectId(sid);
  let newDate = req.body.NewDate;
  let formattedDate = new Date(newDate.split("-").reverse().join("-"));
  ShipmentModel.findOne({ _id: _sid })
    .then((result) => {
      ShipmentModel.updateOne({ _id: _sid }, { pud: formattedDate, status: 1 })
        .then(() => {
          console.log("sdfvb");
          res.status(200).send("date updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/AcceptBid", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get("id");
  //console.log(id);
  const shiperid = urlParams.get("shiperid");
  //console.log(shiperid);
  const shipmentid = urlParams.get("shipmentid");
  //console.log(shipmentid);
  const BestPrice = urlParams.get("bestprice");
  //console.log(BestPrice);

  const _id = new mongoose.Types.ObjectId(id);
  const _shiperid = new mongoose.Types.ObjectId(shiperid);
  const _shipmentid = new mongoose.Types.ObjectId(shipmentid);
  ShipmentModel.findOne({ _id: _shipmentid }).then((result) => {
    ShipmentModel.updateOne(
      { _id: _shipmentid },
      { status: "2", bestprice: BestPrice, shiperid: shiperid }
    ).then(() => {
      RetailerModel.findOne({ _id: _shiperid }).then((Result) => {
        RetailerModel.updateOne({ _id: shiperid }, { state: 1 })
          .then(() => {
            Result.successfulshipments.push({
              shipmentid: shipmentid,
              bestprice: BestPrice,
              status: 2,
            });
            Result.save()
              .then(() => {
                res.status(200).send("bid accepted");
                const transport = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false,
                  auth: {
                    user: "mukeshsamardhaginne@gmail.com",
                    pass: "tdqr pbuy oxzl gdiy",
                  },
                });
                const mailoptions = {
                  from: process.env.EMAIL_ID,
                  to: Result.email,
                  subject: "ShipIt Shipment Order",
                  html: `<h3>Congratulations</h3>
                    <p>You Have Won The Bid,The Shipmentid Is ${result.id}</p>`,
                };
                transport.sendMail(mailoptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("success");
                  }
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  });
});

app.post("/EndRide", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const sid = urlParams.get('sid');
  console.log(sid);
  const shiper = urlParams.get('shiperid');
  console.log(shiper);
  const _shiper = new mongoose.Types.ObjectId(shiper);
  const _id = new mongoose.Types.ObjectId(sid);
  ShipmentModel.findOne({ _id }).then((result) => {
    let email = result.email;
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
    console.log(email);
    console.log(otp);
    LoginotpModel.updateOne({ email }, { otp }).then((result) => {
      console.log(result);
      console.log("updated successfully");
      RetailerModel.findOne({ _id: _shiper }).then((result) => {
        let semail = result.email;
        LoginotpModelr.updateOne({ email: semail }, { otp }).then((result) => {
          console.log("Retailer side also updated successfully");
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    })

    const mailoptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "ShipIt Delivery Successful",
      html: `<h3>Notice:<br>Remember To Tell The Otp Only After You Received The Load!</h3>
      <p>OTP:<B>${otp}<B></p>`,
    };
    transport.sendMail(mailoptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        res.status(200).send("Received Successfully");
      }
    });
  })
})

app.post("/EndShipmentotp", (req, res) => {
  const urlParams = new URLSearchParams(req.query);
  const id = urlParams.get('id');
  const shipmentid = urlParams.get('shipmentid');
  const shiperid = urlParams.get('shiperid');
  const _id = new mongoose.Types.ObjectId(id);
  const _sid = new mongoose.Types.ObjectId(shipmentid);
  const _shipid = new mongoose.Types.ObjectId(shiperid);
  CustomerModel.findOne({ _id }).then((Result) => {
    LoginotpModel.findOne({ email:Result.email }).then((RESULT) => {
      let otp = RESULT.otp;
      console.log(otp);
      RetailerModel.findOne({ _id: _shipid }).then((result) => {
        LoginotpModelr.findOne({ email: result.email }).then((ResulT) => {
          let rotp = ResulT.otp;
          console.log(rotp);
           if (req.body.Endopt == otp && otp==rotp){
              sendAlert(res, "OTP Validation Successful", "/RatingsPage?=id" + id + "&shipmentid=" + shipmentid + "&shiperid" + shiperid);
           } else {
              sendAlert(res, "Wrong OTP", "/TrackerPage?id=" + id + "&shipmentid=" + shipmentid);
           }
        })
      })
      // console.log(req.body);
    })
  }).catch((err) => {
    console.log(err);
  })
})


/*
driver state and dddate should also be updated
ShipmentModel.findOne({ _sid })
          .then((result) => {
            // await RetailerModel.updateOne(
            //   { _id: _shiperid, "successfulshipments.shipmentid": _sid },
            //   { $set: { "successfulshipments.$.status": -1 } }
            // );
            ShipmentModel.updateOne({ _id: _sid }, { status: -1 }).then(() => {
              RetailerModel.updateOne(
              { _id: _shipid, "successfulshipments.shipmentid": _sid },
                { $set: { "successfulshipments.$.status": -1 } }
              ).then(() => {
                console.log("Successfully delivered");
            })
            })
          })
          .catch((err) => {
            console.log(err);
          });




*/
app.use((req, res) => {
  res.render("4o4page");
});
