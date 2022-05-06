<?php
include_once("../database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{


$request = json_decode($postdata);
$nom = trim($request->nom);
$prenom = trim($request->prenom);
$dateNaissance = trim($request->dateNaissance);
$region = trim($request->region);
$cercle = trim($request->cercle);
$commune = trim($request->commune);
$sexe = trim($request->sexe);
$pPrenom = trim($request->pPrenom);
$pNom = trim($request->pNom);
$pProfession = trim($request->pProfession);
$pDomicile = trim($request->pDomicile);
$pNationalite = trim($request->pNationalite);
$mNom = trim($request->mNom);
$mPrenom = trim($request->mPrenom);
$mProfession = trim($request->mProfession);
$mDomicile = trim($request->mDomicile);
$mNationalite = trim($request->mNationalite);
$dNom = trim($request->dNom);
$dPrenom = trim($request->dPrenom);
$dAge = trim($request->dAge);
$dDomicile = trim($request->dDomicile);
$status = trim($request->status);

$voletId = trim($request->voletId);
$published = trim($request->published);
$created_date = trim($request->created_date);
$created_by = trim($request->created_by);
$heureNaissance = trim($request->heureNaissance);



$sql = "INSERT INTO `volet`( `voletid`, `nom`, `prenom`, `dateNaissance`, `heureNaissance` ,`sexe`,
                             `pPrenom`, `pNom`, `pProfession`, `pDomicile`, `pNationalite`,
                             `mPrenom`, `mNom`, `mProfession`, `mDomicile`, `mNationalité`,
                             `dNom`,`dPrenom`, `dAge`, `dDomicile`, `region`, `cercle`, `commune`, `created_date`,
                             `created_by`,  `published`, `status`
                             )

          VALUES ('$voletId','$nom','$prenom','$dateNaissance', '$heureNaissance','$sexe','$pPrenom','$pNom',
                  '$pProfession','$pDomicile', '$pNationalite' ,'$mPrenom','$mNom', '$mProfession',
                  '$mDomicile', '$mNationalite', '$dNom', '$dPrenom','$dAge','$dDomicile','$region','$cercle','$commune',
                  '$created_date','$created_by','$published', '$status')";


if ($mysqli->query($sql) === TRUE) {
$volet = [
'voletId' => $voletId,
'nom' => $nom,
'prenom' => $prenom,
'dateNaissance' => $dateNaissance,
'heureNaissance' => $heureNaissance,
'sexe' => $sexe,
'pPrenom' => $pPrenom,
'pNom' => $pNom,
'pProfession' => $pProfession,
'pDomicile' => $pDomicile,
'pNationalite' => $pNationalite,
'mPrenom' => $mPrenom,
'mNom' => $mNom,
'mProfession' => $mProfession,
'mDomicile' => $mDomicile,
'mNationalite' => $mNationalite,
'dNom' => $dNom,
'dPrenom' => $dPrenom,
'dAge' => $dAge,
'dDomicile' => $dDomicile,
'region' => $region,
'cercle' => $cercle,
'commune' => $commune,
'created_date' => $created_date,
'created_by' => $created_by,
'published' => $published,
'status' => $status,

'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($volet);
}
else
{
  http_response_code(422);
}

}

?>
