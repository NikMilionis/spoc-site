//console.log('working')
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
                    console.log(post);
                    load_post(post);
                    showReplies(post);
                };
            });
    };
});

function onEdit(){
    location.href="forum_edit.html?post_id="+post_id;
}

function onDelete(){
    $.post('/delete_post_by_id', {_id:post_id}).done((data)=>{
        if(data.message==="success"){
            location.href="/forum";
        }else{
            //error
        };
    });
}

function onReply(){
    location.href="reply.html?post_id="+post_id;
}

function get_reply_object(reply, idx) {

    console.log(reply.reply)
    return `<li class="list-group-item"">
                <div class="row">
                    <div class="col-lg-6 infoDiv">
                        <h5>defaultUSerName</h5>
                        <p>${reply.replyText}</p>
                    </div>
                </div>
          </li>`
}

function showReplies(reply) {
    $('#reply_list').empty();

    console.log(reply.replys)
    reply.replys.forEach((replys, idx) => {
        $('#reply_list').append(get_reply_object(replys, idx));
    });

}
