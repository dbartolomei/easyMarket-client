

$(document).on('pagebeforeshow', "#cart", function(event, ui) {
	  if(localStorage.currentUser == ''){
        $.mobile.changePage("login.html",{ });
    } 
    else{
    	
    		$.ajax({
            url : "http://localhost:5000/creditcard",
            contentType: "application/json",
            data: {user_id:localStorage.currentUser},
            success : function(data, textStatus, jqXHR){
           var area=$("#creditcards");
           area.empty();
           var jason= data.data;
           console.log(jason);
           
   var cat;
   for(var i=0; i<jason.length;i++){
   	cat=jason[i];
   	
    area.append("<option value="+  cat.creditcard_id   +">"+  (cat.creditcard_number).substring(12,16)+"-"+cat.company +"</option>");
   	
    
         area.fieldcontain("refresh");
           }
          
       // area.append("</select>");   
           },
            
            error: function(data, textStatus, jqXHR){
                console.log("textStatus: " + textStatus);
                alert("Data not found!");
            }
       });
     
	
	$.ajax({
		url : "http://easymarket.herokuapp.com/cartproducts",
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
				list3.append("<li id=" + product.product_id + "><a onclick=GetProductPage(" + product.product_id + ")>"
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
            var data = {
		user_id:localStorage.currentUser
		//product_id: $(this)
		};
alert(data[0]);
	// var url = "http://localhost:5000/remove";
// 
// 	
		// $.post(url, data, function(){
			// console.log('sucess');
		// })
		// .done(function(){
			// alert("Chech your email for receipt!");
			// $.mobile.changePage( "account.html", { reloadPage: true, transition: "none"} );
// 			
		// })
		// .fail(function(){
			// alert('System Error: Please try later');
		// })
// 	
  });    
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
	
      
	
	
	
	}
});

function checkout(){

		var data = {
		user_id:localStorage.currentUser};

	var url = "http://localhost:5000/checkout";

	
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			alert("Chech your email for receipt!");
			$.mobile.changePage( "account.html", { reloadPage: true, transition: "none"} );
			
		})
		.fail(function(){
			alert('System Error: Please try later');
		})
	
	
	
	
}


