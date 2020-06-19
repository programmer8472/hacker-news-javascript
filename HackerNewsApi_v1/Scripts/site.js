let articles = [];

$(function () {
    
    document.getElementById("button-search").addEventListener("click", function (event) {
        var searchedArticles = articles;
        var searchText = document.getElementById("text-search").value;

        searchedArticles = searchedArticles.filter(article => {
            return article.title.includes(searchText);
        });

        document.getElementById("results-list").innerHTML = ""
        searchedArticles.forEach(article => {
            document.getElementById("results-list").innerHTML += getArticleMarkup(article);
        });

    });

    fetch('/HackerNews')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(function (element) {
                var articleDetails = getArticleDetail(element);
            });

        });
    
    document.getElementById("text-search").onkeyup = function (evt) {
        if (event.keyCode === 13) {
            evt = evt || window.event;
            document.getElementById("button-search").click();
        }
    };

});

function getArticleDetail(id) {

    fetch('/HackerNews/GetArticleDetail?id=' + id)
        .then(response => response.json())
        .then(data => {
            articles.push(data);
            document.getElementById("results-list").innerHTML += getArticleMarkup(data);
        });
}

function getArticleMarkup(jsonData) {
    return "<li><a href="
        + jsonData.url
        + " target='_blank'><p><span class='title'>"
        + jsonData.title + "</span><br /><span class='author'>"
        + jsonData.by
        + "</span></p></a></li>";
}

