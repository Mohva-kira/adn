<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$name = trim($request->name);
$pwd = mysqli_real_escape_string($mysqli, trim($request->password));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$role = mysqli_real_escape_string($mysqli, trim($request->role));
$status = mysqli_real_escape_string($mysqli, trim($request->status));
$created_user = mysqli_real_escape_string($mysqli, trim($request->created_user));
$created_date = mysqli_real_escape_string($mysqli, trim($request->created_date));
$sql = "INSERT INTO `users`(`name`,`email`,`password`,`role`,`created_user`,`created_date`,`status`)VALUES
                           ('$name','$email','$pwd','$role','$created_user', '$created_date', '$status')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'name' => $name,
'pwd' => '',
'email' => $email,
'role' => $role,
'status' => $status,
'created_user' => $created_user,
'created_date' => $created_date,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>
