
// import mongoose from "mongoose";
// import express from "express";
// const router = express.Router();

// // ... الكود هنا (signup, login)



// import moment from "moment";
// import QRCode from "qrcode";
// import authRoutes from "./routes/auth.js"; // لو حطيتي الكود في فولدر routes

// app.use("/api/auth", authRoutes);

// const port =process.env.PORT || 3000


// const app = express();
// app.use(express.json());

// //  الاتصال بقاعدة البيانات
// mongoose.connect("mongodb://localhost:27017/project")
//   .then(() => console.log(" Connected to MongoDB"))
//   .catch((err) => console.log(" Connection Error:", err));

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const employeeSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     type: String,
//     enum: ["employee", "security"],
//     default: "employee"
//   },
//   rfid_code: String,
//   qr_code: String,
//   photo: String
// });

// // تشفير الباسورد قبل الحفظ
// employeeSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // دالة لمقارنة الباسورد
// employeeSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// const Employee = mongoose.model("Employee", employeeSchema);
// export default Employee;


// ///////////////////////////////////////////////////////////////////////////

// const attendanceSchema = new mongoose.Schema({
 
//   employee: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Employee",
//     required: true 
//   },

 
//   action: { 
//     type: String, 
//     enum: ["checkin", "checkout"], 
//     required: true 
//   },

  
//   method: { 
//     type: String, 
//     enum: ["rfid", "qr", "face", "manual"], 
//     required: true 
//   },

  
//   timestamp: { 
//     type: Date, 
//     default: Date.now 
//   },


//   deviceId: String,          // الكاميرا/القارئ اللي سجّل الدخول
 
//   status: { 
//     type: String, 
//     enum: ["success", "denied"], 
//     default: "success" 
//   },

// }, { timestamps: true });

// const Attendance = mongoose.model("Attendance", attendanceSchema);
// // //////////////////////////////////////////////////////////////////////////

// const vehicleSchema = new mongoose.Schema({
//   employee_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Employee",
//     required: true
//   },
//   plate_number: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Vehicle = mongoose.model("Vehicle", vehicleSchema);
// // //////////////////////////////////////////////////////////////////////////

// const gateEventSchema = new mongoose.Schema({
//   vehicle_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vehicle",
//     required: false
//   },
//   plate_number_detected: String,  // الرقم اللي الكاميرا قرأته

//   action: {
//     type: String,
//     enum: ["open", "denied"],
//     required: true
//   },

//   method: {
//     type: String,
//     enum: ["car_plate", "manual_by_guard"],
//     required: true
//   },

//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const GateEvent = mongoose.model("GateEvent", gateEventSchema);



// // /////////////////////////////////////////////////////////////////////////////////////

// import Employee from "./models/Employee.js"; // تأكدي من المسار

// import jwt from "jsonwebtoken";

// const router = express.Router();
// const JWT_SECRET = "secret123"; // ممكن تحطيه في .env

// // Sign Up
// router.post("/signup", async (req, res) => {
//   const { name, age, email, password, role } = req.body;

//   try {
//     const existingUser = await Employee.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already exists" });

//     const employee = await Employee.create({ name, age, email, password, role });
//     const token = jwt.sign({ id: employee._id, role: employee.role }, JWT_SECRET, { expiresIn: "1d" });

//     res.json({ message: "User created", token, employee });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


// // ////////////////////////////////////////////////////////////////
// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employee = await Employee.findOne({ email });
//     if (!employee) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await employee.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ id: employee._id, role: employee.role }, JWT_SECRET, { expiresIn: "1d" });

//     res.json({ message: "Login successful", token, employee });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // //////////////////////////////////////////////////////////////////////////////////////

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });
// ///////////////////////////////////////////////////////////////////////////////////








// // ////////////////////////////////////////////////////////////////////////////////////////

// import mongoose from "mongoose";
// import express from "express";
// import moment from "moment";
// import QRCode from "qrcode";

// const port = process.env.PORT || 3000; 

// const app = express();
// app.use(express.json());

// //  الاتصال بقاعدة البيانات
// mongoose.connect("mongodb://mongo:IhxjmqwfSUSEuaCsOfbGvzFBYmglKZRt@mongodb.railway.internal:27017")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("Connection Error:", err));


