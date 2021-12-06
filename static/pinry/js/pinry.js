/**
 * Pinry
 * Descrip: Core of pinry, loads and tiles pins.
 * Authors: Pinry Contributors
 * Updated: Apr 5th, 2013
 * Require: jQuery, Pinry JavaScript Helpers
 */


$(window).load(function() {
	
    /**
     * tileLayout will simply tile/retile the block/pin container when run. This
     * was put into a function in order to adjust frequently on screen size 
     * changes.
     */
    window.tileLayout = function() {
       
        var blockContainer = $('#pins'),
            blocks = blockContainer.children('.pin'),
            blockMargin = 15,
            blockWidth = 240,
            rowSize = Math.floor(blockContainer.width()/(blockWidth+blockMargin)),
            colHeights = [],
            rowMargins = [],
            marginLeft = 0;

        // Fill our colHeights array with 0 for each row we have
        for (var i=0; i < rowSize; i++) colHeights[i] = 0;
        // Fill out our rowMargins which will be static after this
        for (var i=0; i < rowSize; i++) {
            // Our first item has a special margin to keep things centered
            if (i == 0) rowMargins[0] = (blockContainer.width()-rowSize*(blockWidth+blockMargin))/2;
            else rowMargins[i] = rowMargins[i-1]+(blockWidth+blockMargin);
        }
        // Loop through every block
        for (var b=0; b < blocks.length; b++) {
            // Get the jQuery object of the current block
            block = blocks.eq(b);
            // Position our new pin in the shortest column
            var sCol = 0;
            for (var i=0; i < rowSize; i++) {
                if (colHeights[sCol] > colHeights[i]) sCol = i;
            }
            block.css({
                'margin-left': rowMargins[sCol],
                //'margin-top':  colHeights[sCol],
                'margin-top':  2,
            });
            block.fadeIn(300);
            //colHeights[sCol] += block.height()+(blockMargin);
            colHeights[sCol] += 275+(blockMargin);
        }

        // Edit pin if pencil icon clicked
        $('.pencil').each(function() {
            var thisPin = $(this);
            //$(this).off('click');
            $(this).click(function() {
                //$(this).off('click');
                pinForm($(this).data('id'));
            });
        });

        // Share pin if pencil icon clicked
        $('.glyphicon-share').each(function() {
            var thisPin = $(this);
            $(this).off('click');
            $(this).click(function() {
                $(this).off('click');
                pinForm($(this).data('id'));
            });
        });

        // Delete pin if trash icon clicked
        //$('.glyphicon-trash').each(function() {
        $('.trash').each(function() {
            var thisPin = $(this);
            $(this).off('click');
            $(this).click(function() {
                $(this).off('click');
                var promise = deletePinData($(this).data('id'));
                promise.success(function() {
                    thisPin.closest('.pin').remove();
                    tileLayout();
                });
                promise.error(function() {
                    message('Problem deleting image.', 'alert alert-error');
                });
            });
        });

        // Show edit-buttons only on mouse over
        $('.pin').each(function(){
            var thisPin = $(this);
            thisPin.find('.editable').hide();
            thisPin.off('hover');
            thisPin.hover(function() {
                thisPin.find('.editable').stop(true, true).fadeIn(300);
            }, function() {
                thisPin.find('.editable').stop(true, false).fadeOut(300);
            });
        });
	pinPagination(pinTotalPageLength);
        //$('.spinner').css('display', 'none');
        //blockContainer.css('height', colHeights.sort().slice(-1)[0]);
    }


    /**
     * On scroll load more pins from the server
     */
    window.scrollHandler = function() {
        /*var windowPosition = $(window).scrollTop() + $(window).height();
        var bottom = $(document).height() - 100;
        if(windowPosition > bottom) loadPins();*/
    }

    document.getElementById("next-page-pin").onclick = function(){
	$pin_table_rows = $('.pins-load div.pin');
	if(checkSavedList==1) tileLayout();
	if(pinTotalPageLength >= offset) loadPins(); checkSavedList=0;
    }
    document.getElementById("last-page-pin").onclick = function(){
	$pin_table_rows = $('.pins-load div.pin');
	if(checkSavedList==1) tileLayout();
	if(pinTotalPageLength >= offset) loadPins(); checkSavedList=0;
    }
    document.getElementById("next-page-pin-list").onclick = function(){
	$pin_saved_list_rows = $('#savedList div.saved-list');
	if(savedListTotalPageLength >= offset) loadSavedList(); checkSavedList=1;
    }
    document.getElementById("last-page-pin-list").onclick = function(){
	$pin_saved_list_rows = $('#savedList div.saved-list');
	if(savedListTotalPageLength >= offset) loadSavedList(); checkSavedList=1;
    }
    document.getElementById("next-page-workbook-list").onclick = function(){
	$wb_saved_list_rows = $('#workbookList div.workbook-list');
	if(workbookListTotalPageLength >= offset) loadWorkBookList(); checkSavedList=1;
    }
    document.getElementById("last-page-workbook-list").onclick = function(){
	$wb_saved_list_rows = $('#workbookList div.workbook-list');
	if(workbokListTotalPageLength >= offset) loadWorkBookList(); checkSavedList=1;
    }

    /**
     * Load our pins using the pins template into our UI, be sure to define a
     * offset outside the function to keep a running tally of your location.
     */
	
    function loadPins() {
	
        // Disable scroll
        $(window).off('scroll');

        // Show our loading symbol
        //$('.spinner').css('display', 'block');

        // Fetch our pins from the api using our current offset
        var apiUrl = '/app/api/v1/pin/?format=json&order_by=-id&offset='+String(offset);

        if (tagFilter) apiUrl = apiUrl + '&tag=' + tagFilter;
        //if (userFilter) apiUrl = apiUrl + '&submitter__username=' + userFilter;
        //if(tagFilter == ""){
        //if (currentUser.username) apiUrl = apiUrl + '&submitter__username=' + currentUser.username;
        //}
        if (currentUser.username) apiUrl = apiUrl + '&submitter__username=' + currentUser.username;
        $.get(apiUrl, function(pins) {
	    
	    pinTotalPageLength = pins.meta.total_count; // pin total count

            // Set which items are editable by the current user
            for (var i=0; i < pins.objects.length; i++){
	        var publishedDate = pins.objects[i].published;
                pins.objects[i].editable = (pins.objects[i].submitter.username == currentUser.username);
		pins.objects[i].published = moment(publishedDate, "YYYY/MM/DD").format('MMM DD, YYYY')
	    }

            // Use the fetched pins as our context for our pins template
            var template = Handlebars.compile($('#pins-template').html());
            var html = template({pins: pins.objects});
		
            // Append the newly compiled data to our container
            $('#pins').append(html);

            // We need to then wait for images to load in and then tile
	    if(checkSavedList == 0){
		    tileLayout();
		    lightbox();
	    }
            $('#pins').ajaxStop(function() {
                $('img').load(function() {
                    $(this).fadeIn(300);
                });
            });

            if (pins.objects.length < apiLimitPerPage) {
                //$('.spinner').css('display', 'none');
                /*if ($('#pins').length != 0) {
                    var theEnd = document.createElement('div');
                    theEnd.id = 'the-end';
                    $(theEnd).html('&mdash; End &mdash;');
                    $(theEnd).css('padding', 50);
                    $('body').append(theEnd);
                }*/
            } else {
                $(window).scroll(scrollHandler);
            }
	pinPagination(pinTotalPageLength);
        });

        // Up our offset, it's currently defined as 50 in our settings
        offset += apiLimitPerPage;
    }

    function loadSavedList(){
        var apiUrl = '/app/api/v1/savedlist/?format=json&order_by=-id&offset='+String(offsetSavedList);
        if (currentUser.username) apiUrl = apiUrl + '&user_id=' + currentUser.id;
        $.get(apiUrl, function(savedList) {
		savedListTotalPageLength = savedList.meta.total_count;
		var savedListContent="";
            	for (var i=0; i < savedList.objects.length; i++){
                	savedListContent+='<div class="saved-list"><a target="_blank" href="/app/saved_list_view/'+savedList.objects[i].id+'">'+savedList.objects[i].list_name;
			if(savedList.objects[i].list_desc){
				savedListContent+=' - '+savedList.objects[i].list_desc;
			}
			savedListContent+='</a></div>';
		}
		$('#savedList').append(savedListContent);
		pinListPagination(savedListTotalPageLength);
	});
	offsetSavedList += apiLimitPerPage;
    }

    function loadWorkBookList(){
        var apiUrl = '/app/api/v1/workbooklist/?format=json&order_by=-id&offset='+String(offsetWorkBookList);
        if (currentUser.username) apiUrl = apiUrl + '&user_id=' + currentUser.id;
        $.get(apiUrl, function(workbookList) {
		workbookListTotalPageLength = workbookList.meta.total_count;
		var workbookListContent="";
            	for (var i=0; i < workbookList.objects.length; i++){
                	workbookListContent+='<div class="workbook-list"><a target="_blank" href="'+workbookList.objects[i].workbook_url+'">'+workbookList.objects[i].workbook_name;
			workbookListContent+='</a></div>';
		}
		$('#workbookList').append(workbookListContent);
		workbookListPagination(workbookListTotalPageLength);
	});
	offsetWorkBookList += apiLimitPerPage;
    }

    // Set offset for loadPins and do our initial load
    var pinTotalPageLength = 0;
    var offset = 0;
    var savedListTotalPageLength = 0;
    var offsetSavedList = 0;
    var workbookListTotalPageLength = 0;
    var offsetWorkBookList = 0;
    loadPins();
    loadSavedList();
    loadWorkBookList();

    // If our window gets resized keep the tiles looking clean and in our window
    /*$(window).resize(function() {
        tileLayout();
        lightbox();
    })*/
});


