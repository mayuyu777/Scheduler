const note = require("../models/note");
const session = require("express-session");
const connection = require("../connection");
const { QueryTypes, where } = require('sequelize');
const { query } = require("express");


exports.addEvent = async(req,res)=>{
    req.body.uid = req.session.uid;
    await note.model.create(
        req.body
    ).then(()=>{
        if(req.body.curDate == ''){
            res.redirect("/");
            
        }else{
            res.redirect("/home"+"?month="+req.body.curDate);
        }
        
    }).catch(function(err){
        console.log(err);
        res.redirect("/");
    })

}
exports.updateEvent = async(req,res)=>{
 
    const query = "Update notes SET content = '"+ req.body.content+"' where id ='"+req.body.id+"'";
    await connection.sequelize.query(query, { type: QueryTypes.UPDATE });
    res.redirect("/home"+"?month="+req.body.curDate);

}

exports.deleteEvent = async(req,res)=>{
 
    const query = "Delete from notes where id ='"+req.body.id+"'";
    await connection.sequelize.query(query, { type: QueryTypes.DELETE });
    res.redirect("/home"+"?month="+req.body.curDate);

}

exports.home = async(req,res)=>{
    if(req.session.uid){
        var i;
        var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var calendar={};
        var date = new Date;
        if(req.query.month!= undefined){
            date = new Date(req.query.month);
            console.log("here");
        }
       
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var dayofweek = new Date(year,month-1,1).getDay();
        var days = daysInMonth (month, year);

        for(i=0;i<days;i++){
            const query = "Select * from notes where  uid = '"+req.session.uid +"' and Month(date) = " + month+" and Day(date)= "+(i+1)+" and Year(date) = "+year;
            calendar[i] = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
        }
       
        res.render("index",{calendar: calendar, days:days,dayofweek:dayofweek,curmonth:months[month-1],year:year,date:date});
    }else{
        res.redirect("/");
    }

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
    
}





