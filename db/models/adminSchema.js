const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        max : 20 
    },
    organization :{
        type: String,
        required: true,
        max: 30 
    },
    email :{
        type: String,
        required: true,
        max: 30 
    },
    password :{
        type: String,
        required: true,
    },
    verified :{
        type: String
    }
});

AdminSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err) return next(err);
        this.password = passwordHash;
        next();
    });
});

AdminSchema.methods.comparePassword = function(pass,done){
    bcrypt.compare(pass,this.password,(err,isMatch)=>{
        if(err) return done(err);
        else if(!isMatch)    return done(null,isMatch);
        else return done(null,this);
    });
}

module.exports = mongoose.model('Admin',AdminSchema);