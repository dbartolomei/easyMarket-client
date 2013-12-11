function new_address(){
	var data = {
		line1 : $('#line1').val(),
		line2 : $('#line2').val(),
		state : $('#state').val(),
		country : $('#country').val(),
		zipcode : $('#zipcode').val()
	};

	var url = "http://localhost:5000/new_address";

	if(data.line1.length == 0 
		|| data.state.length == 0 
		|| data.country.length == 0 
		|| data.zipcode.length == 0
	){
		alert('Please complete the form')
	}
	else{
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			//change location to addresses view
		})
		.fail(function(){
			alert('System Error: Please try later');
		});
	}
}