/**
 * checkSavedList variable for check Saved Views or Saved Lists. if click on next,last(pagination) in (Saved Views) to load tileLayout() function 
   other wise click on saved views do not load tileLayout() function
 */
var checkSavedList=0;
function pinPagination(pinTotalPageLength){
	
	$pin_table_rows = $('.pins-load div.pin');
	var pin_row_limit = 4;
	var pinTotalPage = Math.ceil(pinTotalPageLength / pin_row_limit);
	if(pinTotalPage == 0){
		pinTotalPage=1;
	}
	$('#pg1').jqPagination('option', 'max_page', pinTotalPage);
	//$('#pg1').jqPagination('option', 'current_page', 1);
}

function pinPaginationGoTo(){
	var current_page = document.getElementById('pg-pin-goto').value;
	$pin_table_rows = $('.pins-load div.pin');
	var pin_row_limit = 4;
	var pinTotalPage = Math.ceil($pin_table_rows.length / pin_row_limit);
	if(pinTotalPage == 0){
		pinTotalPage=1;
	}
	$('#pg1').jqPagination('option', 'max_page', pinTotalPage);
	if(pinTotalPage >= current_page){
		$('#pg1').jqPagination('option', 'max_page', pinTotalPage);
		$('#pg1').jqPagination('option', 'current_page', current_page);
	}else{
		$('#pg1').jqPagination('option', 'max_page', pinTotalPage);
		$('#pg1').jqPagination('option', 'current_page', pinTotalPage);
	}
}

