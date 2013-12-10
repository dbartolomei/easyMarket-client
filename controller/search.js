$(document).on('ready',function(event){ console.log('search.js loaded'); })

$(document).on('pagebeforeshow', "#search", function(event, ui) {
	var keyword = $('#search-basic').val();
	var category = $('#search-category').val();
	$.ajax({
		url : "http://easymarket.herokuapp.com/search/categories/root",
		type : "GET",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.data;
			var list = $("#category-list");
            list.empty();
			for(var i= 0; i < categoryList.length; ++i){
				list.append("<li><a onclick=getCategoryPage(" + categoryList[i].category_id + ")><h2>" + categoryList[i].name +  "</h2></a></li>");
				list.listview("refresh");
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

function getCategoryPage(id){
	localStorage.category_id = id;
	$.mobile.changePage("category.html",
		 {
             allowSamePageTransition : true,
             transition              : 'none',
             showLoadMsg             : false,
             reloadPage              : true
       });
	$.mobile.loading("hide");
}

$(document).on('pagebeforeshow', "#categoryPage", function(event, ui) {
	var category = $('#search-category').val();
	$.ajax({
		url : "http://easymarket.herokuapp.com/search/category?category_id="+localStorage.category_id,
		type : "GET",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			if(data.data.length != 0){
				var categoryList = data.data;
				var list = $("#category-list");
            	list.empty();
				for(var i= 0; i < categoryList.length; ++i){
					list.append("<li><a onclick=getCategoryPage(" + categoryList[i].category_id + ")><h2>" + categoryList[i].name +  "</h2></a></li>");
					list.listview("refresh");
				}
			}
			else{
				console.log('product list triggered');
				$.mobile.changePage("product_list.html");
				$.mobile.loading("hide");
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#productListByCategory", function(event, ui) {
	console.log('product list page reached');
	$.ajax({
		url : "http://easymarket.herokuapp.com/search/products/category?category_id=" + localStorage.category_id,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.data;
			var list = $("#product_list");
			list.empty();
			for(var i= 0; i < productList.length; ++i){
				product = productList[i];
				list.append("<li><a onclick=GetProductPage(" + product.product_id + ")>"
								+ "<h2>" + product.product_name +  "</h2>" 
								+ "<p>" + product.description + "</p>" 
								 +
							"</a></li>"
				);
	         list.listview("refresh");
	         $.mobile.loading("hide");
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});