// // نموذج الموظف
// const employeeSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
//   password: String,
//   // عشان مقيدهوش
//   rfid_code: Number,
//   qr_code: Number,
// });
// const Employee = mongoose.model("Employee", employeeSchema);

// //  نموذج الحضور والانصراف
// const attendanceSchema = new mongoose.Schema({
//   employee_id: String,
//   date: String,
//   time_in: String,
//   time_out: String,
//   method: String,
// });
// const Attendance = mongoose.model("Attendance", attendanceSchema);

// // إدخال بيانات الموظفين (تشغليها أول مرة فقط)
// async function insertEmployees() {
//   try {
//     const employees = [

//       { name: 'Zyad Elsayed Husseiny', age: 21, email: "Zyad@gmail.com", password: "Zyad123", rfid_code: 111, qr_code: 101 },
//       { name: 'Youssef Samy Naim', age: 21, email: "Youssef@gmail.com", password: "Youssef123", rfid_code: 112, qr_code: 102 },
//       { name: 'Emad El-Refaey Mohamed', age: 21, email: "Emad@gmail.com", password: "Emad123", rfid_code: 113, qr_code: 103 },
//       { name: 'Ahmed Samy Salah', age: 21, email: "Ahmed@gmail.com", password: "Ahmed123", rfid_code: 114, qr_code: 104 },
//       { name: 'Abdullah Saber Abdullah', age: 23, email: "Abdullah@gmail.com", password: "Abdullah123", rfid_code: 115, qr_code: 105 },
//       { name: 'Roaa Samir Mohammed', age: 21, email: "Roaa@gmail.com", password: "Roaa1811", rfid_code: 116, qr_code: 106 },
//       { name: 'Reem Farghaly Mongy', age: 21, email: "Reem@gmail.com", password: "Reem123", rfid_code: 117, qr_code: 107 },
//       { name: 'Noura Nagy Sayed', age: 22, email: "Noura@gmail.com", password: "Nora123", rfid_code: 118, qr_code: 108 },
//       { name: 'Alaa Khaled Saadeldin', age: 21, email: "Alaa@gmail.com", password: "Alaa123", rfid_code: 119, qr_code: 109 },
//       { name: 'Hadeer Abdelhamid Badr', age: 21, email: "Hadeer@gmail.com", password: "Hadeer123", rfid_code: 120, qr_code: 110 },
//       { name: 'Neamat Hassan Ezzat', age: 21, email: "Neamat@gmail.com", password: "Neamat123", rfid_code: 121, qr_code: 111 },
//     ];

//     await Employee.insertMany(employees);
//     console.log(" تم إدخال الموظفين بنجاح");
//   } catch (error) {
//     console.log(" البيانات موجودة بالفعل أو حدث خطأ أثناء الإدخال");
//   }
// }
// //  نشغلها مرة واحدة بس
// // insertEmployees();


// //  تسجيل الحضور أو الانصراف
// async function recordAttendance(qr_code, method = "QR") {

//   try {
//     const employee = await Employee.findOne({ qr_code });
//     if (!employee) return console.log("الموظف غير موجود");

//     const today = moment().format("YYYY-MM-DD");
//     const currentTime = moment().format("HH:mm:ss");

//     let attendance = await Attendance.findOne({ employee_id: employee._id, date: today });

//     if (!attendance) {
//       attendance = new Attendance({
//         employee_id: employee._id,
//         date: today,
//         time_in: currentTime,
//         time_out: "",
//         method,
//       });
//       await attendance.save();
//       console.log(` تم تسجيل حضور ${employee.name} الساعة ${currentTime}`);
   
//     } else if (!attendance.time_out) { 
//       attendance.time_out = currentTime;
//       await attendance.save();
//       console.log(` تم تسجيل انصراف ${employee.name} الساعة ${currentTime}`);
//     }
//   } catch (err) {
//     console.log(" خطأ أثناء تسجيل الحضور/الانصراف:", err.message);
//   }
// };


// // API بيستقبل الكود من صفحة HTML بعد عمل Scan
// app.post("/api/scan", async (req, res) => {
//   try {
//     const { qr_code } = req.body;
//     if (!qr_code) {
//       return res.status(400).json({ message: "QR code مفقود " });
//     }
//     await recordAttendance(qr_code, "QR");
//     res.json({ message: "تم تسجيل الحضور أو الانصراف بنجاح " });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "حدث خطأ أثناء التسجيل " });
//   }
// });


