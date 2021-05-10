<?php
include_once("../database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{


$request = json_decode($postdata);
$nom = trim($request->nom);
$prenom = trim($request->prenom);
$dateNaissance = trim($request->dateNaissance);
$localiteNaissance = trim($request->localiteNaissance);
$sexe = trim($request->sexe);
$pPrenom = trim($request->pPrenom);
$pNom = trim($request->pNom);
$pProfession = trim($request->pProfession);
$pDomicile = trim($request->pDomicile);
$mNom = trim($request->mNom);
$mPrenom = trim($request->mPrenom);
$mProfession = trim($request->mProfession);
$mDomicile = trim($request->mDomicile);
$pnOfficier = trim($request->pnOfficier);
$annee = trim($request->annee);
$centre = trim($request->centre);
$status = trim($request->status);
$userid = trim($request->userid);
$printed = trim($request->printed);
$adnId = trim($request->adnId);

$sql = "INSERT INTO `adn`( `adnId`,`nom`, `prenom`, `dateNaissance`, `localiteNaissance`, `sexe`, `pPrenom`, `pNom`,
                           `pProfession`, `pDomicile`, `mPrenom`, `mNom`, `mProfession`, `mDomicile`, `pnOfficier`,
                           `annee`, `centre`, `status`, `created_user`, `printed` )
          VALUES ('$adnId','$nom','$prenom','$dateNaissance','$localiteNaissance','$sexe','$pPrenom','$pNom',
          '$pProfession','$pDomicile','$mPrenom','$mNom','$mProfession','$mDomicile','$pnOfficier','$annee',
          '$centre','$status','$userid', '$printed' )";


if ($mysqli->query($sql) === TRUE) {
$adndata = [
'nom' => $nom,
'prenom' => $prenom,
'dateNaissance' => $dateNaissance,
'localiteNaissance' => $localiteNaissance,
'sexe' => $sexe,
'pPrenom' => $pPrenom,
'pNom' => $pNom,
'pProfession' => $pProfession,
'pDomicile' => $pDomicile,
'mPrenom' => $mPrenom,
'mNom' => $mNom,
'mProfession' => $mProfession,
'mDomicile' => $mDomicile,
'pnOfficier' => $pnOfficier,
'annee' => $annee,
'centre' => $centre,
'status' => $status,
'userid' => $userid,
'printed' => $printed,
'adnId' => $adnId,
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
