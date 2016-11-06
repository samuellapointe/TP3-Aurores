<?php
	error_reporting(15);
	
	# Read the latest aurora data
	$aurora_data = file_get_contents("aurora-nowcast-map.txt");

	# Iterate over each line
	$lines = explode("\n", $aurora_data);
	$row = 0;
	$col = 0;
	foreach ($lines as &$line) 
	{
		# If the line is not a comment
		$line = trim($line);
		if ($line[0] != "#") {
			$values = explode(" ", $line);
			foreach ($values as &$value) 
			{
				echo $value;
				$col++;
			}
			$row++;
			echo "<br/>";
		}
	}
?>