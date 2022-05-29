const { faker } = require('@faker-js/faker');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
    // 10 utilisateurs ayant le rôle “AUTHOR”
const users = Array.from({ length: 9 }).map(() => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "AUTHOR"
    }))
    //  utilisateur ayant le rôle “ADMIN”
users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "ADMIN"
});
// 10 catégories
const categories = Array.from({ length: 10 }).map(() => ({
    name: faker.commerce.department()
}))

// 100 articles appartenant à (de 1 à 4 catégories aléatoires) , écrit par l’un des 10 (AUTHOR)
let articles = [];
let user = users[Math.floor(Math.random() * 10)];
let numberOfCategories = Math.floor(Math.random() * 4);
let numberOfComments = Math.floor(Math.random() * 4);
const categoriesForArticle = [];

for (let i = 0; i < 3; i++) {

    for (let j = 0; j < numberOfCategories; j++) {
        categoriesForArticle.push(users[Math.floor(Math.random() * 10)]);
    }

    const commentsForArticle = Array.from({ length: Math.floor(Math.random() * 20) }).map(() => ({

        content: faker.lorem.paragraph(),
        email: faker.internet.email(),
        userId: 1
    }))




    articles.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        image: faker.image.avatar(),
        published: faker.datatype.boolean(),
        comments: { create: commentsForArticle }
    });

    console.log(articles);
}


// Pour chaque article, créer de 0 à 20 commentaires)

async function main() {

    const users_seeds = await prisma.user.createMany({
        data: users
    });
    const categories_seeds = await prisma.category.createMany({
        data: categories
    });
    const articles_seeds = await prisma.article.createMany({
        data: articles
    });


}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })