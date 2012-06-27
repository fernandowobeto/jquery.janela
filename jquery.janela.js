var zIndex = 0;

$.extend({
  janela: function (opcoes){
    var padroes = {title:'Nova Janela',icon:false,width:1000,html:'',callback:false,help:false,top:35,onclose:function(){},btn_close:false,beforeClose:function(){},url:false,data:{}}
    var configs = $.extend(padroes,opcoes);
    $('#conteudo_'+zIndex+' *[tabindex]').each(function(){$(this).attr({tabindexx : $(this).attr('tabindex')}).removeAttr('tabindex');});

    zIndex++;

    var lt        = parseInt($('body').css('width'));
    var meio      = lt/2;
    var pos       = meio - (configs.width/2);
    var maior     = 0;
    var indexpele = zIndex+'1';
    var indexform = zIndex+'2';

    var a   = $('<div></div>').attr({id:'janela'+zIndex}).addClass('ui-widget-overlay').css({'z-index':indexpele});
    var g   = $("<div></div>").attr({id:'boxPele'+zIndex}).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all").css({width:configs.width,left:pos,position:'absolute',top:configs.top,'z-index':indexform}).draggable({handle:'.ui-dialog-titlebar',containment:"#janela" + zIndex});
    var cc  = $('<div></div>').attr({id:'conteudo_'+zIndex}).addClass("ui-dialog-content ui-widget-content").appendTo(g);

    var close = function(){
      if(configs.beforeClose()===false){
        return false;
      };
      g.remove();
      a.remove();
      configs.onclose();
    }

    var f   = $("<div></div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g);
    var h   = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){close();return false}).appendTo(f);

    if(configs.help){
      var aj = $('<a href="#"></a>').addClass("ui-dialog-titlebar-ajuda ui-corner-all").attr("role","button").hover(function(){aj.addClass("ui-state-hover")},function(){aj.removeClass("ui-state-hover")}).focus(function(){aj.addClass("ui-state-focus")}).blur(function(){aj.removeClass("ui-state-focus")}).click(function(){ajuda(configs.help);return false}).appendTo(f);
      var cj = $("<span></span>").addClass("ui-icon ui-icon-help").appendTo(aj);
    }

    var c   = $("<span></span>").addClass("ui-icon ui-icon-closethick").appendTo(h);
    var tt  = $("<span></span>").addClass("ui-dialog-title").html(configs.title).prependTo(f);
    if(configs.icone){
      var ic = $("<img>").attr({src:configs.icon,width:18,height:18}).css({'float':'left','padding-right':'5px'}).prependTo(f);
    }

    if(configs.url){ //dados de html vindos por post
      $.post(configs.url,
        configs.data,
      function(r){
        cc.html(r);
        append();
        acoes();
        if(configs.callback){
          configs.callback(cc,tt);
        }
      });
    }else{ //dados de html inseridos via propriedade da janela
      cc.html(configs.html);
      append();
      acoes();
      if(configs.callback){
        configs.callback(cc,tt);
      }
    }

    var append = function(){
      a.appendTo(document.body);
      g.appendTo(document.body);
    }

    var acoes = function(){
      $('#conteudo_'+zIndex+' *[tabindex]:last').keydown(function(e){
        if(e.keyCode==9){
          $('#conteudo_'+zIndex+' *[tabindex=1]').focus();
          e.preventDefault();
        }
      });

      if(configs.btn_close){
        cc.find(configs.btn_close).click(function(){
          close();
        });
      }
    }
  }
});