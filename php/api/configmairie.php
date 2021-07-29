<?php
include_once("../database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$create_at = mysqli_real_escape_string($mysqli, trim($request->create_at));
$create_by = mysqli_real_escape_string($mysqli, trim($request->create_by));
$region = trim($request->region);
$cercle = mysqli_real_escape_string($mysqli, trim($request->cercle));
$arrondissement = mysqli_real_escape_string($mysqli, trim($request->arrondissement));
$commune = mysqli_real_escape_string($mysqli, trim($request->commune));
$centre = mysqli_real_escape_string($mysqli, trim($request->centre));


$sql = "INSERT INTO `mairie`( `create_at`, `create_by`, `modified_at`, `modified_by`, `region_id`, `cercle_id`, `arrondissment_id`, `commune`, `centre`) VALUES ('$create_at','$create_by',null,null,'$region','$cercle','$arrondissement', '$commune', '$centre')";
if ($mysqli->query($sql) === TRUE) {


$mairie = [
  'create_at' => $create_at,
  'create_by' => $create_by,
'region' => $region,
'cercle' => $cercle,
'arrondissement' => $arrondissement,
'commune' => $commune,
'centre' => $centre,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($mairie);
}else
{
	http_response_code(422);
}

}

?>
