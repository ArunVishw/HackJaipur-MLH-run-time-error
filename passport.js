const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require(path.join(__dirname, './models/adminSchema'));
const JwtStrategy = require('passport-jwt').Strategy;



const cookieExtractor = req =>{
    let t=null;
    if(req && req.cookies){
        t=req.cookies["access_token"];
    }
    return t;
}


// Authorization using JWT token / cookie
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : process.env.JWT_KEY
},(payload,done)=>{
    Admin.findById({_id : payload.sub},(err,admin)=>{
        if(err) return done(err,false);
        if(admin)   return done(null,admin);
        return done(null,false);
    });
}));



// Authenticating using LocalStrategy that username ans password matches
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(email,password,done){
    Admin.findOne({email:email},function(err,admin){
        //If db is not working
        if(err) return done(err);
        //If user is invalid
        if(!admin)   return done(null,false);
        //Check if password is correct
        admin.comparePassword(password,done);
    });
}));