function pinListPagination(pinTotalPageLength){
	$pin_saved_list_rows = $('#savedList div.saved-list');
	var pin_saved_list_row_limit = 10;
	var pinSavedListTotalPage = Math.ceil(pinTotalPageLength / pin_saved_list_row_limit);
	if(pinSavedListTotalPage==0){
		pinSavedListTotalPage=1;
	}
	$('#pg2').jqPagination('option', 'max_page', pinSavedListTotalPage);
	//$('#pg1').jqPagination('option', 'current_page', 1);
}

function pinListPaginationGoTo(){
	var current_page = document.getElementById('pg-pin-saved-list-goto').value;
	$pin_saved_list_table_rows = $('#savedList div.saved-list');
	var pin_saved_list_row_limit = 10;
	var pinSavedListTotalPage = Math.ceil($pin_saved_list_table_rows.length / pin_saved_list_row_limit);
	if(pinSavedListTotalPage==0){
		pinSavedListTotalPage=1;
	}
	$('#pg2').jqPagination('option', 'max_page', pinSavedListTotalPage);
	if(pinSavedListTotalPage >= current_page){
		$('#pg2').jqPagination('option', 'max_page', pinSavedListTotalPage);
		$('#pg2').jqPagination('option', 'current_page', current_page);
	}else{
		$('#pg2').jqPagination('option', 'max_page', pinSavedListTotalPage);
		$('#pg2').jqPagination('option', 'current_page', pinSavedListTotalPage);
	}
}

