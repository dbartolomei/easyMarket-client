 $(document).on('pagebeforeshow', "#newcc", function(event, ui) {
 
 $.ajax({
        url : window.url + "/address",
        contentType: "application/json",
        data: {user_id:localStorage.currentUser},
        success : function(data, textStatus, jqXHR){
	       var area=$("#billingaddress1");
	       area.empty();
	       var jason= data.data;
	       console.log(jason);
	           
		   var billaddress;
		   for(var i=0; i<jason.length;i++){
			   	billaddress=jason[i];
			   	area.append("<option value="+  billaddress.address_id   +">"+  billaddress.address_line1 + "," + billaddress.address_line2 +"</option>");
			    area.fieldcontain("refresh");
			}
	 	},
            
        error: function(data, textStatus, jqXHR){
            console.log("textStatus: " + textStatus);
            alert("Please add a valid Address before adding a Credit Card");
        }
    });
});


function new_cc(){
	var data = {
		ccnumber : $('#ccnumber').val(),
		ccownerfname : $('#ccownerfname').val(),
		ccownerlname : $('#ccownerlname').val(),
		company : $('#company').val(),
		expdate : $('#ccexp').val(),
		secretcode : $('#ccsc').val(),
		user_id : localStorage.currentUser 
	};
	
	var  ajax_url = url + "/new_creditcard";

	if(data.ccnumber.length == 0 
		|| data.ccownerfname.length == 0 
		|| data.ccownerlname.length == 0 
		|| data.company.length == 0
		|| data.expdate.length == 0
		|| data.secretcode.length == 0
	){
		alert('Please complete the form');
	}
	if(data.ccnumber.length != 16){
		alert('Check that your credit card number has 16 digits');
	}
	if(data.secretcode.length != 3){
		alert('Check that your credit card secret code has 3 digits');
	}
	else{
		$.post(ajax_url, data, function(){
			console.log('sucess');
		})
		.done(function(){
		})
		.fail(function(){
			alert('System Error: Please try later');
		});
		
	}
}