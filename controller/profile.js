$(document).on('ready',function(event){ console.log('profile.js loaded'); })

$(document).on('pagebeforeshow', "#profile", function(event, ui) {
    $.mobile.loading("show");
    if(localStorage.currentUser == ''){
        $.mobile.changePage("login.html",{ });
    } 
    else{
    	
		$.ajax({
            url : url + "/user",
            contentType: "application/json",
            data: {user_id:localStorage.currentUser},
            success : function(data, textStatus, jqXHR){
            	$('.profileItem').empty();
            	$('#first_name').append('First Name: '+data.data[0].first_name);
            	$('#last_name').append('Last Name: '+ data.data[0].last_name);
            	$('#email').append('Email: '+ data.data[0].email);
            	$('#phone_number').append('Phone Number: ' + (data.data[0].phone_number).substring(0,3)+'-'+(data.data[0].phone_number).substring(3,6)+'-'+(data.data[0].phone_number).substring(6,10));
            	$('#date_of_birth').append('Date of Birth: '+ data.data[0].date_of_birth.substring(0,10));
            },
            error: function(data, textStatus, jqXHR){
                console.log("textStatus: " + textStatus);
                alert("Data not found!");
            }
       });
    }    
});

function logout(){
	localStorage.currentUser = '';
	$.mobile.changePage("index.html");
}

function login(){
	var data = {
		username : $('#username').val(),
		password : $('#password').val()
	};

	if(data.username.length != 0 && data.password.length != 0){
		
        $.post(url + '/login', data, function(response){console.log('logedIn')})
		.done(function(data, textStatus, jqXHR){
            console.log(data);
            $.mobile.changePage("account.html",{ });
			localStorage.check = true;
            console.log(data.data.user_id);
			localStorage.currentUser = data.data.user_id;

		})

		.fail(function(data, textStatus, jqXHR) {
            console.log(data);
            console.log(textStatus);
			alert( "error" );
	  });
	}
}