// //لكل موظف QR فيها html عرض صفحة 
// const publicUrl="https://qrtask-production.up.railway.app/employees"
// app.get("/employees", async (req, res) => {
//   try {
//     const employees = await Employee.find();

//     const employeeQRs = await Promise.all(
//       employees.map(async (emp) => {
//       const qrLink = `https://qrtask-production.up.railway.app/api/scan?qr_code=${emp.qr_code}`;

//       const qrImage = await QRCode.toDataURL(qrLink);

//         return {
//           name: emp.name,
//           email: emp.email,
//           qr_code: emp.qr_code,
//           qrImage,
//           qrLink,
//         };
//       })
//     );

//     let html = `
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>Employee QR Codes</title>
//         <style>
//           body { font-family: Arial; background:#f8f9fa; padding:30px; }
//           .card {
//             background: white; border-radius: 10px; box-shadow: 0 0 5px rgba(0,0,0,0.1);
//             padding: 15px; margin: 10px; display: inline-block; text-align: center;
//             width: 200px;
//           }
//           img { width: 150px; height: 150px; margin-top: 10px; }
//         </style>
//       </head>
//       <body>
//         <h2>Employee QR Codes</h2>
//         ${employeeQRs.map(emp => `
//           <div class="card">
//             <strong>${emp.name}</strong><br>
//             <small>${emp.email}</small><br>
//             <img src="${emp.qrImage}" alt="QR for ${emp.name}">
//           </div>
//         `).join("")}
//       </body>
//       </html>
//     `;
//     res.send(html);
//   } catch (err) {
//     res.status(500).send("حدث خطأ أثناء تحميل الصفحة ");
//   }
// });


// //  الصفحة الرئيسية
// app.get("/", (req, res) => {
//   res.redirect("/employees");
// });

// //SCAN  لما اعمل 
// app.get("/api/scan", async (req, res) => {
//   const { qr_code } = req.query;
//   if (!qr_code) return res.send("QR code مفقود ");
//   await recordAttendance(qr_code, "QR");
//   res.send(" تم تسجيل الحضور أو الانصراف بنجاح!");
// });

// app.listen(port, "0.0.0.0", () => {
//  console.log(`Server running on  port ${port}`);
// });
// ///////////////////////////////////////////////////////
import mongoose from "mongoose";
import express from "express";
import moment from "moment";
import QRCode from "qrcode";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// =======================
// الاتصال بقاعدة البيانات (استبدلي هنا برابطك من Railway)
// =======================
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:IhxjmqwfSUSEuaCsOfbGvzFBYmglKZRt@gondola.proxy.rlwy.net:40218";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection Error:", err));

// =======================
// نموذج الموظف
// =======================
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  rfid_code: Number,
  qr_code: Number,
});
const Employee = mongoose.model("Employee", employeeSchema);

// =======================
// نموذج الحضور والانصراف
// =======================
const attendanceSchema = new mongoose.Schema({
  employee_id: String,
  date: String,
  time_in: String,
  time_out: String,
  method: String,
});
const Attendance = mongoose.model("Attendance", attendanceSchema);

