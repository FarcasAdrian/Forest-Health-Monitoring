<?php

$connection = mysqli_connect('localhost', 'root', 'parola123', 'forest_health');

$query = "UPDATE forest_list SET location = ST_GeomFromText('POLYGON((
                        45.95303369891325 25.402161040838678,
                        45.964697588273474 25.435769208481588,
                        45.95610573285935 25.465123303940572,
                        45.888448268992455 25.46056955900076,
                        45.918610341092986 25.391475854777127,
                        45.95303369891325 25.402161040838678))') WHERE id = 9";
$connection->query($query);

//$query = "insert into test (location) values(ST_GeomFromText('POLYGON((
//                        44.76296456551843 23.55850102154068,
//                        44.14737417040537 24.39895512310318,
//                        44.61065302176007 25.16250492779068,
//                        45.081903027065415 24.91531254497818,
//                        45.066386131914626 23.98696781841568,
//                        44.76296456551843 23.55850102154068))'))";
//$connection->query($query);