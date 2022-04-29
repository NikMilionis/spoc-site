
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const  post_id = urlParams.get('post_id');
 //console.log(post_id);

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
