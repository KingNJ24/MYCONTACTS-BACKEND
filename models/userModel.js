const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required:[true,"Please enter your name"],
        },
        email:{
            type: String,
            unique: true,
            required: [true,"Please enter your unique email"],
        },
        password:{
            type :String , 
            required  :[true ,"please add a valid Password"]
        }
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model("user",userSchema)