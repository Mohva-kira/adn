<?php
require '../database.php';
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
	$request = json_decode($postdata,true);
	if ( (int)$request['id'] == '') {
		return http_response_code(400);
	}
	$id = mysqli_real_escape_string($mysqli, (int)$request['id']);


	$sql = "UPDATE adn SET published=0, updated_user='$userid' WHERE id = $id";

	if($mysqli->query($sql))
	{
  $row = [
    'id' => $id,
    'userid' => $userid,


  ];
  echo json_encode($row);
		http_response_code(204);

	}
	else
	{
		return http_response_code(422);
	}
}
