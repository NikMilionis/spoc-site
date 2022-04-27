console.log('working')
let post = {
    "title": "Title",
    "url": "Test URL",
    "postdetail": "Detail part of the Post",
    "tags": "#tags"
}

function load_post(post){
    $('#title').text(post.title)
    $('#url').attr("src", post.url)
    $('#postdetail').text(post.postdetail)
    $('#tags').text(post.tags)

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const  post_id = urlParams.get('post_id');
console.log(post_id);

$(document).ready(function () {

    if (post_id) {
        $.getJSON('/get_post_by_id?post_id=' + post_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    post = data["data"];
                    load_post(post);
                };
            });
    };
});

function onEdit(){
    location.href="forum_edit.html?post_id="+post_id;
}