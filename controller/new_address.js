function new_address1(){
	var data = {
		line1 : $('#line1').val(),
		line2 : $('#line2').val(),
		country : $('#country').val(),
		zipcode : $('#zipcode').val(),
		city : $('#city').val(),
		userid: localStorage.currentUser,
		shipping_address : $("#shipping-address option:selected").val()
	};
	console.log(data);
 	var url = window.url + "/new_address";

	if(data.line1.length == 0 
		|| data.country.length == 0 
		|| data.zipcode.length == 0
		|| data.city.length == 0
	){
		alert('Please complete the form');
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