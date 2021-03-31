import express from 'express';
export const router = express.Router();

import mongoose from 'mongoose';
import ContactModel = require('../Models/contact');
const Contact = ContactModel.Model;

/* GET home page - with / */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: ''   });
});

/* GET home page - with /home */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: ''    });
});

/* GET about page - with /about */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', displayName: ''    });
});

/* GET services page - with /services */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', displayName: ''    });
});

/* GET projects page - with /projects */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Our Projects', page: 'projects', displayName: ''    });
});

/* GET contact page - with /contact */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: ''    });
});

/* GET login page - with /login */
router.get('/login', function(req, res, next) 
{
  res.render('index', { title: 'Login', page: 'login', displayName: ''    });
});

/* GET login page - with /login */
router.post('/login', function(req, res, next) 
{
  res.redirect('/contact-list');
});


/* GET register page - with /register */
router.get('/register', function(req, res, next) 
{
  res.render('index', { title: 'Register', page: 'register', displayName: ''    });
});

/****************** temporary routes - mocking up login / register and contact-list related pages ************** */


/* GET contact-list page - with /contact-list */
router.get('/contact-list', function(req, res, next) 
{
    // db.contacts.find()
    Contact.find((err, contacts:mongoose.Document) => { 
      if (err) 
      {
          return next(err);
       } 
       else 
       { 
         res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp'  });
       }
    });
});

/* Display edit page - with /edit/:id */
router.get('/edit/:id', function(req, res, next) 
{
  let id = req.params.id;
  
  //pass the id to the db
  Contact.findById(id, (err:any, contactToEdit:mongoose.Document) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    console.log(contactToEdit);

    // show the edit view
    res.render('index', { title: 'Edit', page: 'edit', data: contactToEdit, displayName: 'temp'    });
  });
});

/* Process edit page - with /edit/:id */
router.post('/edit/:id', function(req, res, next) 
{
  let id = req.params.id;

  // instantiate a new object of type Contact
  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  });

  Contact.updateOne({_id: id}, updatedContact, {}, function(err){
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    res.redirect('/contact-list');
  });

});


/* GET add page - with /add */
router.get('/add', function(req, res, next) 
{
  res.render('index', { title: 'Add', page: 'edit', data: '', displayName: 'temp'    });
});

/* GET add page - with /add */
router.post('/add', function(req, res, next) 
{
  // instantiate a new object of type Contact
  let newContact = new Contact
  ({
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  });

  Contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
});


/* process delete page - with /delete/:id */
router.get('/delete/:id', function(req, res, next) 
{
  let id = req.params.id;

  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/contact-list');
  });
});



/* GET login page - with /login */
router.get('/logout', function(req, res, next) 
{
  res.render('index', { title: 'Logout', page: 'logout', displayName: ''    });
});

