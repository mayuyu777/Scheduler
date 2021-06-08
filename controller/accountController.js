const account = require("../models/account");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;




exports.createAccount = async(req,res)=>{
   
        var salt = bcrypt.genSaltSync(saltRounds);
        req.body.password = bcrypt.hashSync(req.body.password,salt);
        req.body.uid = generateCode();
        await account.model.create(
            req.body
        ).then(()=>{
            res.render("register",{message:"Account registered successfully!"});
        }).catch(function(err){
            console.log(err);
            res.render("register",{message:"Email already exists!"});
        })
    
    
    
}


exports.checkauth = async(req,res,next)=>{
    if(req.session.uid){
       next();
    }else{
        res.redirect("/login");
    }
}

exports.home = async(req,res,next)=>{

    res.redirect("/home");
    
}
exports.signin = async(req,res)=>{
   
        await account.model.findOne({
            where:{
                email: req.body.email
            }
        }).then((data)=>{
    
            if(bcrypt.compareSync(req.body.password,data.password) && data.password!=''){
                var sess = req.session;
                sess.uid = data.uid;
                session
                res.redirect("/");
            }else{
                res.render("login",{message:"Incorrect email or password!"});
            }
            
        }).catch(function(err){
            console.log(err);
            res.render("login",{message:"User does not exists!"});
        })
    
   
    
}

exports.profile = async(req,res,next)=>{

    await account.model.findOne({
        where:{
            uid: req.session.uid
        }
    }).then((data)=>{

        res.render("profile",{name:data.name,email:data.email});
        
    }).catch(function(err){
        console.log(err);
    })
    
}

exports.updateAccount= async(req,res,next)=>{

    await account.model.update({
        email: req.body.email,
        name:req.body.name},
        {where:{
            uid: req.session.uid
        }
    }).then((data)=>{

      res.redirect("/");
        
    }).catch(function(err){
        console.log(err);
    })
    
}


exports.showlogin = async(req,res)=>{
    if(!req.session.uid){
        res.render("login");
    }else{
        res.redirect("/");
    }
}

exports.showregister = async(req,res)=>{
    if(!req.session.uid){
        res.render("register");
    }else{
        res.redirect("/");
    }
}



exports.logout = async(req,res)=>{
    req.session.destroy();
    res.redirect("/");
}

generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}

