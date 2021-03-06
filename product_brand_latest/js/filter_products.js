var items = [];
var loadJSON = function() {
  $.getJSON('product_data/product.json', function(data) {
  	$.each(data,function(key,val) {
      items[key] = {
        "name" : val.name,
        "url" : val.url,
        "color" : val.color,
        "brand" : val.brand,
        "sold_out" : val.sold_out,
        "latest" : val.latest
      }
    });
    console.log(items);
    displayProducts(items);
  });
}

var displayProducts  = function(products) {
	$.each(products, function(key, val) {
		// console.log(products[key]);
		var newLi = $("<li />").attr("data-brand", val.brand).attr("data-color", val.color).attr("data-sold", val.sold_out);
		$("<img />").attr("src", val.url).appendTo(newLi);
		newLi.appendTo("#products_display");
	});
}

var showSelectedItems = function(element) {
	var options = [], elements = [], possibles = [];

	$('.list_items').each(function() {
    opts = [];
    $('input:checked', this).each(function() {
        parentId = $(this).parent('.list_items').attr('id');
        opts.push("[data-" + parentId + "='" + $(this).attr('value') + "']");
        elements.push(opts);
    });
    options.push(opts);
	});
	console.log(options)
	flattenedArray = jQuery.map(elements, function(n) { return n });
	
	recursiveSearch = function(text, depth) {
		text = text || "";
		depth = depth || 0;

		for (var i = 0; i < options[depth].length; i++) {
      if(depth+1 < options.length)
      	recursiveSearch(text + ((text == "")?"":"") + options[depth][i],depth + 1);
      else 
      	possibles.push(text + options[depth][i]);
		}
	}
	recursiveSearch();
	$('#products_display li').hide();
	showProducts(flattenedArray, 0);	
	showProducts(possibles, 1);
}

var showProducts = function(array, hideAll) {
	console.log(array);
	var len = array.length;
	if (hideAll && len) { $('#products_display li').hide(); }
	if ( !(hideAll) && !(len)) { $('#products_display li').show(); }
	$.each(array, function(index, val) {
		$('#products_display li' + val).show();
	});
}

$(".list_items").delegate("input[type='checkbox']", "click", function() {
	showSelectedItems($(this));
});

$("#available_products").click(function() {
	$("li[data-sold=1]").hide();
})
loadJSON();