import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {

    const deleteCommentaire = prisma.commentaire.deleteMany()
    const deleteArticles = prisma.article.deleteMany()
    const deleteCategories = prisma.categorie.deleteMany()
    const deleteUtilisateurs = prisma.user.deleteMany()
        // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([deleteCommentaire, deleteArticles, deleteCategories, deleteUtilisateurs])
    let user = null;

    for (let index = 1; index <= 10; index++) {
        user = await prisma.user.create({
            data: {
                id: index,
                nom: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(6),
                role: "AUTHOR",
            },
        })
    }
    await prisma.user.create({
        data: {
            id: 11,
            nom: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(7),
            role: "ADMIN",
        },
    })

    for (let index = 1; index <= 10; index++) {
        await prisma.categorie.create({
            data: {
                id: index,
                name: faker.commerce.department()
            },
        })
    }


    const commentsForArticle = Array.from({ length: Math.floor(Math.random() * 20) }).map(() => ({
        contenu: faker.lorem.paragraph(),
        email: faker.internet.email()
    }))

    const categoriesForArticle = Array.from({ length: Math.floor(Math.random() * 4) }).map(() => ({
        categoryid: Number(faker.random.numeric(1, { bannedDigits: ['0'] }))
    }))


    for (let index = 1; index <= 100; index++) {
        await prisma.article.create({

            data: {
                titre: faker.commerce.product(),
                contenu: faker.lorem.paragraph(),
                imageUrl: faker.image.business(),
                utilisateur: {
                    connect: {
                        id: Number(faker.random.numeric(1, { bannedDigits: ['0'] }))
                    }
                },
                categories: {
                    create: categoriesForArticle
                },
                commentaire: {
                    create: commentsForArticle
                }
            },
        })
    }



}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
});