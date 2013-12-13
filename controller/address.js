$(document).on('pagebeforeshow', "#address", function(event, ui) {
	$.ajax({
		url : window.url + "/address",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){ 
			var addressList = data.data;
			var list = $("#address-list");
			
			list.empty();
			
			console.log(addressList);
			
			
			for(var i= 0; i < addressList.length; ++i){
				
				address= addressList[i];
				if(address.shippingflag==true){
				list.append("<li  style='background: #6E6E6E; color:white;' data-role=list-divider><h2 style='text-align: left'>Shipping Address </h2></li><li data-corners='false' ><a href='#' ><h3>" + 
				           address.address_line1 +" "+ address.address_line2+ "</h3>" 
								+ "<p><h3>" + address.zipcode + " "+address.city+", "+address.country
								+"</h3></p>" + 
							"<p><b>Click to edit</b></p></a></li><li  style='background: #6E6E6E; color:white;' data-role=list-divider><h2 style='text-align: left'>Other Addresses </h2></li>");
	         list.listview("refresh");
			
			}
			else{
				list.append("<li data-corners='false'><a href='#' ><h2>" + 
				           address.address_line1 +" "+ address.address_line2+ "</h2>" 
								+ "<p><h2>" + address.zipcode + " "+address.city+", "+address.country
								+"</h2></p>" + 
							"<p><b>Click to edit</b></p></a></li>");
	         list.listview("refresh");
			
				
				
			}
			
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});