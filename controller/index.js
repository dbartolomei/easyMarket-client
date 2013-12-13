url = 'http://localhost:5000';
//url = 'http://easymarket.herokuapp.com';

$(document).on('ready',function(event){ console.log('index.js loaded'); })

$(document).on('pagebeforeshow', "#home", function(event, ui) {
	$.ajax({
		url : url + "/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.data;
			var list = $("#product-list");
			list.empty();
			//console.log(productList);
			for(var i= 0; i < productList.length; ++i){
				console.log()
				product = productList[i];
				list.append("<li data-corners='false'><a onclick=GetProductPage(" + product.product_id + ")>"
								+ "<h2>" + product.product_name +  "</h2>" 
								+ "<p>" + product.description + "</p>" 
								+ "<p>Price: " + product.price + "</p>" +
							"</a></li>"
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

function GetProductPage(id){
	localStorage.id = id;
	$.mobile.changePage("product_single.html",
		 {
             allowSamePageTransition : true,
             transition              : 'none',
             showLoadMsg             : false,
             reloadPage              : false
       });
	$.mobile.loading("show");
}


function logout(){
	localStorage.user_id = ''
	$.mobile.changePage("index.html")
}