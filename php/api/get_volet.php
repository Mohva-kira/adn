<?php
include '../database.php';
$id = mysqli_real_escape_string($mysqli, $_GET['id']);
$userid = mysqli_real_escape_string($mysqli, $_GET['userid']);


$locality = [];

if($id != 'null' && $userid !='null'){

$sql = "SELECT * FROM volet WHERE id = $id AND created_by = $userid";
}elseif($id == 'null' && $userid !='null') {
  $sql = "SELECT * FROM volet WHERE created_by = $userid";
}elseif($id!='null' && $userid == 'null'){
  $sql = "SELECT * FROM volet WHERE id= $id ";

}else {
  $sql = "SELECT * FROM volet";
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

