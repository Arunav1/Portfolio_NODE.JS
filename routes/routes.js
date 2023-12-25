const express = require('express');
const home = require('../controller/home');
const services = require('../controller/services');
const about = require('../controller/about');
const User = require('../models/users');
const requirePage = require('../controller/requirement');
const projectPage = require('../controller/project')

const route = express.Router();

route.get('/',  home);
route.get('/Home', (req,res) => {
    res.redirect('/')
});
//signup route
route.post('/signup', async (req, res) => {
   const data = {
    username: req.body['signup-username'],
    email: req.body['signup-email'],
    password: req.body['signup-password']
   };
  
    try {
      await User.create(data);
      console.log(req.body);
      console.log("Registered Succesfully..");
      res.redirect('/');
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send(`Error registering user: ${error.message}`);
    }
  });


//login route
  route.post('/login', async (req, res) => {
    const loginUser = {
      username:req.body['login-username'],
      password:req.body['login-password']
    };
  
    try {
      const user = await User.findOne(loginUser);
      if (user) {
        console.log('Loggedin Sucessfully...');
        res.render('require', {requirePage});
      } else {
        res.status(401).send('Invalid credentials.');
      }
    } catch (error) {
      res.status(500).send('Error logging in.');
    }
  });

route.get('/Projects', projectPage);  

route.get('/About', about);

route.get('/Services',services); 

module.exports = route;
