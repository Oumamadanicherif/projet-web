$(document).ready(function() {

    "use strict";
    var $header = $(".header-default"),
        $clone = $header.before($header.clone().addClass("clone"));
    $(window).on("scroll", function() {
        var fromTop = $(window).scrollTop();
        $('body').toggleClass("down", (fromTop > 300))
    });
});

function getArticles(take = 10, skip = 0) {
    fetch("http://localhost:3000/articles?take=10&skip=0").then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status

        })).then(res => {
            for (let index = 0; index < res.data.length; index++) {

                document.getElementById("test").innerHTML += res.data[index].contenu;
            }

            console.log(res.status, res.data)
        }));
}

function getCategories(take = 10, skip = 0) {
    fetch("http://localhost:3000/categories?take=10&skip=0").then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            console.log(res.status, res.data)
        }));
}


getArticles(10, 0);