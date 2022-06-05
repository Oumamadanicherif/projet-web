// $(document).ready(function() {

//     "use strict";
//     var $header = $(".header-default"),
//         $clone = $header.before($header.clone().addClass("clone"));
//     $(window).on("scroll", function() {
//         var fromTop = $(window).scrollTop();
//         $('body').toggleClass("down", (fromTop > 300))
//     });
// });

// function getArticles(take = 10, skip = 0) {
//     fetch("http://localhost:3000/articles?take=10&skip=0").then(response =>
//         response.json().then(data => ({
//             data: data,
//             status: response.status

//         })).then(res => {
//             for (let index = 0; index < res.data.length; index++) {

//                 document.getElementById("test").innerHTML += res.data[index].contenu;
//             }

//             console.log(res.status, res.data)
//         }));
// }

// function getCategories(take = 10, skip = 0) {
//     fetch("http://localhost:3000/categories?take=10&skip=0").then(response =>
//         response.json().then(data => ({
//             data: data,
//             status: response.status
//         })).then(res => {
//             console.log(res.status, res.data)
//         }));
// }

// function getCommentaires(take = 10, skip = 0) {
//     fetch("http://localhost:3000/commentaires?take=10&skip=0").then(response =>
//         response.json().then(data => ({
//             data: data,
//             status: response.status
//         })).then(res => {
//             console.log(res.status, res.data)
//         }));
// }

// function getUsers(take = 10, skip = 0) {
//     fetch("http://localhost:3000/users?take=10&skip=0").then(response =>
//         response.json().then(data => ({
//             data: data,
//             status: response.status
//         })).then(res => {
//             console.log(res.status, res.data)
//         }));
// }


// getArticles(10, 0);
// getCategories(10, 0);
// getCommentaires(10, 0);
// getUsers(10, 0);


const url = 'http://localhost:3000/articles?take=10&skip=0'
$.getJSON(url).then(getArticles)
$articlesContainer = $('.container > .articles')
$articleContainer = $('.container > .article')

function getArticles(data) {
    const $card = $('#template > .card')
    $articlesContainer.hide()
    data.forEach(a => {
        const $col = $('<div class="col-md-4 col-lg-3"></div>')
        const $clone = $card.clone(true)

        const src = $('img', $clone).attr('src')
        console.log(src)
        $('img', $clone).attr('src', a.imageUrl)
        $('.card-title', $clone).text(trim(a.titre))
        $('.card-text', $clone).text(trim(a.contenu))
        $('button', $clone).on('click', () => getArticle(a.id))
        $col.append($clone).appendTo($articlesContainer)
        $articlesContainer.fadeIn(500)
    })
}
const url2 = 'http://localhost:3000/articles/'

function getArticle(id) {
    $articleContainer.empty()
    $.getJSON(url2 + id).then(a => {
        const $card = $('#template > .card')
        const $col = $('<div class="col-md-12"></div>')
        const $clone = $card.clone(true)

        const src = $('img', $clone).attr('src')
        $('img', $clone).attr('src', a.imageUrl)
        $('.card-title', $clone).text(a.titre)
        $('.card-text', $clone).text(a.contenu)
        $('button', $clone).text('Back').on('click', () => {
            $articleContainer.fadeOut(500, () => $articlesContainer.fadeIn(500))
        })
        $col.append($clone).appendTo($articleContainer)
        $articleContainer.fadeIn(300)
    })
    $articlesContainer.fadeOut(500)
}

function trim(text, size = 80) {
    return text.substring(0, size) + ' ...'
}