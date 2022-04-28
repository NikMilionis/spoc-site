function fillPost(post) {
    $('#title').val(post.title);
    $('#url').val(post.url);
    $('#postdetail').val(post.postdetail);
    $('#tags').val(post.tags);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const input = JSON.parse(urlParams.get('input'));
const post_id = urlParams.get('post_id');


$('form').on('submit', function () {
    if (post_id) {
        $('form').append(() => {
            const input = $("<input>")
                .attr('name', '_id')
                .attr('value', post_id)
            return input;
        })
    }
});

if (errorMessage) {
    fillPost(input);
}


if (post_id && !errorMessage) {
    $.getJSON('/get_post_by_id?post_id=' + post_id).done((data) => {
        if (data['message'] = 'success') {
            console.log(data.data)
            fillPost(data.data)
        }
    })
}

function OnCancel() {
    if (post_id) {
        return
    } else {
        window.location.href = "/forum"
    }
}
