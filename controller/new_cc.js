 $(document).on('pagebeforeshow', "#newcc", function(event, ui) {
 
 $.ajax({
            url : "http://localhost:5000/getaddress",
            contentType: "application/json",
            data: {user_id:localStorage.currentUser},
            success : function(data, textStatus, jqXHR){
           var area=$("#billingaddress1");
           area.empty();
           var jason= data.data;
           console.log(jason);
           
   var billaddress;
   var message = "Select a Billing Address";
   area.append("<option>" + message + "</option>");
   for(var i=0; i<jason.length;i++){
       billaddress=jason[i];
       
    area.append("<option value="+  billaddress.address_id   +">"+  billaddress.address_line1 + "," + billaddress.address_line2 +"</option>");
       
    
         area.fieldcontain("refresh");
           }
          
       // area.append("</select>");   
           },
            
            error: function(data, textStatus, jqXHR){
                console.log("textStatus: " + textStatus);
                alert("Data not found!");
            }
       });
});
var billingaddress = $('#billingaddress1 option:selected').val();

 function new_billaddress(){
 	alert('llego');
 	alert(billingaddress);
 	var data1 = {
		addressid : billingaddress,
		user_id : localStorage.currentUser 
	};
	
		
 		var url1 = "http://localhost:5000/new_billaddress";
 		$.post(url1, data1, function(){
			console.log('sucess');
		})
		.done(function(){
			//change location to addresses view
		})
		.fail(function(){
			alert('System Error: Please try later');
		});
 	
 }

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
	
	var url = "http://localhost:5000/new_creditcard";

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
		alert('hola');
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			//change location to addresses view
			
			new_billaddress();
		})
		.fail(function(){
			alert('System Error: Please try later');
		});
		
	}
}