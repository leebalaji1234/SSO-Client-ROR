(function ($) {

AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
  start: 0,

  beforeRequest: function () {
    $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
  },

  facetLinks: function (facet_field, facet_values) {
    var links = [];
    if (facet_values) {
      for (var i = 0, l = facet_values.length; i < l; i++) {
        if (facet_values[i] !== undefined) {
          links.push(
            $('<a href="#"></a>')
            .text(facet_values[i])
            .click(this.facetHandler(facet_field, facet_values[i]))
          );
        }
        else {
          links.push('no items found in current selection');
        }
      }
    }
    return links;
  },

  facetHandler: function (facet_field, facet_value) {
    var self = this;
    return function () {
      self.manager.store.remove('fq');
      self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
      self.doRequest(0);
      return false;
    };
  },

  afterRequest: function () {
    $(this.target).empty();
    // Tanny Printing in console
    var l = this.manager.response.response.docs.length;
    //l = 10;
//    console.log ();
    for (var i = 0; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));

      var items = [];

	  // Nutch core
	  items = items.concat(this.facetLinks('timestamp', doc.tstamp));
      items = items.concat(this.facetLinks('title', doc.title));
      items = items.concat(this.facetLinks('id', doc.id));
      items = items.concat(this.facetLinks('url', doc.url));
      items = items.concat(this.facetLinks('content', doc.content));
      items = items.concat(this.facetLinks('segment', doc.segment));
      items = items.concat(this.facetLinks('boost', doc.boost));
      items = items.concat(this.facetLinks('digest', doc.digest));
	   
      // var $links = $('#links_' + doc.id);

      // // var $links = $('.paginationtext');
      // $links.empty();
      //  for (var j = 0, m = items.length; j < m; j++) {
      //   $links.append($('<li></li>').append(items[j]));
      // }
      // console.log ($links);

    }
  },

  template: function (doc) {
    var snippet = '';
    
    if (doc.content) {
    	//console.log (doc.title);
		if (doc.content.length > 300) {
		  snippet += doc.content.substring(0, 300);
		  snippet += '<span style="display:none;">' + doc.content.substring(300);
		  snippet += '</span> ';
		}
		else {
		  snippet += doc.title;
    	}
    } else {
    	console.log (doc);
    	//doc.content = "Content unavailable!<br/>The page could not be contacted!";
    	snippet += "Content unavailable! The page could not be crawled!";
    	//snippet += '<span style="display:none;"> Content unavailable! The page could not be crawled!</span>';
    }
    
    if (!doc.title)
    	doc.title = doc.url;
    
    var output = '<div class="col-md-12 panelcontent"><a href="' + doc.url + '" target="_blank"><h4>' + doc.title + '</h4></a>';
    // output += '<p id="links_' + doc.id + '" class="links"></p>';
    // output += '<p    class="links paginationtext"></p>';
    output += '<article>' + snippet + '</article>';
    output +='<a href="#" class="btn btn-blog pull-right marginBottom10 more"><span class="caretdown"></span></a>';
    output +='</div>';
    
    return output;
  },

  init: function () {
    $(document).on('click', 'a.more', function () {
      var $this = $(this),
          span = $this.prev().find("span");
          

      if (span.is(':visible')) {
        span.slideUp("fast");
        $this.html('<span class="caretdown"></span>');
      }
      else {
        span.fadeIn().slideDown("slow");
        $this.html('Read Less &uarr;');
      }

      return false;
    });
  }
});

})(jQuery);
