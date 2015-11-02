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
      items = items.concat(this.facetLinks('manufacturedate_dt', doc.manufacturedate_dt));
      items = items.concat(this.facetLinks('incubationdate_dt', doc.incubationdate_dt));
      items = items.concat(this.facetLinks('id', doc.id));
      items = items.concat(this.facetLinks('manu_id_s', doc.manu_id_s));
      items = items.concat(this.facetLinks('address_s', doc.address_s));
      items = items.concat(this.facetLinks('_version_', doc._version_));
      items = items.concat(this.facetLinks('compName_s', doc.compName_s));
	  
      var $links = $('#links_' + doc.id);
      $links.empty();
      for (var j = 0, m = items.length; j < m; j++) {
        $links.append($('<li></li>').append(items[j]));
      }
    }
  },

  template: function (doc) {
    var snippet = '';
    
    if (doc.titleText) {
    	//console.log (doc.titleText);
		if (doc.titleText.length > 300) {
		  snippet += doc.titleText.substring(0, 300);
		  snippet += '<span style="display:none;">' + doc.titleText.substring(300);
		  snippet += '</span> <a href="#" class="more">more</a>';
		}
		else {
		  snippet += doc.titleText;
    	}
    }

    var output = '<div><h2>' + doc.title + '</h2>';
    output += '<p id="links_' + doc.id + '" class="links"></p>';
    output += '<p>' + snippet + '</p></div>';
    return output;
  },

  init: function () {
    $(document).on('click', 'a.more', function () {
      var $this = $(this),
          span = $this.parent().find('span');

      if (span.is(':visible')) {
        span.hide();
        $this.text('more');
      }
      else {
        span.show();
        $this.text('less');
      }

      return false;
    });
  }
});

})(jQuery);
