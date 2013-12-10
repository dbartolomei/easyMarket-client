$(document).on('ready',function(event){ console.log('account.js loaded'); })


$(document).on('pagebeforeshow', "#account", function(event, ui) {
    $.mobile.loading("show");
    if(localStorage.currentUser == ''){
        $.mobile.changePage("login.html",{ });
    } 
    else{
		$.ajax({
            url : "http://easymarket.herokuapp.com/user",
            contentType: "application/json",
            data: {user_id:localStorage.currentUser},
            success : function(data, textStatus, jqXHR){
            var list = $('#account-list');
            $('#welcome').text('Welcome '+ data.data[0].first_name);
            list.empty();
            
            list.append("<li><a href='profile.html' > Profile</a></li><li><a href='selling.html'  > Listings</a></li><li><a  href='bids.html'> Bids</a></li><li><a href='orders.html' >Orders</a></li><li><a href='creditcard.html' > Credit Cards </a></li><li><a href='address.html'  > Addresses</a></li>");  
			 list.listview("refresh");    
            },
            
            error: function(data, textStatus, jqXHR){
                console.log("textStatus: " + textStatus);
                alert("Data not found!");
            }
        })
    }    
});

function logout(){
	localStorage.currentUser = ''
	$.mobile.changePage("index.html")
}

function login(){
	var data = {
		username : $('#username').val(),
		password : $('#password').val()
	}

	if(data.username.length != 0 && data.password.length != 0){
		
        $.post('http://easymarket.herokuapp.com/login', data, function(response){console.log('logedIn')})
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
	  	})
	}
}