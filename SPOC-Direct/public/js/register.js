$('form').on('submit', function (e) {
    let username = $('#username').val();
    let pass = $('#password').val();
    let pass2 = $('#confirm').val();
    let email = $('#email').val();
    let profile = $('#avatar').val();
    if(username.length===0) {
        e.preventDefault();
        $('#error_msg').text("Username cannot be empty");
    }else if(pass.length===0){
        e.preventDefault();
        $('#error_msg').text("Password cannot be empty");
    }else if(pass.length<5){
        e.preventDefault();
        $('#error_msg').text("Password must be at least 5 characters");
    } else if(pass2.length===0){
        e.preventDefault();
        $('#error_msg').text("Password Confirmation cannot be empty");
    } else if(pass != pass2){
        e.preventDefault();
        $('#error_msg').text("Passwords must match");
    } else if(email.length===0){
        e.preventDefault();
        $('#error_msg').text("Email cannot be empty");
    } else if(profile.length===0){
        e.preventDefault();
        $('#error_msg').text("Profile Image URL cannot be empty");
    }
        else{
        $(document).ready(()=>{
            $.getJSON('/get_current_user').done((data)=>{
                if(data.message==="success"){
                    const user = data.data;
                    $('.login').remove();
                    $('#showname').text(user.fullname);
                    $('.like').on('click', function () {
                        console.log('this shit sucks');

                    });
                }else{
                    $('.logout').remove();
                    $('.like').on('click', function () {
                        location.href = "/login";
                    });
                }
            })
        })
    }
});
if (urlParams.get("error")) {
    $('#error_msg').text(urlParams.get("error"));
}
function redr(){
    location.href = "/";
}