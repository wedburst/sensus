<?php 

	if ($_POST) {
		$nombre=$_POST["itNombre"];
		$email=$_POST["itMail"];
		$asunto=$_POST["itAsunto"];
		$number=$_POST["itNumber"];
		$area=$_POST["itArea"];

		if ($nombre=="" || $email=="" || $asunto=="" || $number=="" || $area=="") {
			//echo "nada";
			include("../error.php");
		}else{
			$header = 'From: ' . $email . " \r\n"; 
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n"; 
			$header .= "Mime-Version: 1.0 \r\n"; 
			$header .= "Content-Type: text/plain"; 

			$mensaje = "This email was send it by... " . $nombre . ", subject is: " . $asunto . " \r\n"; 
			$mensaje = "Number: " . $number . " \r\n";
			$mensaje .= "E-mail: " . $email . " \r\n"; 
			$mensaje .= "Message: " . $_POST['itArea'] . " \r\n"; 
			$mensaje .= "sended... " . date('d/m/Y', time()); 

			$para = "contact@example.com"; 
			$asunto = 'www.example.com'; 


			mail($para, $asunto, utf8_decode($mensaje), $header);
			include("../mensaje.php");
		}
	}

 ?>
