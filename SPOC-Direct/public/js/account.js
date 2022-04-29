function get_car_personal(car){
    return `<li className="list-group-item">
    <div className="row">
                    <div class="col">${car.year}</div>
                    <div class="col">${car.make}</div>
                    <div class="col">${car.model}</div>
                    <div class="col">${car.color}</div>
                    <div class="col">${car.price}</div>
    </div>
</li>`
}



function load_user(user) {
    $('#name').text(user.username);
    $('#profile_img').attr('src', user.avatar);
}

function get_car_block(car, idx) {
    return `<div class="car_block ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                <div class="row">
                    <div class="col">${car.year},</div>
                    <div class="col">${car.make},</div>
                    <div class="col">${car.model},</div>
                    <div class="col">${car.color},</div>
                    <div class="col">${car.price}</div>
                </div>
            </div>`
}

$(document).ready(function () {
        $.getJSON('/get_current_user')
            .done(function (data) {
                if (data["message"] === "success") {
                    let user = data["data"];
                    load_user(user);
                    console.log("welcome user")
                }
            });
});

