const {DataTypes} = require('sequelize')
const {db} = require('../databases/db')

const Meal = db.define('meal',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:DataTypes.INTEGER,
    },
    name:{
         type:DataTypes.STRING,
         allowNull:false,

    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    RestaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    }


})
module.exports=Meal

