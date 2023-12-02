// to alert message when Submit button is pressed

$("#add_piece").submit(function (event) {
    alert("Piece data is inserted");
})

$("update_piece").submit(function (event) {
    event.preventDefault(); //changing the default behavior of the form, to render the browser

    var unindexed_array = $(this).serializeArray(); // to get all the data in this var
    // console.log(unindexed_array);
    var data = {};
    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    //console.log(data);
    
    var request = {
        "url": `http://localhost:3000/api/pieces/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) { //make the req using jquery ajax
        alert("Piece info is updated");
    })
})


if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");
        var request = {
            "url": `http://localhost:3000/api/pieces/${id}`,
            "method": "DELETE"
        }

        if(confirm("Record is gonna be deleted")){ //confirm - inbuilt method to get permission from user
            $.ajax(request).done(function (response) { //make the req using jquery ajax
                alert("Piece info is deleted");
                location.reload();
            })
        }
    })
}