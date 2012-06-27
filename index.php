<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
    <script src="jquery.janela.js"></script>
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/south-street/jquery-ui.css"/>
    <script>
      $(document).ready(function(){
        $(':button').click(function(){
          $.janela({
            title: 'Janela adicionada',
            url:'ajax.php',
            callback:function(html){
              alert(1);
              html.find(':text:first').focus();
            },
            onclose:function(){
              alert('disparou depois de fechar');
            },
            beforeClose:function(){
              alert('disparou antes de fechar e retornou false');
              return false;
            },
            btn_close:'#close'
          });
        });
      });
    </script>
  </head>
  <body>
    <input type="button" id="add" value="mostrar">
  </body>
</html>