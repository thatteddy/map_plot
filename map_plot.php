<?php
/**********************************************************************************************/
function connectToDB(){
$hostName= 'localhost';
$userName= 'your_username';
$passCode= 'your_password'; 
$dbName= 'your_database';
return new mysqli($hostName,$userName,$passCode, $dbName);
}
/**********************************************************************************************/
if($_POST){
	$_POST['servicename']();
}
/**********************************************************************************************/
function fetchPointsCoordinates(){
$mysqliConn = connectToDB();
$stmt = $mysqliConn->prepare("SELECT latitude,longitude,title,content FROM mappoints");
$stmt->execute();
$stmt->store_result();
if($stmt->num_rows>0){
	
$meta = $stmt->result_metadata();
  while ($field = $meta->fetch_field())
  {	
	$params[] = &$row[$field->name];
  }
  call_user_func_array(array($stmt, 'bind_result'), $params);
  while ($stmt->fetch()) {
	  foreach($row as $key => $val)
	  {
		  $resultarray[$key] = $val;
	  }
	  $resultmatrix[] = $resultarray;
  }  
  echo json_encode($resultmatrix);
}	
}
/**********************************************************************************************/

?>