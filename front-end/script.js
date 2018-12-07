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
                /*data.docs.forEach(function(customer){
                    $('tbody').append(`<tr><td contenteditable="true" value="${customer.name}"> ${customer.name} </td><td contenteditable="true" value="${customer.amount_owed}"> ${customer.amount_owed}</td><td><button class="btn btn-warning" id="${customer._id}_edit" type="button">edit</button></td><td><button class="btn btn-danger" type="button" id="${customer._id}_delete" type="button" >delete</button></tr>`) 
                })*/
                data.docs.forEach(function(customer){
                    $('tbody').append(`<tr><td contenteditable="true" id="${customer._id}_name" value="${customer.name}"> ${customer.name} </td><td contenteditable="true" id="${customer._id}_debt"> ${customer.amount_owed}</td><td><button class="btn btn-warning" id="${customer._id}_edit" type="button">edit</button><button class="btn btn-danger" type="button" id="${customer._id}_delete" type="button" >delete</button></td></tr>`) 
                })
            }
        })
        .fail(function(err){
            //efef
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
    //edit function
   /* $('td .btn-warning').click(function(){
        console.log("hello")
        console.log($(this).attr('id'))

    })*/
    $('tbody').on('click', '.btn-warning', function(){
        var id = $(this).attr('id')
        var trimmedId  = id.substring(0,id.length - 5)
        var nameId = trimmedId + '_name'
        var debtId = trimmedId + '_debt'

        var name = $(`#${nameId}`).text()
        var debt = $(`#${debtId}`).text()
        $.ajax({
            url: link,
            type: "PUT",
            data: {id: trimmedId, name: name, debt: debt},
            dataType: JSON
        })
});
});
