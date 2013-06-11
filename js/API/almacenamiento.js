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

function EnviarTarea (titulo,descripcion,foto)
{
	accesoBD().trasaction(function(tx) {
		//var f= new Date();
		//var fecha= f.getDate()+'/'+(f.getMonth()+1)+'/'+f.getFullYear();
		 tx.executeSql('CREATE TABLE IF NOT EXISTS Tareas (id unique, Titulo, Descripcion, Foto,Estado)');
		 tx.executeSql('INSERT INTO Tareas (Titulo, Descripcion,Foto,Estado) VALUES ("'+titulo+'", "'+descripcion+'","'+foto+'","1")');
		  },function(err){
		navigator.notification.alert(err.code,null,'Error','Aceptar');
		},
	function (){
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
				for(i=0;i<largo;i++)
				{
					$('#Nuevas div[data-role=listview]').append('<input id="checkbox1" name="" data-theme="c" type="checkbox">'+
                 '<label for="checkbox1">'+
                    resultado.rows.item(i).Titulo+
                '</label>');
					}
				}
			},function(err){
				alert(err.code);
				});
		},function(err){
			alert(err.code);
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
				$('#Nuevas div[data-role=fieldcontain]').html('');
				for(i=0;i<largo;i++)
				{
					$('#Completadas div[data-role=listview]').append('<input id="'+ resultado.rows.item(i).id+'" name="" data-theme="c" type="checkbox">'+
                 '<label for="'+ resultado.rows.item(i).id+'"  style="text-decoration: line-through;">'+
                    resultado.rows.item(i).Titulo+
                '</label>');
					}
				}
			},function(err){
				alert(err.code);
				});
		},function(err){
			alert(err.code);
			},
	null
	/*function(){
		navigation.notification.alert('Historial Leído',null,'Historial','Aceptar');
		}*/
	);
	}
	
