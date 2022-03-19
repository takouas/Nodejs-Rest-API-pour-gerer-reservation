const mongoose = require('mongoose');

const dbDebug = require('debug')('app:db');


mongoose.connect('mongodb+srv://takoua:M4SFoETnxUWg3W9T@cluster0.7pvdx.mongodb.net/réservation?retryWrites=true&w=majority')
        .then(()=> console.log('MongoDB is UP.'))
        .catch((err)=> console.log('MongoDB is Down : '+err));