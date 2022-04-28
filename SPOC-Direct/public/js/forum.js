function get_post_object(post, idx) {
    return `<li class="list-group-item" data-p="${post._id}">
                <div class="row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                    <div class="col-lg-3 imgDiv">
                        <img id="post_img_list" src="${post.url}" onerror="this.src='../img/default.png'">
                    </div>
                    <div class="col-lg-6 infoDiv">
                        <h2 class="post_title">${post.title}</h2>
                        <p class="rating larger_text cel_noto">tags: ${post.tags}</p>
                    </div>
                    <div class="col-lg-3 d-flex justify-content-end buttonDiv">
                        <input type="checkbox" class="check_box" value="${post._id}">
                    </div>
                </div>
          </li>`
}

function showList(posts) {
    $('#post_list').empty();
    posts.forEach((post, idx) => {
        $('#post_list').append(get_post_object(post, idx));
    });

    $('.imageDiv, .infoDiv').on('click', function () {
        const post_id = $(this).parents('li').attr('data-p');
        location.href = "post_detail.html?post_id=" + post_id;
    });
}

$.getJSON("/get_all_posts")
    .done(function (data) {
        if (data.message === "success") {
            console.log(data.data)
            showList(data.data);
        }
    });
