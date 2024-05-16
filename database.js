const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2/promise");

const dbConn = mysql.createConnection({
   host: 'localhost',
   user: 'root', // <== ระบุให้ถูกต้อง
   password: '',  // <== ระบุให้ถูกต้อง
   database: 'student_database',
   port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/student.html");
 })

app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
 
    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
   //  res.status(201).send(rows)
   res.send("<h1 style='color: blue'>คุณได้ทำการเพิ่มข้อมูลเรียบร้อย</h1>")
 })
 
 app.listen(3000, ()=>{
    console.log("Server is running at port 3000");
 })