function workbookListPagination(wbTotalPageLength){
	$wb_saved_list_rows = $('#workbookList div.workbook-list');
	var wb_saved_list_row_limit = 10;
	var wbSavedListTotalPage = Math.ceil(wbTotalPageLength / wb_saved_list_row_limit);
	if(wbSavedListTotalPage==0){
		wbSavedListTotalPage=1;
	}
	$('#pg3').jqPagination('option', 'max_page', wbSavedListTotalPage);
	//$('#pg1').jqPagination('option', 'current_page', 1);
}

function workbookListPaginationGoTo(){
	var current_page = document.getElementById('pg-workbook-list-goto').value;
	$wb_saved_list_table_rows = $('#workbookList div.workbook-list');
	var wb_saved_list_row_limit = 10;
	var wbSavedListTotalPage = Math.ceil($wb_saved_list_table_rows.length / wb_saved_list_row_limit);
	if(wbSavedListTotalPage==0){
		wbSavedListTotalPage=1;
	}
	$('#pg3').jqPagination('option', 'max_page', wbSavedListTotalPage);
	if(wbSavedListTotalPage >= current_page){
		$('#pg3').jqPagination('option', 'max_page', wbSavedListTotalPage);
		$('#pg3').jqPagination('option', 'current_page', current_page);
	}else{
		$('#pg3').jqPagination('option', 'max_page', wbSavedListTotalPage);
		$('#pg3').jqPagination('option', 'current_page', wbSavedListTotalPage);
	}
}

$(document).ready(function () {
	
	/* pin pagination */
	$pin_table_rows = $('.pins-load div.pin');
	var pin_row_limit = 4;
	var pinTotalPage = Math.ceil($pin_table_rows.length / pin_row_limit);
	var pin_page_table = function(page) {
		
		// calculate the offset and limit values
		var offset = (page - 1) * pin_row_limit,
			limit = page * pin_row_limit;
		// hide all table rows
		$pin_table_rows.hide();
		// show only the n rows
		$pin_table_rows.slice(offset, limit).show();
	}
	if(pinTotalPage==0){
		pinTotalPage=1;
	}
	$('.pagination').jqPagination({
		link_string	: '/?page={page_number}',
		max_page	: pinTotalPage,
		paged		: pin_page_table
	});
	/* pin pagination */

	/* pin saved list pagination */ 
	$pin_saved_list_rows = $('#savedList div.saved-list');

	var pin_saved_list_row_limit = 10;
	var pinSavedListTotalPage = Math.ceil($pin_saved_list_rows.length / pin_saved_list_row_limit);
	var pin_saved_list_page_table = function(page) {
		// calculate the offset and limit values
		var offset = (page - 1) * pin_saved_list_row_limit,
			limit = page * pin_saved_list_row_limit;
		// hide all table rows
		$pin_saved_list_rows.hide();
		// show only the n rows
		$pin_saved_list_rows.slice(offset, limit).show();
	}
	if(pinSavedListTotalPage==0){
		pinSavedListTotalPage=1;
	}
	$('.pagination-pinsavedlist').jqPagination({
		link_string	: '/?page={page_number}',
		max_page	: pinSavedListTotalPage,
		paged		: pin_saved_list_page_table
	});
	/* pin saved list pagination */

	/* wb saved list pagination */ 
	$wb_saved_list_rows = $('#workbookList div.workbook-list');

	var wb_saved_list_row_limit = 10;
	var wbSavedListTotalPage = Math.ceil($wb_saved_list_rows.length / wb_saved_list_row_limit);
	var wb_saved_list_page_table = function(page) {
		// calculate the offset and limit values
		var offset = (page - 1) * wb_saved_list_row_limit,
			limit = page * wb_saved_list_row_limit;
		// hide all table rows
		$wb_saved_list_rows.hide();
		// show only the n rows
		$wb_saved_list_rows.slice(offset, limit).show();
	}
	if(wbSavedListTotalPage==0){
		wbSavedListTotalPage=1;
	}
	$('.pagination-workbooksavedlist').jqPagination({
		link_string	: '/?page={page_number}',
		max_page	: wbSavedListTotalPage,
		paged		: wb_saved_list_page_table
	});
	/* wb saved list pagination */
});

