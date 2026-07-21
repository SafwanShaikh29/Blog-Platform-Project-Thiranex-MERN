const express = require('express');
const app = express();

// Middleware to parse JSON and serve our frontend file
app.use(express.json());
app.use(express.static('public'));

// Mock Database (In-memory arrays)
let posts = [];
let comments = [];
let nextPostId = 1;

// --- RESTful APIs ---

// 1. Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 2. Create a new post
app.post('/api/posts', (req, res) => {
    const newPost = {
        id: nextPostId++,
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.json(newPost);
});

// 3. Add a comment to a specific post
app.post('/api/posts/:id/comments', (req, res) => {
    const newComment = {
        postId: parseInt(req.params.id),
        author: req.body.author,
        text: req.body.text
    };
    comments.push(newComment);
    res.json(newComment);
});

// 4. Get comments for a specific post
app.get('/api/posts/:id/comments', (req, res) => {
    const postComments = comments.filter(c => c.postId === parseInt(req.params.id));
    res.json(postComments);
});

app.listen(3000, () => console.log('Simple blog running on http://localhost:3000'));