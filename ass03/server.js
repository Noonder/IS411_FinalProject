const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const { name } = require('ejs')

const cors = require('cors');
app.use(cors());

const users = []

app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use(express.json());

app.post('/register-step1', (req, res) => {
  console.log("ข้อมูลที่ได้รับจาก Step 1:", req.body);
  res.status(200).json({ message: "ok" });
});

app.get('/',(req,res) => {
    res.render('index.ejs')
})

app.get('login',(req,res) => {
    res.render('login.ejs')
})

app.get('login',(req,res) => {

})

app.post('/register',async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        users.push({
            id: Date.now().toString(),
            userType: req.body.userType,
            email: req.body.email,
            password: hashedPassword,
            prefix: req.body.prefix,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            idcard: req.body.idcard,
            phone: req.body.phone,
            durianType: req.body.durianType,
            durianOther: req.body.durianOther
        });

        console.log(users);
        return res.status(200).json({ message: "success" });

        } catch (error) {
        return res.status(500).json({ message: "fail" });
        }
    });


app.listen(3000)

