const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/OnlineInterview',{ useNewUrlParser: true,useUnifiedTopology: true  },(err)=>{

    if(!err){
        console.log('MONGODB Connected');
    }
    else{
        console.log('Error:'+JSON.stringify(err,undefined,2));
    }
});

require('./studentSchema');
