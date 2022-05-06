<?php
include_once("../database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{


$request = json_decode($postdata);
$adn_id = trim($request->adn_id);
$prix = trim($request->prix);
$printed_user = trim($request->userid);
$nb_copie = trim($request->nb_copie);
$printed_date = trim($request->printed_date);

$sql = "INSERT INTO `adn_copie`(`adn_id`, `prix`, `printed_user`, `nb_copie`, `printed_date`)
        VALUES ('$adn_id','$prix','$printed_user','$nb_copie','$printed_date')";


if ($mysqli->query($sql) === TRUE) {
$adndata = [
'adn_id' => $adn_id,
'prix' => $prix,
'printed_user' => $printed_user,
'nb_copie' => $nb_copie,
'printed_date' => $printed_date,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($adndata);
}
else
{
  http_response_code(422);
}

}

?>
