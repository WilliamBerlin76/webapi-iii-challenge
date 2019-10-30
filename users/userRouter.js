const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');

const Posts = require('../posts/postDb')

router.post('/', (req, res) => {
    const body = req.body;
    console.log(body)
    Users.insert(body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not add the new user'})
        })
});

router.post('/:id/posts', (req, res) => {
    const body = req.body;
    console.log(body)
    Posts.insert(body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not add a new post'})
        })
});

router.get('/', (req, res) => {
    const query = req.query;
    console.log(query)
    Users.get(query)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'the users could not be retrieved'})
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(id)
        .then(user => {
            !user ? res.status(404).json({message: 'that user does not exist'}) :
            res.status(200).json({user})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: 'the user could not be retrieved'})
        })

});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;
    Users.getUserPosts(userId)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not retrieve the posts by this user id' })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
        .then(user => {
            res.status(200).json({message: `the user with id ${id} was deleted`})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "unable to delete the user"})
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body;
    Users.update(id, body)
        .then(user => {
            res.status(200).json(body)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not update the user'})
        })
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
