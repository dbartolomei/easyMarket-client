$(document).on('pagebeforeshow', "#credit", function(event, ui) {
	$.ajax({
<<<<<<< HEAD

		url : "http://localhost:5000/creditcard",
=======
		url : window.url + "/creditcard",
>>>>>>> d1c79b6c8af6837b273e1e1d9fbf840fe0d44293
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){
			
			var ccList = data.data;
			var list = $("#cc-list");
			
			list.empty();
			
			console.log(ccList);
			
			
			for(var i= 0; i < ccList.length; ++i){
				
				cc= ccList[i];
				list.append("<li><a href='#' ><p><h2>Credit Card Number: ************ " + (cc.creditcard_number).substring(12,16) +  "</h2></p>" 
								+ "<p><h2>Cardholder Name: " + cc.cardholder_first_name +" "+ cc.cardholder_last_name + "</h2></p>" 
								+ "<p>Company: " + cc.company+ "</p>" 
								+"<p>Address: " + cc.address_line1+" " +cc.address_line2+", "+ cc.country+ "</p>" 
								+ "<p><b>Click to edit </b></p>");
	         list.listview("refresh");
			
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});