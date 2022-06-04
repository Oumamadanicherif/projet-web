const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');

var router = express.Router();
/* GET articles listing. */
router.get('/', async(req, res) => {
    const { take, skip } = req.query; // prendre deux parametres q pqrtir url request
    const articles = await prisma.article.findMany({
        // trouver les enregistements dans BD en consideration du 2 parametres
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
    })
    res.json(articles)
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const article = await prisma.article.findUnique({
            where: {
                id: Number(id),
            },
        })
        // cas l'article n'existe pas qu BD
    if (article == null) {
        res.status(404).json("Article not found");
    } else {
        res.json(article)
    }

});

router.patch('/', async(req, res) => {
    const { idArticle, titre, contenu, imageUrl, idUser } = req.body;
    const article = await prisma.article.findUnique({
        where: { id: Number(idArticle) }, // autre explicqtion en language SQL select * from article where id=1 //
    })


    if (article == null) {
        res.status(404).json("Article pas trouve");
    } else {

        // update article set titre="" where id=""
        const updatedArticle = await prisma.article.update({
            where: { id: Number(idArticle) || undefined },
            data: {
                titre: titre,
                contenu: contenu,
                imageUrl: imageUrl,
                updateAt: new Date(),
                utilisateur: { connect: { id: idUser || article.auteur } },
            },
        })
        res.json(updatedArticle)
    }

});
router.post('/', async(req, res) => {
    const { titre, contenu, imageUrl, id } = req.body
    const result = await prisma.article.create({
        data: {
            titre,
            contenu,
            imageUrl,
            utilisateur: { connect: { id: id } },
        },
    })
    res.json(result)
});
router.delete('/:id', async(req, res) => {
    const { id } = req.params //recuperation de l'id directement de l'URL 
    console.log(req.params);
    const post = await prisma.article.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(post)
});

module.exports = router;