

$(document).on('pagebeforeshow', "#cart", function(event, ui) {
	  if(localStorage.currentUser == ''){
        $.mobile.changePage("login.html",{ });
    } 
    else{
	$.ajax({
		url : "http://localhost:5000/cartproducts",
		contentType: "application/json",
		data: {user_id:localStorage.currentUser},
		success : function(data, textStatus, jqXHR){
			var cartList = data.data;
			var list3 = $("#cart-list");
			
			var total=$("#cart-checkout");
			list3.empty();
			total.empty();
			console.log(cartList);
			
			for(var i= 0; i < cartList.length; ++i){
				console.log();
				
				
				product = cartList[i];
				list3.append("<li id='listitem'><a onclick=GetProductPage(" + product.product_id + ")>"
								+ "<h2>" + product.product_name +  "</h2>" 
								+ "<p>" + product.description + "</p>" 
								+ "<p>Price: " + product.price + "</p>" +"</a></li>"
				);
				
	         list3.listview("refresh");
			
			}
			total.append("<h4 style='text-align: right'>Total: $ "+product.price_total +"</h4>");
		$("li").on("swipe",function(){
            $(this).hide();
            $("h4").hide();
  });    
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});}
});



