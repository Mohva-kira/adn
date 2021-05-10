<?php
include '../database.php';
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($mysqli, (int)$_GET['id']) : false;

$adn = [];

if(!$id)
{
	return http_response_code(400);
}

$sql = "SELECT * FROM adn WHERE id=$id";

if($result = mysqli_query($mysqli,$sql))
{

    while($row = $result->fetch_assoc())
	{
		$rows[] = $row;

	}
	echo json_encode($rows);
}
else
{
	return http_response_code(422);
}

