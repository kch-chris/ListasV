// almacenamiento
function saveLogin (name,id)
{
	window.localStorage.setItem('nombre',name);
	window.localStorage.setItem('id',id);
	}
	
function isLogin()
{
	var id=window.localStorage.getItem('id');
	if(id!=undefined )
	{
		return true;
		}
	else 
	{
		return false;
		}
}
function accesoBD ()
{
	var db = window.openDatabase("lista", "1.0", "Lista DB", 5000000);
	return db;
	}

function EnviarTarea(titulo,descripcion,foto)
{
	var estado=1;
	accesoBD().transaction(function(tx) {
		var consulta='';
		 tx.executeSql('CREATE TABLE IF NOT EXISTS Tareas (id unique, Titulo, Descripcion, Foto, Estado)');
		 tx.executeSql('INSERT INTO Tareas (Titulo, Descripcion, Foto, Estado) VALUES ("'+titulo+'", "'+descripcion+'", "'+foto+'", "'+estado+'")');
		  },function(err){
		alert(err.code);
		},
	function(){
		navigator.notification.alert('Tarea Agregada',function(){
			window.location.href='#page1';
			},'Datos Guardados','Aceptar');
		}
	);

}

function leerTareas()
{
	accesoBD().transaction(function(tx){
		tx.executeSql('Select * from Tareas where Estado="1"',[],function(tx1,resultado){
			var largo=resultado.rows.length;
			if(largo!=0){
				$('#Nuevas div[data-role=fieldcontain]').html('');
				$('#Nuevas div[data-role=fieldcontain]').append('<fieldset data-role="controlgroup" data-type="vertical">');
               for(i=0;i<largo;i++)
				{
					$('#Nuevas div[data-role=fieldcontain]').append('<input id="checkbox'+resultado.rows.item(i).id+'" name="checkbox'+resultado.rows.item(i).id+'" data-theme="c" type="checkbox" value="'+resultado.rows.item(i).id+'">'+
                 '<label for="checkbox'+resultado.rows.item(i).id+'">'+
                    resultado.rows.item(i).Titulo+
                '</label>');
					}
				$('#Nuevas div[data-role=fieldcontain]').append('</fieldset>');
				}
			},function(err){
				alert("Error al procesar SQL: "+err.code);
				});
		},function(err){
			alert("Error al conectar: "+err.code);
			},
	null
	/*function(){
		navigation.notification.alert('Historial Leído',null,'Historial','Aceptar');
		}*/
	);
	}
	
function leerCompletas() {
	accesoBD().transaction(function(tx){
		tx.executeSql('Select * from Tareas where Estado="0"',[],function(tx1,resultado){
			var largo=resultado.rows.length;
			if(largo!=0){
				$('#Completadas div[data-role=fieldcontain]').html('');
				$('#Completadas div[data-role=fieldcontain]').append('<fieldset data-role="controlgroup" data-type="vertical">');
				for(i=0;i<largo;i++)
				{
					$('#Completadas div[data-role=fieldcontain]').append('<input id="checkboxc'+resultado.rows.item(i).id+'" name="checkboxc'+resultado.rows.item(i).id+'" data-theme="c" type="checkbox" value="'+resultado.rows.item(i).id+'">'+
                 '<label for="checkboxc'+resultado.rows.item(i).id+'"  style="text-decoration: line-through;">'+
                    resultado.rows.item(i).Titulo+
                '</label>');
					}
				$('#Completadas div[data-role=fieldcontain]').append('</fieldset>');
				}
			},function(err){
				alert("Error al procesar SQL: "+err.code);
				});
		},function(err){
			alert("Error al conectar: "+err.code);
			},
	null
	/*function(){
		navigation.notification.alert('Historial Leído',null,'Historial','Aceptar');
		}*/
	);
	}
	
function cancelaTarea (id_tarea)
{
	accesoBD().trasaction(function(tx) {
		 tx.executeSql('UPDATE Tareas set Estado="0" where id="'+id_tarea+'"');
		  },function(err){
		navigator.notification.alert(err.code,null,'Error','Aceptar');
		},
	function (){
		navigator.notification.alert('Tarea Terminada',function(){
			window.location.href='#page1';
			},'Datos Guardados','Aceptar');
		}
	);
	}
	
function activaTarea (id_tarea)
{
	accesoBD().trasaction(function(tx) {
		 tx.executeSql('UPDATE Tareas set Estado="1" where id="'+id_tarea+'"');
		  },function(err){
		navigator.notification.alert(err.code,null,'Error','Aceptar');
		},
	function (){
		navigator.notification.alert('Tarea Terminada',function(){
			window.location.href='#page1';
			},'Datos Guardados','Aceptar');
		}
	);
	}
	
function leerTarea(id_tarea) {
	accesoBD().transaction(function(tx){
		tx.executeSql('Select * from Tareas where id="'+id_tarea+'"',[],function(tx1,resultado){
			var largo=resultado.rows.length;
			if(largo!=0){
				$('#Revisa div[data-role=fieldcontain]').html('');
				$('#Revisa div[data-role=fieldcontain]').append('<ul data-role="listview" data-inset="true" data-dividertheme="a">');
				for(i=0;i<largo;i++)
				{
					$('#Revisa div[data-role=fieldcontain]').append('<li data-role="list-divider" >Nota</li>'+
        '<li><input type="text" id="Titulo" placeholder="Titulo" value="'+resultado.rows.item(i).Titulo+'" readonly/></li>'+
        '<li style="height:150px">'+
		 '<textarea name="" id="Descrip" placeholder="Descripcion" cols="25" rows="25" readonly>'+resultado.rows.item(i).Descripcion+'</textarea></li>'+
        '<li><img src="'+resultado.rows.item(i).Foto+'" widht="50%"/></li>');
					}
				$('#Revisa div[data-role=fieldcontain]').append('</ul>');
				}
			},function(err){
				alert("Error al procesar SQL: "+err.code);
				});
		},function(err){
			alert("Error al conectar: "+err.code);
			},
	null
	/*function(){
		navigation.notification.alert('Historial Leído',null,'Historial','Aceptar');
		}*/
	);
	}