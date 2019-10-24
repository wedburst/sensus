		var x;
		x=$(document);
		x.ready(iniciar);

		function iniciar(){
			var x=$("#bEnviar");
			x.click(validar);
		}

		function validar(){
			var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
			var no=/[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]{3}$/;
			var ar=/[a-zA-Z0-9_ÑñÁáÉéÍíÓóÚúÜü?\@\!\-\.\,\s]{20}$/;	
			var num=/[0-9]{9}$/;

			var nombre = $("#itNombre").val();
			var correo = $("#itMail").val();
			var asunto = $("#itAsunto").val();
			var number = $("#itNumber").val();
			var area = $("#itArea").val();
			
			if(nombre == "" || !no.test(nombre)){
				$("#mensaje1").fadeIn();
				return false;
			}else{
				$("#mensaje1").fadeOut();
				if(correo == "" || !expr.test(correo)){
					$("#mensaje2").fadeIn();
					return false;		
				}else{
					$("#mensaje2").fadeOut();
					if(asunto == "" || !no.test(asunto)){
						$("#mensaje3").fadeIn();
						return false;
					}else{
						$("#mensaje3").fadeOut();
							if(number == "" || !num.test(number)){
							$("#number").fadeIn();
							return false;
						}else{
							$("#number").fadeOut();
							if (area == "" || !ar.test(area)){
								$("#mensaje4").fadeIn();
								return false;
							}else{
								$("#mensaje4").fadeOut();
								$.post("msn/send.php",{itNombre:nombre,itMail:correo,itAsunto:asunto,itNumber:number,itArea:area},recibir);
								return false;
							}
						}
					}
				}
			}
		}

		function recibir(datos){
			var x=$("#mensaje");
			x.html(datos);
			document.getElementById("miFormulario").reset();
		}

		function esconder(){
			var x=$("#mensaje");
			x.html("");
		}