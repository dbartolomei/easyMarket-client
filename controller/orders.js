$(document).on('ready',function(event){ console.log('orders.js loaded'); })


$(document).on('pagebeforeshow', "#orders", function(event, ui) {
	$.ajax({
		url : "http://easymarket.herokuapp.com/orders",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){
			var productList = data.data;
			var list = $("#products");
			
			list.empty();
			
			console.log(productList);
			
			
			for(var i= 0; i < productList.length; ++i){
				
				product = productList[i];
				list.append("<li><a onclick=GetProductPage(" + product.product_id + ")><p><h2>Order Placed: " + (product.transaction_date).substring(0,10) +  "</h2></p>" 
								+ "<p><h2>Order Number: " + product.transaction_id+ "</h2></p>" 
								+ "<p>Product: " + product.product_name + "</p>" 
								+ "<p>Brand: " + product.brand + "</p>" 
								+ "<p>Price: $" + product.price + "</p>" 					
				);
	         list.listview("refresh");
			
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});