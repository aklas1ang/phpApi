

$(document).ready(function () {
    load();

    $('form').submit(function(event){
        event.preventDefault();
    });

    $('#create').on('click', function(){
        $.post('http://192.168.0.28/AjaxPhp/people.php', {
            create : "create",
            fullname : $('input[name="fullname"]').val(),
            email : $('input[name="email"]').val(),
            gender : $('input[name="gender"]').val()
        }, function(message){
            $('#message').text('');
            load();
            $('#message').prepend(`<div class="alert alert-success">${message}</div>`);
        });
    });

    $('#update').on('click', function(){
        $.post('http://192.168.0.28/AjaxPhp/people.php', {
            update : 'update',
            fullname : $('input[name="fullname"]').val(),
            email : $('input[name="email"]').val(),
            gender : $('input[name="gender"]').val(),
            id : $('input[name="id"]').val()
        },function(message){
            $('#message').text('');
            load();
            $('#message').prepend(`<div class="alert alert-success">${message}</div>`);
        });
    });
});


function load() {
    $('#body').text('');
    $.get('http://192.168.0.28/AjaxPhp/people.php', function (people) {
        let obj = JSON.parse(people);
        obj.forEach(function (individual) {
            $('#body').append(
                `<tr>
                    <td>${individual.ID}</td>
                    <td>${individual.Fullname}</td>
                    <td>${individual.Email}</td>
                    <td>${individual.Gender}</td>
                    <td>
                        <button onClick="editPeople('${individual.ID}')" class="btn btn-success">Edit</button>
                        <button onClick="deletePeople('${individual.ID}')" class="btn btn-danger">Delete</button>
                    </td>
                </tr>`
            );
        });
    });
}

function editPeople($id) {
    $.post('http://192.168.0.28/AjaxPhp/people.php', {
        single: $id
    }, function (individual) {
        let data = JSON.parse(individual);
        $('input[name ="id"]').val(`${data.ID}`);
        $('input[name="fullname"]').val(`${data.Fullname}`);
        $('input[name="email"]').val(`${data.Email}`);
        $('input[name="gender"]').val(`${data.Gender}`);
    });
}
// http://192.168.0.28:8080/AjaxPhp/people.php

function deletePeople($id){
    $.post('http://192.168.0.28/AjaxPhp/people.php', {
        delete : $id
    },function (message) {
        $('#message').text('');
        load();
        $('#message').prepend(`<div class="alert alert-success">${message}</div>`);
    });
}