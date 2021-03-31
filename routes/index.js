"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const ContactModel = require("../Models/contact");
const Contact = ContactModel.Model;
exports.router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', user: '' });
});
exports.router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', user: '' });
});
exports.router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', user: '' });
});
exports.router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', user: '' });
});
exports.router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', user: '' });
});
exports.router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', user: '' });
});
exports.router.post('/login', function (req, res, next) {
    res.redirect('/contact-list');
});
exports.router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', user: '' });
});
exports.router.get('/logout', function (req, res, next) {
    res.render('index', { title: 'Logout', page: 'logout', user: '' });
});
exports.router.get('/contact-list', function (req, res, next) {
    Contact.find({}, (err, contacts) => {
        if (err) {
            return next(err);
        }
        else {
            res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, user: 'temp' });
        }
    });
});
exports.router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', data: contactToEdit, user: 'temp' });
    });
});
exports.router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new Contact({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    Contact.updateOne({ _id: id }, updatedContact, {}, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
exports.router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', data: '', user: 'temp' });
});
exports.router.post('/add', function (req, res, next) {
    let newContact = new Contact({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    Contact.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
exports.router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
//# sourceMappingURL=index.js.map