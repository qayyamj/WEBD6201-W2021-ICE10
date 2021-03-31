import express from 'express';
export const router = express.Router();

import mongoose from 'mongoose';

import ContactModel = require('../Models/contact');
const Contact = ContactModel.Model;

/* GET home page - default route. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', user: ''   });
});

/* GET home page - home route. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', user: ''     });
});

/* GET about page - about route. */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', user: ''       });
});

/* GET projects page - projects route. */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Our Projects', page: 'projects', user: ''       });
});

/* GET services page - services route. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', user: ''         });
});

/* GET contact page - contact route. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', user: ''         });
});

/* GET login page - login route. */
router.post('/login', function(req, res, next) 
{
  res.redirect('/contact-list');
});

/* GET register page - register route. */
router.get('/register', function(req, res, next) 
{
  res.render('index', { title: 'Register', page: 'register', user: ''         });
});

/* GET logout page - logout route. */
router.get('/logout', function(req, res, next) 
{
  res.render('index', { title: 'Logout', page: 'logout', user: ''         });
});

/************************************ TEMPORARY ROUTING **********************************************/

/* GET contact list page - contact-list route. */
router.get('/contact-list', function(req, res, next) 
{
  //res.render('index', { title: 'Contact List', page: 'contact-list', user: 'admin'  });

  Contact.find({}, (err, contacts:mongoose.Document) =>
  {
    if (err)
    {
      return next(err);
    }
    else
    {
      res.render('index', {title: 'Contact List', page: 'contact-list', contacts: contacts, user: 'temp'});
    }
  });

});

/* Display edit list page with /edit/:id. */
router.get('/edit/:id', function(req, res, next) 
{
 let id = req.params.id;

 //pass the id to the database
Contact.findById(id, (err:any, contactToEdit:mongoose.Document) =>
  {
  if(err)
  {
    console.error(err);
    res.end(err);
  }

  // show the edit view
  res.render('index', { title: 'Edit', page: 'edit', data: contactToEdit, user: 'temp'    });
  }); 
});

/* Process edit list page with /edit/:id. */
router.post('/edit/:id', function(req, res, next) 
{
  let id = req.params.id;

  // instantiate new object of type Contact
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
    console.error(err);
    res.end(err);
  }
  res.redirect('/contact-list');
});
});

/* Display add list page - with /add. */
router.get('/add', function(req, res, next) 
{
  res.render('index', { title: 'Add', page: 'edit', data: '', user: 'temp'    });
});

/* Process add list page - with /add. */
router.post('/add', function(req, res, next) 
{
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
  })
});

/* Display delete page - delete route. */
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
  })
});

