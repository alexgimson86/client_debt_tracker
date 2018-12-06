$(document).ready(function(){
    var link = 'http://localhost:3000';
    (function(){
        $.ajax({
            url: link,
            type: "GET",
            dataType:"json"
        })
        .done(function(data){
            if(data){
                data.docs.forEach(function(customer){
                    $('table').append('<tr><td>' + customer.name + '</td>' + '<td>' + customer.amount_owed + '</td></tr>') ;
                })
            }
        })
        .fail(function(err){
        });
    }());
    //insert new document
    $('#newDoc').click(function(){
        if($("input[name='customer']").val() !== '' && $("input[name='debt']").val() !== ''){
            var customer = $("input[name='customer']").val();
            var debt = $("input[name='debt']").val()
            $.ajax({
                url: link,
                type: "POST",
                data: {customer: customer, debt: debt},
                dataType: JSON
            })
            .done(function(data){
                if(data){
                    data.docs.forEach(function(doc){
                        $('table').append('<tr><td>' + customer + '</td>' + '<td>' + debt + '</td></tr>') ;
                    })
                }
            })
            .fail(function(err){
                console.log(err)
            });
        }
    })
});
