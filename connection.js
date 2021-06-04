const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("scheduler","root","",{
    host:"localhost",
    dialect:"mysql",
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle:10000
    },
    define:{
        paranoid:true
    }
})

try {
    sequelize.authenticate();
} catch (error) {
    console.log(error);
}

exports.sequelize = sequelize;