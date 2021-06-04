const {DataTypes} = require("sequelize");
const instance = require("../connection");

const note = instance.sequelize.define("notes",{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
      },
      uid:{
        type: DataTypes.STRING,
        allowNull:false
      },
      content:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      date:{
        type: DataTypes.DATE,
        allowNull:false
      },
      time:{
        type: DataTypes.TIME,
        allowNull:false
      }
      
    },{
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName:"notes"
    }
)



exports.model = note;