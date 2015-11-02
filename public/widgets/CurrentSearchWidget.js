(function ($) {

AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
  start: 0,

  afterRequest: function () {
    var self = this;
    var links = [];

    var q = this.manager.store.get('q').val();
    if (q != '*:*') {
      alert(q);
      links.push($('<a href="#"></a>').text('(x) ' + q).click(function () {
        self.manager.store.get('q').val('*:*');
        self.doRequest();
        return false;
      }));
    }

    var fq = this.manager.store.values('fq');
    for (var i = 0, l = fq.length; i < l; i++) {
      // links.push($('<a href="#"></a>').text('(x) ' + fq[i]).click(self.removeFacet(fq[i])));
      links.push($('<span class="tag label label-info"></span>')
        .html(fq[i]+'  <span data-role="remove"></span>')
        .click(self.removeFacet(fq[i])));

      // <span class="tag label label-info">Amsterdam<span data-role="remove"></span></span> 
    }

    if (links.length > 1) {
      links.unshift($('<span class="tag label label-danger"> <span data-role="remove"></span></span>"').text('Remove all ').click(function () {
        
        self.manager.store.get('q').val('*:*');
        self.manager.store.remove('fq');
        self.doRequest();
        return false;
      }));
    }

    if (links.length) {
      var $target = $(this.target);
      $target.empty();
      for (var i = 0, l = links.length; i < l; i++) {
        $target.append($('<span></span>').append(links[i]));
        // $target.append($('<li class="tag label label-info"><span data-role="remove"></span></li>').append(links[i]));
      }
    }
    else {
       // $(this.target).html('<li class="tag label label-info">Viewing all documents!</li>');
       $(this.target).html('');
    }
  },

  removeFacet: function (facet) {
    var self = this;
     
    return function () {
      if (self.manager.store.removeByValue('fq', facet)) {
        self.doRequest();
      }
      return false;
    };
  }
});

})(jQuery);
