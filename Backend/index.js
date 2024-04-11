import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import fileUpload from 'express-fileupload';
// import cloudinaryConnect from "./cloudinary.js"
import cloudinary from 'cloudinary';
// import cookieParser from 'cookie-parser';


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// app.use(fileUpload());
// // app.use(cookieParser());
// const fileupload = require("express-fileupload");
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// cloudinaryConnect();
cloudinary.config({
  cloud_name: "dqpezswz3",
  api_key: "566349751335648",
  api_secret: "PKpnC2_urqTiv6YwojNb0EjSQf0"
});

//this file upload uploads only on server
//the file upload in cloudinary, first uploads on server then on cloudinary server and then deletes from server.

mongoose.connect("mongodb+srv://healthvault_2024_shashwat:20242024@cluster0.5ffu791.mongodb.net/HealthVault_2024?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });



const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const User = new mongoose.model("User", userSchema)

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  address: String,
  doctor: String,
  email: String

})

const Appointment = new mongoose.model("Appointment", appointmentSchema)

const fileSchema = new mongoose.Schema({
  name: String,
  fileUrl: String,
  email: String
})

const File = mongoose.model("File", fileSchema);


const patientSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  phoneNumber: String,
  email: String,
  allergies: String,
  medicalHistory: String,
  familyHistory: String,
  surgeries: String,
  Immunizations: String,
  medications: String,
  hospitalizations: String,
  bloodPressure: String,
  heartRate: String,
  respiratoryRate: String,
  bodyTemperature: String,
  progressNotes: String,
  consultationReports: String,
  insuranceProvider: String,
  policyNumber: String,
  copaymentInfo: String,
  emergencyContacts: String,
  lifeStyleHabits: String,
  occupationalHistory: String,
  dietaryPreferences: String,
  bloodGroup: String,
  labResults: String,
  imagingReports: String,
  ecgReports: String,
  biopsyResults: String,
});

const Patient = new mongoose.model('Patient', patientSchema);

//   async function uploadFileToCloudinary(file, folder, quality){
//     const options = {folder};
//     console.log("temp file path", file.tempFilePath);

//     if(quality) {
//         options.quality = quality;
//     }

//     options.resource_type = "auto";
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

let sharedVariable;
function setSharedVariable(req, res, next) {
  sharedVariable = req.body.email;
  next();
}
app.post("/login", setSharedVariable, async (req, res) => {


  const { email, password } = req.body;
  console.log(email)
  console.log(password)
  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields are required"
    })
  }
  const existinguser = await User.find({ email });

  console.log(existinguser)
  if (!existinguser || existinguser.length === 0) {
    return res.json({
      success: false,
      message: "User is not registered"
    })
  }

  const payload = {
    email: existinguser[0].email,
    id: existinguser[0]._id,
  }
  if (existinguser) {
    if (password === existinguser[0].password) {
      // res.cookie('email', user.email);
      // res.send({ message: "Login successful", user: existinguser });
      // sharedVariable = req.body.email;

      let token = jwt.sign(payload,
        "shashwat",
        {
          expiresIn: "2h",
        })
      existinguser[0].token = token;
      existinguser[0].password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        existinguser,
        message: "User Logged In successsfully"
      })
    } else {
      res.send({ message: "Password did not match" });

    }
  } else {
    res.send({ message: "User not registered" });
  }
}
);

app.post("/patientData", (req, res) => {
  const {
    fullName,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
    email,
    allergies,
    medicalHistory,
    familyHistory,
    surgeries,
    Immunizations,
    medications,
    hospitalizations,
    bloodPressure,
    heartRate,
    respiratoryRate,
    bodyTemperature,
    progressNotes,
    consultationReports,
    insuranceProvider,
    policyNumber,
    copaymentInfo,
    emergencyContacts,
    lifeStyleHabits,
    occupationalHistory,
    dietaryPreferences,
    bloodGroup,
    labResults,
    imagingReports,
    ecgReports,
    biopsyResults,
  } = req.body;

  Patient.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        res.send({ message: "User already registered" });
      } else {
        const patient = new Patient({
          fullName,
          dateOfBirth,
          gender,
          address,
          phoneNumber,
          email,
          allergies,
          medicalHistory,
          familyHistory,
          surgeries,
          Immunizations,
          medications,
          hospitalizations,
          bloodPressure,
          heartRate,
          respiratoryRate,
          bodyTemperature,
          progressNotes,
          consultationReports,
          insuranceProvider,
          policyNumber,
          copaymentInfo,
          emergencyContacts,
          lifeStyleHabits,
          occupationalHistory,
          dietaryPreferences,
          bloodGroup,
          labResults,
          imagingReports,
          ecgReports,
          biopsyResults

        });
        patient.save()
          .then(() => {
            res.send({ message: "Data Inserted successfully" });
          })
          .catch((error) => {
            res.send(error);
          });
      }
    })
    .catch((error) => {
      console.error("Error querying user", error);
    });
});

