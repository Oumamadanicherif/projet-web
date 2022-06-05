const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const accessTokenSecret = 'najib';

router.post('/', async(req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password

    const usr = await prisma.utilisateur.findMany({
        where: { email: username, password: password },
    })

    if (usr) {
        // Generate an access token
        const accessToken = jwt.sign({ username: usr.email, role: usr.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});


module.exports = routerconst express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const accessTokenSecret = 'madani cherif';

router.post('/', async(req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password

    const usr = await prisma.utilisateur.findMany({
        where: { email: username, password: password },
    })

    if (usr) {
        // Generate an access token
        const accessToken = jwt.sign({ username: usr.email, role: usr.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});


module.exports = router