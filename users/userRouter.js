const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');

const Posts = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const body = req.body;
    
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

router.get('/:id', validateUserId, (req, res) => {
    Users.getById({id: req.user})
        .then(user => {
            // !user ? res.status(404).json({message: 'that user does not exist'}) :
            res.status(200).json(req.user)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: 'the user could not be retrieved'})
        })

});

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
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
    const id = req.params.id
    Users.getById(id)
        .then(users => {
            if(!users){
                 res.status(400).json({message: "invalid user id"}) 
            } else {
                req.user = users;
                console.log(req.user)
                next();
            }    
        })
        .catch(err => {
            console.log('validation mid', err)
            res.status(500).json({message: 'could not validate the id'})
        })
};

function validateUser(req, res, next) {
    const body = req.body;
    if(!body){
        res.status(400).json({message: 'missing user data'})
    } else if (!body.name) {
        res.status(400).json({message: 'missing required name field'})
    } else{
        next();
    }
};

function validatePost(req, res, next) {
    const body = req.body;
    if(!body){
        res.status(400).json({message: "missing post data"})
    } else if (!body.text){
        res.status(400).json({message: "missing reqired text field"})
    } else {
        next();
    }
};

module.exports = router;