// app.post("/fileUpload",async(req,res)=>{
//   const file = req.files.file;

//   try {

//     //fetch filefrom request

//     console.log("FILE AAGYI JEE -> ",file);


//     //create path where file need to be stored on server
//     let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
//     console.log("PATH-> ", path)

//     //add path to the move fucntion
//     file.mv(path , (err) => {
//         console.log(err);
//     });

//     //create a successful response
//     res.json({
//         success:true,
//         message:'Local File Uploaded Successfully',
//     });

// }
// catch(error) {
//     console.log("Not able to upload the file on server")
//     console.log(error);
// }

// //Uploading to cloudinary
// const response = await uploadFileToCloudinary(file, "HealthVault");
//         console.log(response);


// })

// const fileSchema = new mongoose.Schema({
//   name: String,
//   fileUrl: String,
//   email: String
// });

// const File = mongoose.model("File", fileSchema);

app.post("/fileUpload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const file = req.files.file;
    console.log(file);

    // Uploading to cloudinary
    const response = await uploadFileToCloudinary(file, "HealthVault");
    console.log(response);

    // Save file details to MongoDB if needed
    const newFile = new File({
      name: file.name,
      fileUrl: response.secure_url,
      email: req.body.email // assuming you're also sending email from the frontend
    });
    await newFile.save();

    res.json({ message: 'File uploaded successfully', fileUrl: response.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}



app.post("/appointments", (req, res) => {

  const { date, time, address, doctor, email } = req.body;
  console.log("uiuhemail", email)
  User.findOne({ email: email })
    .then((existingUser) => {
      if (!existingUser) {
        res.send({ message: "User Not registered" });
      } else {
        const appointment = new Appointment({
          date,
          time,
          address,
          doctor,
          email

        });
        appointment.save()
          .then(() => {
            res.send({ message: "Data Inserted successfully" });
          })
          .catch((error) => {
            res.send(error);
          });
      }
    })
    .catch((error) => {
      console.error("Error querying user", error);
    });
});

app.delete('/appointments/delete', async (req, res) => {
  try {
    const { doctor, time } = req.body;
    console.log(doctor, time);
    // Find the appointment by ID and delete it
    const deletedAppointment = await Appointment.findOneAndDelete({ doctor, time });
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    // If deletion is successful, send a success response
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    // If an error occurs, send a server error response
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        res.send({ message: "User already registered" });
      } else {
        const user = new User({
          name,
          email,
          password,
        });
        user.save()
          .then(() => {
            res.send({ message: "Successfully registered, please login now" });
          })
          .catch((error) => {
            res.send(error);
          });
      }
    })
    .catch((error) => {
      console.error("Error querying user", error);
    });
});

// const email = req.cookies.email;
app.get("/getAllUser", async (req, res) => {
  // const email = req.params.email;
  try {
    const allUser = await Patient.find();
    // const allUser = await Patient.findOne({ email: email });
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
})
app.get("/getAllReports", async (req, res) => {
  try {
    const allUser = await File.find();
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
})

app.get("/getAllAppointments", async (req, res) => {
  // const email = req.params.email;
  try {
    const allUser = await Appointment.find();
    // const allUser = await Patient.findOne({ email: email });
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
})


app.get('/health-tips', async (req, res) => {
  try {
    // fetch health tips data from API
    const response = await axios.get('https://api.nutritionix.com/v1_1/search/healthtips?results=20&fields=item_name,item_description&appId=071893ea&appKey=ed8be591af3b78f668716a9b39a4c286');

    // send response with data
    res.send(response.data.hits);
  } catch (error) {
    // handle error
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("BE started at port 9000")
})