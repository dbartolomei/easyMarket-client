function new_user1(){
	alert('wassaa');
	alert($("#gender option:selected").val());
	var data = {
		fname : $('#fname').val(),
		lname : $('#lname').val(),
		email : $('#u_email').val(),
		password : $('#u_pass').val(),
		phone : $('#u_phone').val(),
		bday : $('#u_bday').val(),
		gender : $("#gender option:selected").val()
	};
	var pass_check = $('#pass_check').val();
	var url = "http://localhost:5000/new_user";

	if(data.fname.length == 0 
		|| data.lname.length == 0 
		|| data.email.length == 0 
		|| data.password.length == 0
		|| data.phone.length == 0
		|| data.bday.length == 0
		|| data.gender.length == 0
	
		
	){
		alert('Please complete the form');
	}
	else if((pass_check != data.password) && (pass_check != null)){
		alert('Passwords do not match! Try again');	
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