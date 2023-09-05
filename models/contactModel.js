const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type: String,
        reruired: [true, "Please add the contact name"],
    },
    email:{
        type: String,
        required: [true, "Please add the contact email addresss"]
    },
    phone:{
        type: Number,
        required: [true, "Please add contact phone number"]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("contact",contactSchema);