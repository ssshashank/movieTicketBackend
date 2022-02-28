require('dotenv').config();
const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const UserAccounts=require("./userAccount");

const ticket=mongoose.Schema({
    ticketId:{
        type: SchemaTypes.ObjectId,
        immutable: true,
    },
})
ticket.methods.toJSON=function(){
    try {
        const ticket=this;
        const ticketObject=ticket.toObject()
        return ticketObject
    } catch (error) {
        return error
    }
}
module.exports=mongoose.model('ticket',ticket);