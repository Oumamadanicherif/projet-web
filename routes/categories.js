const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');

var router = express.Router();
/* GET categories  listing. */
router.get('/', async(req, res) => {
    const { take, skip } = req.query; // prendre deux parametres q pqrtir url request
    const categories = await prisma.categorie.findMany({
        // trouver les enregistements dans BD en consideration du 2 parametres
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
    })
    res.json(articles)
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const categorie = await prisma.categorie.findUnique({
            where: {
                id: Number(id),
            },
        })
        // cas categorie n'existe pas qu BD
    if (categorie == null) {
        res.status(404).json("  Aucun categorie n'est identifie par ce nom");
    } else {
        res.json(categorie)
    }

});

router.patch('/', async(req, res) => {
    const { idCategorie, idUser } = req.body;
    const categorie = await prisma.categorie.findUnique({
        where: { id: Number(idCategorie) }, // autre explication en language SQL select * from categories where id=1 //
    })


    if (categorie == null) {
        res.status(404).json("categorie pas trouve");
    } else {

        // update categorie set titre="" where id=""
        const updatedCategorie = await prisma.categorie.update({
            where: { id: Number(idCategorie) || undefined },
            data: {
                name: this.name,
                article: { connect: { id: idArticle } },
            },
        })
        res.json(updatedCategorie)
    }

});
router.post('/', async(req, res) => {
    const { name, id } = req.body
    const result = await prisma.categorie.create({
        data: {
            name,
            article: { connect: { id: id } },
        },
    })
    res.json(result)
});
router.delete('/:id', async(req, res) => {
    const { id } = req.params //recuperation de l'id directement de l'URL 
    console.log(req.params);
    const post = await prisma.categorie.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(post)
});

module.exports = router;