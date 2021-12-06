/**
 * Lightbox for Pinry
 * Descrip: A lightbox plugin for pinry so that I don't have to rely on some of
 *          the massive code bases of other lightboxes, this one uses data
 *          fields to acquire the info we need and dynamically loads comments.
 *          It also has a nice parallax view mode where the top scrolls and the
 *          background stays stationary.
 * Authors: Pinry Contributors
 * Updated: Feb 26th, 2013
 * Require: jQuery, Pinry JavaScript Helpers
 */


$(window).load(function() {
    // Start Helper Functions
    function freezeScroll(freeze) {
        freeze = typeof freeze !== 'undefined' ? freeze : true;
        if (freeze) {
            $('body').data('scroll-level', $(window).scrollTop());
            //$('#pins').css({
            //    'position': 'fixed',
            //    'margin-top': -$('body').data('scroll-level')
            //});
            $(window).scrollTop(0);
            /* disable the global pin-loading scroll handler so we don't
               load pins when scrolling a selected image */
            $(window).off('scroll');
        } else {
            //$('#pins').css({
            //    'position': 'static',
            //    'margin-top': 0
            //});
            $(window).scrollTop($('body').data('scroll-level'));
            /* enable the pin-loading scroll handler unless we've already
               loaded all pins from the server (in which case an element
               with id 'the-end' exists */
            var theEnd = document.getElementById('the-end');
            if (!theEnd) {
                $(window).scroll(scrollHandler);
            }
        }
    }
    // End Helper Functions


    // Start View Functions
    function createBox(context) {

        freezeScroll();
	//document.getElementById("light-box-popup").innerHTML= renderTemplate('#lightbox-template', context);
	$('body').append(renderTemplate('#lightbox-template', context));
        var box = $('.lightbox-background');
	var pinbox = $('#pins');
        box.css('height', $(document).height());
        //$('#pins').css('opacity','0.3');
	//$('#pins').css('pointer-events','none');
	
        $('.lightbox-image-wrapper').css('height', context.image.standard.height);
        box.fadeIn(200);
        $('.lightbox-image').load(function() {
            $(this).fadeIn(200);
        });
        $('.lightbox-wrapper').css({
            'width': context.image.standard.width,
            'margin-top': 80,
            'margin-bottom': 80,
            'margin-left': -context.image.standard.width/2
        });
        if ($('.lightbox-wrapper').height()+140 > $(window).height())
            $('.lightbox-background').height($('.lightbox-wrapper').height()+140);


	$('body').keyup(function(e) {
        	if(e.which===27){ 
			box.fadeOut(200);
			setTimeout(function() {
			    box.remove();
			 }, 200);
			 freezeScroll(false);
			$('#pins').css('opacity','1');
			//$('body').css('background','#F5F5EB');
			$('#pins').css('pointer-events','auto');
		} // 27 is the keycode for the Escape key
	});

	$('#lightbox-close').click(function() {
	   box.fadeOut(200);
           setTimeout(function() {
               box.remove();
            }, 200);
            freezeScroll(false);
	
	$('#pins').css('opacity','1');
	//$('body').css('background','#F5F5EB');
	$('#pins').css('pointer-events','auto');
        });

	$('#pins').click(function() {
	   box.fadeOut(200);
           setTimeout(function() {
               box.remove();
            }, 200);
            freezeScroll(false);
	$('#pins').css('opacity','1');
	//$('body').css('background','#F5F5EB');
	$('#pins').css('pointer-events','auto');

        });

	$('#lightbox-close1').click(function() {
	   box.fadeOut(200);
           setTimeout(function() {
               box.remove();
            }, 200);
            freezeScroll(false);
	
	$('#pins').css('opacity','1');
	$('#tag-list').css('opacity','1');
        $('#footer-list').css('visibility','visible');
	//$('body').css('background','#F5F5EB');
	$('#pins').css('pointer-events','auto');
        $('#tag-list').css('pointer-events','auto');
        });

	$('#pins').click(function() {
	   box.fadeOut(200);
           setTimeout(function() {
               box.remove();
            }, 200);
            freezeScroll(false);
	$('#pins').css('opacity','1');
	$('#tag-list').css('opacity','1');
        $('#footer-list').css('visibility','visible');
	//$('body').css('background','#F5F5EB');
	$('#pins').css('pointer-events','auto');
        $('#tag-list').css('pointer-events','auto');

        });
    }
	
    // End View Functions


    // Start Global Init Function
    window.lightbox = function() {
        var links = $('body').find('.lightbox');
        if (pinFilter) {
            var promise = getPinData(pinFilter);
            promise.success(function(pin) {
                createBox(pin);

            });
            promise.error(function() {
                message('Problem problem fetching pin data.', 'alert alert-error');
            });
        }
        return links.each(function() {
            $(this).off('click');
            $(this).click(function(e) {
                e.preventDefault();
                var promise = getPinData($(this).data('id'));
                promise.success(function(pin) {
                    createBox(pin);
		    //createPopupBox(pin);
                });
                promise.error(function() {
                    message('Problem problem fetching pin data.', 'alert alert-error');
                });
            });
        });
    }
    // End Global Init Function

	function createPopupBox(context) {
		var popup="";
		popup +='<div class="feed-inner">'+
				'<div style="width: '+context.image.standard.image+'px; margin: 0 auto; text-align: center;">'+
					'<img class="lightbox-image" src="'+context.image.standard.image+'"/>'+
				'</div>'+
			'</div>'+
			'<div class="feed-item-bottom">'+
				'<div class="description">'+
				''+context.description+''+
				'</div>'+
			'</div>';
		for( var i=0;i<context.comments.length;i++){
			var submit_date = moment(context.comments[i].submit_date).fromNow();
			popup+='<div class="row-fluid">'+
				'<div style="margin-left:10px;">'+
				'  <b>'+context.comments[0].user_name+'</b>  <font style="color: rgb(153, 153, 153); font-size: 13px;">'+ submit_date+'</font>'+
				'</div>'+
				'<div style="margin-left:10px;">'+context.comments[0].comment+'</div>'+
				'<hr>'+
				'</div>';
		}

		popup+='<div class="row-fluid">'+
		'<form action="/pin_cmt_post/" method="post" name="pin_cmt">'+
			'<table width="98%">'+
			  '<tr>'+
			    '<td><textarea width="10%" name="pin-comment" id="pinCommentId" class="form-control" placeholder="Add a comment..."></textarea>'+
				'<input type="hidden" name="pin-id" id="pinId" value="'+context.id+'">'+
			    '</td>'+
			  '</tr>'+
			  '<tr>'+
			    '<td align="center">'+
	                        '<input type="submit" class="btn btn-primary btn-red" id="pin-form-submit" value="Comment"> &nbsp;'+
				'<input type="button" class="btn btn-primary btn-gray" data-dismiss="modal" value="Cancel"/>'+
			    '</td>'+
			  '</tr>'+
			'<table>'+
		'</form>'+
	        '</div>';
			
		document.getElementById("light-box-popup").innerHTML= popup;
	}


});
