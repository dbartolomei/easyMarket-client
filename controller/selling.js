$(document).on('ready',function(event){ console.log('selling.js loaded'); })

$(document).on('pagebeforeshow', "#selling", function(event, ui) {
	$.ajax({
		url : "http://easymarket.herokuapp.com/sellingproducts",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){
			var list = $("#sellproducts");
			list.empty();
			var products = data.data;
			list.append("<li  style='background: #6E6E6E; color:white;' data-role=list-divider><h3 style='text-align: left'>Selling Products (" + 
			   products.length+")</h3></li>");
			
			if(products.length==0){
				
				list.append("<li><p>&nbsp;&nbsp;&nbsp;Empty</p></li>");
				list.listview("refresh");
			}
			else{
			
			for(var i= 0; i < products.length; ++i){
	            product = products[i];
	            
				list.append("<li><a onclick=GetProductPage(" + 
				product.product_id + ")><p><h4>"+
				product.product_name + "</h4></p><p>"+product.description 
				+"</p><p>Brand: " + product.brand+
				"</p><p>Price: $" + product.price+"</p><p>Stock: " + product.stock
				+"</p></a></li>"
				);
	         list.listview("refresh");
			
			}}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
	
	$.ajax({
		url : "http://easymarket.herokuapp.com/auctionproducts",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){
			var list = $("#auctionproducts");
			
			list.empty();
			var products = data.data;
			list.append("<li  style='background:#6E6E6E; color:white;' data-role=list-divider><h3 style='text-align: left'>Bids (" + 
			   products.length+")</h3></li>");
			



			 if(products.length==0){
				
				list.append("<li><p>&nbsp;&nbsp;&nbsp;Empty</p></li>");
				list.listview("refresh");
			}
			else{
			
			for(var i= 0; i < products.length; ++i){
	            product = products[i];
               
               list.append("<li data-theme='c' data-role='list-divider' ><a onclick=GetProductPage(" + 
				product.product_id + ")><p><h4>"+
				product.product_name + "</h4></p><p>"+product.description 
				+"</p><p>Brand: " + product.brand+ "</p><p>Start price: $" + product.auction_price+ 
				"</p><p>End time: " + (product.end_time).substring(0,10)+ "</p></a></li><li style='background:white; color:black;'><a href='#' data-role='button'><p><h4>Highest Bid</h4></p><p>Bid Price: $"
				+product.bid_price+"</p><p> User: "+ product.first_name+" "+product.last_name+"</p>Click to Accept Bid</a></li>"
				);
				
	         list.listview("refresh");
	         for(var j= i+1; j < products.length; ++j){
	         	if(products[j].product_id==product.product_id){
	         		list.append("<li style='background:white color:black;' ><p>Bid Price: $"
				+products[j].bid_price+"</p><p> User: "+products[j].first_name+ " "+products[j].last_name+"</p> </li>"
				
				);
				list.listview("refresh");
				i++;
	         	}
	         	else{
	         		j=products.length;
	         	}
	         	
	         	
	         }
			
			}}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});