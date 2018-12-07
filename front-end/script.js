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
                    $('tbody').append('<tr><td>' + customer.name + '</td><td>' + customer.amount_owed + '</td></tr>') ;
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
                        $('tbody').append('<tr><td class="list-group-item">' + customer + '</td><td class="list-group-item">' + debt + '</td></tr>') ;
                    })
                }
            })
            .fail(function(err){
                console.log(err)
            });
        }
    })
});
