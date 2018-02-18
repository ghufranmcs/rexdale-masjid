const fs = require("fs");
var csv = require('csv-parser');

var inputStream = fs.createReadStream('iqma-times.csv', 'utf8');
var counter = 0;
var colNames = null;
inputStream
   .pipe(csv({  headers: ['date', 'fajr','fajrIqma', 'sunrise','zuhr','zuhrIqma','asr','asrIqma','maghrib','magribIqma','isha','ishaIqma'] }))
   .on('data', function (row) {
       console.log('A row arrived: ', row);
       if(counter == 0){
          counter++;
       } else {
        fs.writeFileSync('static/PrayerTime/'+row.date+'.json',JSON.stringify(row, undefined, 2));
       }
   })
   .on('end', function (data) {
       console.log('No more rows!');
   });
