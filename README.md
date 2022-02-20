# Running GPS Corrector #

## Assumptions ##
1. Runs must be symmetrical, meaning that the first set of coordinates are the same as the last, the second set is the same as the second to last, etc
2. The most common and applicable use case is for somebody who runs somewhere and turns back halfway through the run, following the exact path
3. Must use .gpx files

## Algorithm ##
1. Check to see if file exists in directory
2. If it doesn't, repeat step 1; otherwise move on
3. Filter the GPX file for all lines that contain coordinates, line 36 in index.js specifies that includes `<trkpt`
4. The variable `replacementLimit` specifies the first n coordinates to be replaced. By setting it to half of the amount of GPS coordinates, the algorithm replaces the entire first half of the file. This variable can be modified to any number of coordinates, as long as that number is less than half of the coordinates in the file
5. Overwrite lines with new coordinates