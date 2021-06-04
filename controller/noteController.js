const note = require("../models/note");
const session = require("express-session");
const connection = require("../connection");
const { QueryTypes } = require('sequelize');


exports.addEvent = async(req,res)=>{
    req.body.uid = req.session.uid;
    await note.model.create(
        req.body
    ).then(()=>{
        res.redirect("/");
    }).catch(function(err){
        console.log(err);
        res.redirect("/");
    })

}

exports.home = async(req,res)=>{
    if(req.session.uid){
        var date = new Date;
        var month = date.getMonth();
        var year = date.getFullYear();
       const query = "Select * from notes where Month(date) = 4";
        const result = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
       /* await note.model.findAll({
           
        }).then((data)=>{
            console.log("your data"+data.content);
        }).catch({

        })*/
        console.log(result);
        if(result.length==0){
            console.log("empty");
        }
        res.render("index");
    }else{
        res.redirect("/");
    }
    
}