// =======================
// إدخال الموظفين مرة واحدة فقط
// =======================
async function insertEmployeesOnce() {
  try {
    const existing = await Employee.findOne();
    if (existing) return console.log("الموظفين موجودين بالفعل، تجاهل الإدخال");

    const employees = [
      { name: 'Zyad Elsayed Husseiny', age: 21, email: "Zyad@gmail.com", password: "Zyad123", rfid_code: 111, qr_code: 101 },
      { name: 'Youssef Samy Naim', age: 21, email: "Youssef@gmail.com", password: "Youssef123", rfid_code: 112, qr_code: 102 },
      { name: 'Emad El-Refaey Mohamed', age: 21, email: "Emad@gmail.com", password: "Emad123", rfid_code: 113, qr_code: 103 },
      { name: 'Ahmed Samy Salah', age: 21, email: "Ahmed@gmail.com", password: "Ahmed123", rfid_code: 114, qr_code: 104 },
      { name: 'Abdullah Saber Abdullah', age: 23, email: "Abdullah@gmail.com", password: "Abdullah123", rfid_code: 115, qr_code: 105 },
      { name: 'Roaa Samir Mohammed', age: 21, email: "Roaa@gmail.com", password: "Roaa1811", rfid_code: 116, qr_code: 106 },
      { name: 'Reem Farghaly Mongy', age: 21, email: "Reem@gmail.com", password: "Reem123", rfid_code: 117, qr_code: 107 },
      { name: 'Noura Nagy Sayed', age: 22, email: "Noura@gmail.com", password: "Nora123", rfid_code: 118, qr_code: 108 },
      { name: 'Alaa Khaled Saadeldin', age: 21, email: "Alaa@gmail.com", password: "Alaa123", rfid_code: 119, qr_code: 109 },
      { name: 'Hadeer Abdelhamid Badr', age: 21, email: "Hadeer@gmail.com", password: "Hadeer123", rfid_code: 120, qr_code: 110 },
      { name: 'Neamat Hassan Ezzat', age: 21, email: "Neamat@gmail.com", password: "Neamat123", rfid_code: 121, qr_code: 111 },
    ];

    await Employee.insertMany(employees);
    console.log("تم إدخال الموظفين بنجاح");
  } catch (err) {
    console.log("خطأ أثناء إدخال الموظفين:", err.message);
  }
}

// نشغل مرة واحدة فقط
// insertEmployeesOnce();

// =======================
// تسجيل الحضور والانصراف
// =======================
async function recordAttendance(qr_code, method = "QR") {
  try {
    const employee = await Employee.findOne({ qr_code });
    if (!employee) return console.log("الموظف غير موجود");

    const today = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");

    let attendance = await Attendance.findOne({ employee_id: employee._id, date: today });

    if (!attendance) {
      attendance = new Attendance({
        employee_id: employee._id,
        date: today,
        time_in: currentTime,
        time_out: "",
        method,
      });
      await attendance.save();
      console.log(`تم تسجيل حضور ${employee.name} الساعة ${currentTime}`);
    } else if (!attendance.time_out) {
      attendance.time_out = currentTime;
      await attendance.save();
      console.log(`تم تسجيل انصراف ${employee.name} الساعة ${currentTime}`);
    }
  } catch (err) {
    console.log("خطأ أثناء تسجيل الحضور/الانصراف:", err.message);
  }
}

// =======================
// API استلام QR من الفرونت
// =======================
app.post("/api/scan", async (req, res) => {
  try {
    const { qr_code } = req.body;
    if (!qr_code) return res.status(400).json({ message: "QR code مفقود" });

    await recordAttendance(qr_code, "QR");
    res.json({ message: "تم تسجيل الحضور أو الانصراف بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ أثناء التسجيل" });
  }
});

// =======================

// صفحة عرض QR لكل الموظفين
// =======================
const PUBLIC_URL = "https://qrtask-production.up.railway.app/employees"; // الرابط النهائي على الإنترنت

app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees.length) {
      return res.send("<h3>لا يوجد موظفين</h3>");
    }

      const employeeQRs = await Promise.all(
        employees.slice(0,1).map(async (emp) => {
        const qrLink = `https://qrtask-production.up.railway.app/api/scan?qr_code=${emp.qr_code}`;
        const qrImage = await QRCode.toDataURL(qrLink);

        return { name: emp.name, email: emp.email, qrImage };
      })
    );

    let html = `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Employee QR Codes</title>
      </head>
      <body>
        <h2>Employee QR Codes</h2>
        ${employeeQRs.map(emp => `
          <div style="margin:10px;">
            <strong>${emp.name}</strong><br>
            <small>${emp.email}</small><br>
            <img src="${emp.qrImage}" alt="QR for ${emp.name}">
          </div>
        `).join("")}
      </body>
      </html>
    `;
    res.send(html);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("حدث خطأ أثناء تحميل الصفحة");
  }
});


// =======================
// الصفحة الرئيسية
// =======================
app.get("/", (req, res) => res.redirect("/employees"));

// =======================
// SCAN عبر رابط
// =======================
app.get("/api/scan", async (req, res) => {
  const { qr_code } = req.query;
  if (!qr_code) return res.send("QR code مفقود");

  await recordAttendance(qr_code, "QR");
  res.send("تم تسجيل الحضور أو الانصراف بنجاح!");
});

// =======================
// تشغيل السيرفر
// =======================
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));