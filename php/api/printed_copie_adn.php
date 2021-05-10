<?php
include '../database.php';
$adn = [];

$sql = "SELECT * FROM adn_copie";
if($result = mysqli_query($mysqli,$sql))
{
	$i = 0;
	while($row = $result->fetch_assoc())
	{
		$rows[] = $row;

	}
	echo json_encode($rows);
}
else
{
	http_response_code(404);
}
