const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");


const sessionOptions = {
    secret: "MySuperSecretCode",
    resave: false,
    saveUninitialized: true,
};

app.use(
    session(sessionOptions)
);
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="Anonymous"} = req.query;
    req.session.name = name;
    // console.log(req.session.name);
    req.flash("success","user registered succesfully");
    res.redirect("/hello");
});




app.get("/hello", (req,res)=>{
    // res.send(`Hello ${req.session.name}`)
    res.locals.message = req.flash("success")
    res.render("page.ejs",{name:req.session.name});
})
// app.get("/test", (req, res) => {
//     res.send("Tested succefully");
// })

app.listen(3000, () => {
    console.log("Server is listening to the port 3000");
})