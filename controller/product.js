$(document).on('ready',function(event){ console.log('product.js loaded'); })

var current;
var cart = [];

$(document).on('pagebeforeshow', "#product", function( event, ui ) {
		$.ajax({
		url : "http://easymarket.herokuapp.com/product?id=" + localStorage.id,
		method: 'get',
		contentType: "application/json",
		success : function(product, textStatus, jqXHR){
			$.mobile.loading("hide");
			$('#product-title').text(product.product_name);
			$('#product-description').text(product.description);
			$('#product-description').append('<img src="'+ product.image +'" id="product-image" style="width:100%"> </img>');
			if(product.sell_id === null){ 	// verify if the product is NOT for sale
				$('#addToCart').remove(); 	// remove addToCart button
				
				if(product.current_auction === null){ 	// verify if the product has CURRENT bid
					$('#bidNow').text('Bid Now at $'+product.auction_price); //set bidNow to initial price
				}
				else{ // set bidNow current price
					$('#bidNow').text('Bid Now $'+product.current_auction); // set bidNow to current bid
				}
			}
		
			if(product.auction_id === null){ // selling only
				$('#bidNow').remove();
				$('#addToCart').text('Buy Now at $'+product.sell_price);
			}
			

			if(product.auction_id !== null && product.sell_id !== null){ //both
				$('#addToCart').text('Buy Now at $'+product.sell_price);

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
});



function addToCart(){
	console.log(current);
	var aux = JSON.parse(localStorage.cart);
	console.log(aux);
	aux.push(current);
	console.log(aux);

	localStorage.cart = JSON.stringify(aux);
}