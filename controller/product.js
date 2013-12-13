$(document).on('ready',function(event){ console.log('product.js loaded'); })

var current;
var cart = [];
var minimum=0.00;

    
$(document).on('pagebeforeshow', "#product", function( event, ui ) {
		$.ajax({
		url : window.url + "/product?id=" + localStorage.id,
		method: 'get',
		contentType: "application/json",
		success : function(product, textStatus, jqXHR){
			minimum=product.auction_price;
			$.mobile.loading("hide");
			$('#product-title').text(product.product_name);
			$('#product-description').text(product.description);
			$('#product-description').append('<img src="'+ product.image +'" id="product-image" style="width:100%"> </img>');
			if(product.sell_id === null){ 	// verify if the product is NOT for sale
				$('#addToCart').remove(); 	// remove addToCart button
				$('#price').show();
				$('#label').show();
				if(product.current_auction === null){ 	// verify if the product has CURRENT bid
					$('#bidNow').text('Bid Now at $'+product.auction_price); //set bidNow to initial price
				}
				else{ // set bidNow current price
					$('#bidNow').text('Bid Now $'+product.current_auction); // set bidNow to current bid
				}
			}
		
			if(product.auction_id === null){ // selling only
				$('#bidNow').remove();
				$('#price').hide();
				$('#label').hide();
				$('#addToCart').text('Buy Now at $'+product.sell_price);
			}
			

			if(product.auction_id !== null && product.sell_id !== null){ //both
				$('#addToCart').text('Buy Now at $'+product.sell_price);
                $('#price').show();
				$('#label').show();
				if(product.current_auction != null){
					$('#bidNow').text('Bid Now $'+product.current_auction);
				}
				else{
					$('#bidNow').text('Bid Now $'+product.auction_price);
				}	
			}

			
			$('#previousPage').attr('href',ui.prevPage);
		
		},
		
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Car not found.");
			}
			else {
				alert("Internal Server Error.");
			}
		}
	});
	
		 if(localStorage.currentUser == ''){
       
		$('#addToCart').remove();
		$('#bitNow').remove();
		$('#price').remove();
		$('#label').remove();
    } 
    
});

function bid(){
	
	alert("Are you sure to bid?");
	if($('#price').val()> minimum){
		var data = {
		product_id : localStorage.id,
        price : $('#price').val(), 
		user_id:localStorage.currentUser
		//local storage
	};

	var url = window.url + "/bid_product";

	
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			alert("Product bidded");
			$.mobile.changePage( "account.html", { reloadPage: true, transition: "none"} );
			
		})
		.fail(function(){
			alert('System Error: Please try later');
		})
}
else{
	
	alert("Price too low");
}
}


function addToCart(){
 if(localStorage.currentUser == ''){
        $.mobile.changePage("login.html",{ });
    } 
    else{
		var data = {
		product_id : localStorage.id,
        
		user_id:localStorage.currentUser
		//local storage
	};

	var url = window.url + "/add_product";

	
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			alert("Added to Cart!");
			//$.mobile.changePage( "cart.html", { reloadPage: true, transition: "none"} );
			
		})
		.fail(function(){
			alert('System Error: Please try later');
		})
	
	}
	
	
}
