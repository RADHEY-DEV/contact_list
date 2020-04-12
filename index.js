const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [

    {
        name: "Radhey",
        phone: "5142316792"

    },
    {
        name: "Himali",
        phone: "4383452503"

    }
    ,
    {
        name: "Rahi",
        phone: "4383456792"

    }



]

app.get('/',function(req,res){

    Contact.find({}, function(err,contacts){
if (err){
    console.log('Error in fetching contacts from database');
    return;
}
return res.render('home',{
    title: "Contacts List", 
    contact_list: contacts});

});
    
});




app.get('/practice',function(req,res){
    return res.render('practice',{title: "Lets play with EJS"   });
});


app.post('/create-contact', function(req,res){

// contactList.push({
//     name: req.body.name,
//     phone: req.body.phone
// });


// contactList.push(req.body);
Contact.create({
    name: req.body.name,
    phone: req.body.phone
}, function(err, newContact){
    if(err){
        console.log('error in creating contact');
        return;
    }
    console.log('******',newContact);
    return res.redirect('back');

});
// return res.redirect('/');



});

app.get('/delete-contact/', function(req,res){
// console.log(req.query.phone);
// // let phone = req.query.phone;

// // let contactIndex= contactList.findIndex(contact =>
// //     contact.phone == phone);

// //     if(contactIndex != -1){
// //         contactList.splice(contactIndex, 1);
// //     }

let id=req.query.id;

Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting an object from database');
        return;
    }




return res.redirect('back');

});

});





app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err); }
console.log('Yup, my express server is running here', port);
    });
