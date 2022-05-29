const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');

var router = express.Router();
/* GET commmentaires listing. */
router.get('/', async(req, res) => {
    const { take, skip } = req.query; // prendre deux parametres a partir url request
    const commmentaires = await prisma.commentaire.findMany({
        // trouver les enregistements dans BD en consideration du 2 parametres
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
    })
    res.json(commmentaires)
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const commentaires = await prisma.commentaire.findUnique({
            where: {
                id: Number(id),
            },
        })
        // cas n'existe pas qu BD
    if (commentaires == null) {
        res.status(404).json("Commentaire not found");
    } else {
        res.json(commentaires)
    }

});

router.patch('/', async(req, res) => {
    const { idCommentaire, idArticle } = req.body;
    const commentaire = await prisma.commentaire.findUnique({
        where: { id: Number(idCommentaire) }, // autre explicqtion en language SQL select * from
    })


    if (commentaire == null) {
        res.status(404).json("Commentaire pas trouve");
    } else {

        // update article set titre="" where id=""
        const updatedCommentaire = await prisma.commentaire.update({
            where: { id: Number(idCommentaire) || undefined },
            data: {
                email: email,
                contenu: contenu,
                utilisateur: { connect: { id: idUser || article.auteur } },
            },
        })
        res.json(updatedCommentaire)
    }

});
router.post('/', async(req, res) => {
    const { email, contenu, id } = req.body
    const result = await prisma.commentaire.create({
        data: {
            email,
            contenu,
            utilisateur: { connect: { id: id } },
        },
    })
    res.json(result)
});
router.delete('/:id', async(req, res) => {
    const { id } = req.params //recuperation de l'id directement de l'URL 
    console.log(req.params);
    const post = await prisma.commentaire.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(post)
});



module.exports = router;