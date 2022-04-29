function get_post_object(post, idx) {


     //console.log(post.timepost[0].date)
    return `<li class="list-group-item" data-p="${post._id}">
                <div class="row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                    <div class="col-lg-3 imgDiv">
                        <img id="post_img_list" src="${post.url}" onerror="this.src='../img/default.png'">
                    </div>
                    <div class="col-lg-6 infoDiv">
                        <h2 class="post_title">${post.title}</h2>
                        <p class="tags">tags: ${post.tags}</p>
                        <p class="time">${post.timepost[0].date} ${post.timepost[0].time}</p>
                    </div>
              
                </div>
          </li>`
}

function showList(posts) {
    $('#post_list').empty();
    posts.forEach((post, idx) => {
        $('#post_list').append(get_post_object(post, idx));
    });

    $('.post_title').hover(function () {
        $(this).toggleClass('highlight_forum')
        console.log("hovering")

    })

    $('.post_title').on('click', function () {
        const post_id = $(this).parents('li').attr('data-p');
        location.href = "post_detail.html?post_id=" + post_id;
    });
}
//timetest
// let times = [];
// $('body').on('click', function (){
//     const time = new Date().toLocaleTimeString()
//     times.push(time)
  //console.log(time)
  //console.log(times)
// })

$.getJSON("/get_all_posts")
    .done(function (data) {
        if (data.message === "success") {
             //console.log(data.data)
            showList(data.data);
        }
    });
