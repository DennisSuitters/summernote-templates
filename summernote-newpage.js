/* https://github.com/DiemenDesign/summernote-newpage */
(function(factory){
  if(typeof define==='function'&&define.amd){
    define(['jquery'],factory)
  }else if(typeof module==='object'&&module.exports){
    module.exports=factory(require('jquery'));
  }else{
    factory(window.jQuery)
  }
}
(function($){
  $.extend(true,$.summernote.lang,{
    'en-US':{
      newpage:{
        tooltip:'New Page'
      }
    }
  });
  $.extend($.summernote.options,{
    newpage:{
      icon:'<i class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" id="libre-file" viewBox="0 0 14 14" width="14" height="14"><path d="M 7.640148,1.26517 C 7.49432,1.11934 7.20625,1 7,1 L 2.5,1 C 2.29375,1 2.125,1.16875 2.125,1.375 l 0,11.25 C 2.125,12.83125 2.29375,13 2.5,13 l 9,0 c 0.20625,0 0.375,-0.16875 0.375,-0.375 l 0,-6.75 c 0,-0.20625 -0.11932,-0.49432 -0.265148,-0.64015 L 7.640148,1.26517 Z M 11.125,12.25 l -8.25,0 0,-10.5 4.115133,0 c 0.03417,0.006 0.09853,0.0323 0.12668,0.0525 l 3.955734,3.95571 c 0.02018,0.0281 0.04683,0.0925 0.05245,0.12668 l 0,6.36513 z M 11.5,1 9.25,1 C 9.04375,1 8.99432,1.11932 9.140148,1.26515 l 2.46968,2.46968 C 11.75568,3.88068 11.875,3.83125 11.875,3.625 l 0,-2.25 C 11.875,1.16875 11.70625,1 11.5,1 Z"/></svg></i>'
    }
  });
  $.extend($.summernote.plugins,{
    'newpage':function(context){
      var self=this;
      var ui=$.summernote.ui;
      var $note=context.layoutInfo.note;
      var $editor=context.layoutInfo.editor;
      var $editable=context.layoutInfo.editable;
      var options=context.options;
      var lang=options.langInfo;
      context.memo('button.newpage',function(){
        var button=ui.button({
          contents:options.newpage.icon,
          tooltip:lang.newpage.tooltip,
          click:function(){
            $note.summernote('code','');
          }
        });
        return button.render();
      });
    }
  });
}));
