const fs = require("fs");
var csv = require('csv-parser');

var inputStream = fs.createReadStream('nov_9_2023.csv', 'utf8');
var counter = 0;
var colNames = null;
inputStream
   .pipe(csv({  headers: ['date', 'fajr','fajrIqma', 'sunrise','zuhr','zuhrIqma','asr','asrIqma','maghrib','maghribIqma','isha','ishaIqma'] }))
   .on('data', function (row) {
       console.log('A row arrived: ', row);
       if(counter == 0){
          counter++;
       } else {
        row.date = row.date.substring(0,5);
        fs.writeFileSync('docs/PrayerTime/'+row.date +'.json',JSON.stringify(row, undefined, 2));
       }
   })
   .on('end', function (data) {
       console.log('No more rows!');
   });
