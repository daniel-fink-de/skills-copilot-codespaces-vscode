// Create web server
// 1. Import express
const express = require('express');
const app = express();
// 2. Import body-parser
const bodyParser = require('body-parser');
// 3. Import mongoose
const mongoose = require('mongoose');
// 4. Import path
const path = require('path');
// 5. Import Comment model
const Comment = require('./models/comment');
// 6. Set up connection to database
mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true });
// 7. Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// 8. Set up public directory
app.use(express.static(path.join(__dirname, 'public')));
// 9. Set up view engine
app.set('view engine', 'ejs');
// 10. Set up routes
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/addComment', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then(() => {
        console.log('Comment added to database');
        res.redirect('/getComments');
    });
});
app.get('/getComments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', { comments: comments });
        }
    });
});
// 11. Start server
app.listen(3000, () => {
    console.log('Server git started on port 3000');
});
// 12. Run server
// Run the server by typing in the terminal: node comments.js
// Open the browser and go to: http://localhost:3000
// Add a comment and click the submit button
// The comment will be saved to the database and displayed on the page
// Open a new tab and go to: http://localhost:3000/getComments
// All the comments saved in the database will be displayed on the page
// To stop the server, press: ctrl + c
// 13. Summary
// We created a web server using Express and set up a connection to a MongoDB database
// We used body-parser to parse the data from a form and save the data to the database
// We used Mongoose to create a model and save the data to the database