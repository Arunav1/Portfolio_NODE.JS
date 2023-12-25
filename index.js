const express = require('express');
const route = require('./routes/routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://Alpha001:Dutta12345@clustertech01.ewhbzo1.mongodb.net/test?retryWrites=true&w=majority`);

//middlewares:
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Creating routes:
app.use('/', route);

app.listen(port, () => {
    console.log(`Serever is running on port number ${port}`);
});
