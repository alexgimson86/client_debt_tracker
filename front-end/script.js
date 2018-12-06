$(document).ready(function(){
    var link = 'http://localhost:3000';
    
    (function(){
        $.ajax({
            url: link,
            type: "GET",
            dataType:"json"
        })
        .done(function(data){
            $('#greeting').text(data.message)
        })
        .fail(function(err){

        });
    }());

});