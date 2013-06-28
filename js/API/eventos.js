// Eventos
$(document).ready(function(){
	document.addEventListener("deviceready",function(){
		
	$('#regFoto').tap(function() {
	tomarFoto();
	});
	$('#regEnviar').tap(function(){
		var tit=$('#regTitulo').val();
		var descrip=$('#regDescrip').val();
		var foto =$('#regFoto').attr('rel');
		if(tit!='')
		{
			EnviarTarea(tit,descrip,foto);	
			
			}
		else 
			{
				navigator.notification.alert('Titulo Requerido',null,"Error de Registro","Aceptar");
				}
		});
	
	$('#Completadas input[type="checkbox"]').tap(function(){
			if($(this).index()!=0){
				var ind=$(this).index();
				var id_tarea=$(this).val();
					 if($(this).not(':checked')) {  
          			 activaTarea (id_tarea); 	
					 }
					else 
					{
						leerTarea(id_tarea);
						} 
				
            
				}
			}
		);
		
		$('#Nuevas input[type="checkbox"]').tap(function(){
			if($(this).index()!=0){
				var ind=$(this).index();
				var id_tarea=$(this).val();
					 if($(this).is(':checked')) { 
					 cancelaTarea (id_tarea); 
					 }
            
				}
			}
		);
		
			
		},false);
		
	$('#page1').focus(function() {
	leerTareas();
	leerCompletas();
	});
	});
	