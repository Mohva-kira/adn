<?php
include '../database.php';
$supId = mysqli_real_escape_string($mysqli, $_GET['supId']);

$locality = [];

if($supId != 'null'){

$sql = "SELECT * FROM locality WHERE locality_sup_id = $supId";
}else{
  $sql = "SELECT * FROM locality WHERE locality_sup_id is $supId";
}
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

