easyMarket-client
=================

easyMarket mobile web client

You can get a live preview of this project (phase1) [HERE](http://dbartolomei.com/em)


[ER Report](http://dbartolomei.com/em/ER%20diagram%20Report.docx)

[ER Diagram](http://dbartolomei.com/em/ER%20diagram.pdf)



##Pending Work

* Create product single view
	* For the purposes of Phase1, when calling the REST request for all objects, **attach** dynamically to the same **index.html** all single view pages. 

* The Navigation Menu Should Contains (in this order):
	* Home
	* Search
	* My Account
	* Sell
	* Cart
	
###Home
This view is almost done. Needs a SIGNIN button on the top navbar.

###Search
This view need a search field. With JQUERY you can add a hidden list of items with the same REST route used to get all products. More information [here](http://jquerymobile.com/demos/1.3.0-rc.1/docs/demos/widgets/autocomplete/).

###My Account
In this view we need the following fields:

* Name
* Lastname
* Address (list) 
	* [addAddressButton] - this need another view to enter the fields
* Credit Cards
	* [addCreditCard] - this need another view to enter the fields
* Bank Account || [addBankAccountButton] - this need another view to enter the fields


###Sell View
In this view we need the following fields:

* Name
* Description
* Picture
* Price
* Type (sale, auction, both)
	* If both:
		* Base Price
		* Buy Now Price


