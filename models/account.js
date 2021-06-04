const {DataTypes} = require("sequelize");
const instance = require("../connection");

const account = instance.sequelize.define("accounts",{
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
      email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
      },
      name:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull:false
      }
      
    },{
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName:"accounts"
    }
)



exports.model = account;