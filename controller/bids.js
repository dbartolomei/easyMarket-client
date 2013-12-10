$(document).on('ready',function(event){ console.log('bids.js loaded'); })

$(document).on('pagebeforeshow', "#bids", function(event, ui) {
	$.ajax({
		url : "http://easymarket.herokuapp.com/winningbids",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		
		success : function(data, textStatus, jqXHR){
			var list = $("#winningbids");
			list.empty();
			
			
			
			var bidding = data.data;
			list.append("<li  style='background: green; color: white;' data-role=list-divider><h3 style='text-align: left'>Winning Bids</h3></li>");
			
			if(bidding.length==0){
				
				list.append("<li><p>&nbsp;&nbsp;&nbsp;Empty</p></li>");
				list.listview("refresh");
			}
			else{
			
			for(var i= 0; i < bidding.length; ++i){
	            bid = bidding[i];
	            
				list.append("<li><a onclick=GetProductPage(" + 
				bid.product_id + ")><p><h4>"+
				bid.product_name + "</h4></p><p>Price bidded: "+bid.price 
				+"</p><p>Date bidded: " + (bid.bid_date).substring(0,10)+"</p><p>Bid ends: " + (bid.end_time).substring(0,10)
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
		url : "http://localhost:5000/losingbids",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		
		success : function(data, textStatus, jqXHR){
			var list = $("#losingbids");
			list.empty();
			
			
			
			var bidding = data.data;
			list.append("<li  style='background: red; color: white;' data-role=list-divider><h3 style='text-align: left'>Losing Bids</h3></li>");
			
			if(bidding.length==0){
				
				list.append("<li><p>&nbsp;&nbsp;&nbsp;Empty</p></li>");
				list.listview("refresh");
			}
			else{
			for(var i= 0; i < bidding.length; ++i){
	            bid = bidding[i];
				list.append("<li><a onclick=GetProductPage(" + 
				bid.product_id + ")><p><h4>"+
				bid.product_name + "</h4></p><p>Price bidded: "+bid.price 
				+"</p><p>Date bidded: " + (bid.bid_date).substring(0,10)+"</p><p>Bid ends: " + (bid.end_time).substring(0,10)
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
});