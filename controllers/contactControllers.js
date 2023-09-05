const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts =asyncHandler( async (req,res)=>{
    const contacts = await Contact.find({User_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      res.status(200).json(contact);
    } catch(error){
        res.status(404);
        throw new Error('No contact found with that ID');
    }
  });
  

//@desc create new contact
//@route POST /api/contacts/
//@access private
const createContact =asyncHandler( async (req,res)=>{
    console.log(req.body);
    const {name, email, phone }= req.body;
    if(!name||!email||!phone){
        res.status(401)
        throw new Error("<h1>All fields are required")
    }
    const contact = await Contact.create({
        name,email,phone, user_id: req.user.id
    });
    res.status(201).json(contact)
})
                                                                                                                                                                                                                                        
//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact=asyncHandler( async (req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id)
        if(contact.user_id.toString() !== req.user.id ){
            res.status(403);
            throw new Error("User don't have permission to update other users contacts ");
        }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new : true}
    )
    res.status(200).json(updatedContact)
}catch(error){
    res.status(404);
    throw new Error('No contact found with that ID');
}
})

//@desc delete contact
//@route delete /api/contacts/:id
//@access private
const deleteContact=asyncHandler( async (req,res)=>{
    try{
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if(contact.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("User don't have permission to delete other users contacts ");
    }
    res.status(200).json(contact);
}catch(error){
    res.status(404);
    throw new Error('No contact found with that ID');
}
})

module.exports= {getContacts,getContact,createContact,updateContact,deleteContact}