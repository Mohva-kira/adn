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
  $printed = mysqli_real_escape_string($mysqli, trim($request['printed']));
  $userid = mysqli_real_escape_string($mysqli, trim($request['userid']));
  $printed_date = mysqli_real_escape_string($mysqli, trim($request['printed_date']));
  $prix = mysqli_real_escape_string($mysqli, trim($request['prix']));

	$sql = "UPDATE adn SET printed='$printed', updated_user='$userid', printed_date='$printed_date',prix='$prix' WHERE id = $id";

	if($mysqli->query($sql))
	{
  $row = [
    'id' => $id,
    'userid' => $userid,
    'printed_date' => $printed_date,
    'printed' => $printed_date,
    'prix' => $prix,
  ];
  echo json_encode($row);
		http_response_code(204);

	}
	else
	{
		return http_response_code(422);
	}
}
