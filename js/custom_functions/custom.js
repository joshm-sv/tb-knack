
var currentEstDT = new Date();
var currentDate = currentEstDT.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'America/New_York' });
currentEstDT = currentEstDT.toLocaleString('en-US', {timeZone: 'America/New_York'}).replace(",","");
currentEstDT = new Date(currentEstDT);
var endServiceDate = new Date(currentDate+" 6:00:00 AM");
var timeDiff = endServiceDate - currentEstDT;

function searchParam(name) {
    return (window.location.href.split(name + '=')[1] || '').split('&')[0];
}

function prevServiceDate(){
    var d = new Date(currentServiceDate());
    d.setDate( d.getDate() - 1 );
    return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
 }
 
 function currentServiceDate(){
  if(0 > timeDiff) { return currentDate}
    else {
      var d = new Date(currentDate);
    d.setDate( d.getDate() - 1 );
        return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    }
 }

module.exports = {
    searchParam: searchParam,
    prevServiceDate: prevServiceDate,
    currentServiceDate: currentServiceDate
};