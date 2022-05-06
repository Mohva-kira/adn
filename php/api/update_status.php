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
  $userid = mysqli_real_escape_string($mysqli, trim($request['userid']));
  $status = mysqli_real_escape_string($mysqli, trim($request['status']));
  $published = mysqli_real_escape_string($mysqli, trim($request['published']));
	$sql = "UPDATE adn SET status='$status', updated_user='$userid', published='$published' WHERE id = $id";

	if($mysqli->query($sql))
	{
  $row = [
    'id' => $id,
    'userid' => $userid,
    'status' => $status,
    'published' => $published

  ];
  echo json_encode($row);
		http_response_code(204);

	}
	else
	{
		return http_response_code(422);
	}
}
