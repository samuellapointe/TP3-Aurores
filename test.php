<?php
	error_reporting(15);
	
	# Read the latest aurora data
	$aurora_data = file_get_contents("aurora-nowcast-map.txt");

	# Iterate over each line
	# First, split all lines
	$lines = explode("\n", $aurora_data);
	
	# We're going to count the rows and columns manually
	$row = 0;
	$col = 0;
	
	# And we're storing the percentages in there
	$data = array();
	
	foreach ($lines as &$line) 
	{
		# If the line is not a comment
		$line = trim($line);
		if ($line[0] != "#") {
		
			# Split by spaces, tabs and stuff
			$values = preg_split('/\s+/', $line);
			foreach ($values as &$value) 
			{
				$data[$row][$col] = intval($value);
				$col++;
				
				# The world is split by 1024 on width, split here
				if ($col == 1024) {
					$col = 0;
					$row++;
				}
			}
		}
	}
	
	# At this point, data is 1024 wide and 512 tall, with percentage values.
	echo json_encode($data);
?>