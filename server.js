const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

//config wars
const port = process.env.PORT || 3000;
const db=process.env.MONGODB_URI || 'mongodb://localhost/blog';
const app = express();


// db connection
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// set routes
app.use('/',router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
