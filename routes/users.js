const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');

var router = express.Router();
/* GET users listing. */
router.get('/', async(req, res) => {
    const { take, skip } = req.query; // prendre deux parametres a partir url request
    const users = await prisma.utilisateur.findMany({
        // trouver les enregistements dans BD en consideration du 2 parametres
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
    })
    res.json(users)
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const users = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        })
        // cas l'article n'existe pas qu BD
    if (users == null) {
        res.status(404).json("user not found");
    } else {
        res.json(users)
    }

});

router.patch('/', async(req, res) => {
    const { idUser, idArticle } = req.body;
    const user = await prisma.user.findUnique({
        where: { id: Number(idUser) }, // autre explicqtion en language SQL select
    })


    if (user == null) {
        res.status(404).json("user pas trouve");
    } else {

        // update user set ="" where id=""
        const updatedUser = await prisma.user.update({
            where: { id: Number(idUser) || undefined },
            data: {
                nom: nom,
                password: password,
                email: email,
            },
        })
        res.json(updatedUser)
    }

});
router.post('/', async(req, res) => {
    const { email, contenu, id } = req.body
    const result = await prisma.user.create({
        data: {
            email,
            nom,
            password,
        },
    })
    res.json(result)
});
router.delete('/:id', async(req, res) => {
    const { id } = req.params //recuperation de l'id directement de l'URL 
    console.log(req.params);
    const post = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(post)
});
module.exports = router;