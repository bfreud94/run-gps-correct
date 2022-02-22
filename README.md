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

## Known Issues ##
### Garmin vs. Strava ###
1. This software will always work for runs uploaded to Garmin, as opposed to uploading them to Strava. This is because Strava has a statistic called `Moving Time`, which is the "default" time (as shown in the run overview) and `Elapsed Time`, which is the total amount of time spent on the run. These metrics are not in the gpx file, but rather created by Strava's engine. It calculates the `Moving Time` from the gpx file, and uses the total time (which is the correct metric showed in the overview on Garmin) as the `Elapsed Time`. At this time, there are no resolutions to this issue.

## Example ##

### Before ###
<img width="1792" alt="Screen Shot 2022-02-20 at 11 43 51 AM" src="https://user-images.githubusercontent.com/7871987/154854926-bde78306-b966-401b-938d-943a44d436c1.png">

### After ###
<img width="1792" alt="Screen Shot 2022-02-20 at 11 44 44 AM" src="https://user-images.githubusercontent.com/7871987/154854936-b077f90a-c711-443a-90f5-cd16bb70a419.png">
