// archivo

function uploadPhoto(foto,nom) {
	var options = new FileUploadOptions();
	options.fileKey="archivo";
	options.fileName="Kch";
	options.mimeType="image/jpeg";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(foto, "http://igitsoft.com/pgtest.php", function (r) {
		saveLogin(nom,disp()['id']);
		 navigator.notification.confirm("Datos Guardados Satisfactoriamente\n"+disp()['platform']+'\n'+r.response,function(botones){
		switch(botones){
		case 1:
		navigator.notification.beep(5);
		window.location.href='#page';
		break;
		case 2:
		navigator.notification.vibrate(500);
		window.location.href='#page';
		break;
		case 3:
		window.location.href='#page';
		break;
		}
	},"Titulo","Beep,Vibrar,Salir");
				
				}, function(err){
					
					navigator.notification.alert("Error: "+err.code, null,"Error de Envio","De acuerdo");
					}, options);
        }
