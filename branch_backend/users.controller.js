const mongoose=require('mongoose');
const User=mongoose.model('admin');

const register=(name,organisation,email,password,verification_token,cb)=>{

    var admin=new User();
    admin.name=name;
    admin.organisation=organisation;
    admin.email=email;
    admin.password=password;
    admin.verification_token=verification_token;
    admin.verified="false";
    console.log(admin);
    admin.save((err,doc)=>{
        if(!err){
            console.log("Inserted in Mongodb");
            cb(null,doc);
        }
        else{
            if(err.code==11000)
            console.log('Email already registered.');
            else
            cb(error,null);
        }
    });




    //console.log('inside register fn.');
};
const update_data=(myquery,cb)=>{    
    var admin=new User();
    admin.update(myquery, {verified: 'true'},(err,doc)=>{
        if(!err){
            console.log(myquery);            
            //console.log(newvalues);
            console.log("Email verified in function");
            cb(null,doc);
        }
        else{           
            cb(error,null);
        }
    });
    
};

module.exports={register,update_data};
