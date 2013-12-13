$(document).on('ready',function(event){  

$('#pricespace').hide();
$('#auctionspace').hide();

});

$(document).on('pagebeforeshow', "#sell", function(event, ui) {
      
		$.ajax({
            url : window.url + "/categoriesfornewproduct",
            contentType: "application/json",
            success : function(data, textStatus, jqXHR){
           var area=$("#categories");
           area.empty();
           var jason= data.data;
         
           
   var cat;
   for(var i=0; i<jason.length;i++){
   	cat=jason[i];
   	if(cat.child_id==null){
    area.append("<option value="+  cat.category_id   +">"+  cat.parent_name+"-"+cat.category_name  +"</option>");
     }
     else{
     area.append("<option value="+  cat.child_id   +">"+  cat.parent_name+"-"+cat.category_name +"-"+cat.child_name  +"</option>");	
     	
     }
         area.fieldcontain("refresh");
           }
        area.append("</select>");   
           },
            
            error: function(data, textStatus, jqXHR){
                console.log("textStatus: " + textStatus);
                alert("Data not found!");
            }
       });
      
});
function priceshow(){
	
	$('#pricespace').show();
	
	
}
function auctionshow(){
	$('#auctionspace').show();
	
	
}


function new_product(){
	
	var data = {
		name : $('#name').val(),
		description : $('#description').val(),
		model : $('#model').val(),
		image: $('#image').val(),
		brand: $('#brand').val(),
		dimensions : $('#dimensions').val(),
		category : $('#categories').val(),
		sellprice : $('#sellprice').val(),
		end_time : $('#end_time').val(),
		stock : $('#stock').val(),
		auctionprice: $('#auctionprice').val(),
		user_id:localStorage.currentUser
		//local storage
	};

	var url = window.url + "/new_product";

	
		$.post(url, data, function(){
			console.log('sucess');
		})
		.done(function(){
			alert("Product added!");
			$.mobile.changePage( "sell.html", { reloadPage: true, transition: "none"} );
			//$.mobile.changePage( "account.html", { transition: "slideup", changeHash: false });
			//change location to addresses view
		})
		.fail(function(){
			alert('System Error: Please try later');
		})
	
}