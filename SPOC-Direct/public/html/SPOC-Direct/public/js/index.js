$(document).ready(()=>{
    $.getJSON('/get_current_user').done((data)=>{
        if(data.message==="success"){
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
        }else{
            $('.logout').remove();
        }
    })
})