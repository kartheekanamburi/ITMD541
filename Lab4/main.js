
  document.getElementById('mainTble').style.display = 'none';
  var input = document.getElementById('searchIn');
  input.addEventListener('keypress', function(event){
    if(event.key === 'Enter') {
      const nextDaysTable = document.getElementById('nextInfoTable');
      while (nextDaysTable.firstChild) nextDaysTable.removeChild(nextDaysTable.firstChild)
      getSearchStringInfo();
    }
  });

  navigator.geolocation.getCurrentPosition(success,error)
  
  function success(position) {
  document.getElementById('wait').innerHTML = 'Received location, now fetching data. Please wait ...';
   console.log(position);
   var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    let str = lat+','+lng;
    getWeatherInfo(str);
  }

  var nextDays;

  function getWeatherInfo(str) {
    document.getElementById('wait').style.display = 'block';
    fetch("https://weatherdbi.herokuapp.com/data/weather/"+str)
    .then(res=>res.json())
    .then(json=>{
        if(json.currentConditions){
        console.log("success response", json)
        document.getElementById('loc').innerHTML = json.region + " As of "+ json.currentConditions.dayhour;
        //document.getElementById('day').innerHTML = json.currentConditions.dayhour;
        document.getElementById('image').src = json.currentConditions.iconURL;
        document.getElementById('comment').innerHTML = json.currentConditions.comment;
        document.getElementById('humidity').innerHTML = "Humidity: "+ json.currentConditions.humidity;
        document.getElementById('precip').innerHTML = "precip: " + json.currentConditions.precip;
        document.getElementById('temp').innerHTML = "Temp: " + json.currentConditions.temp.c + ' \u2103 / ' + json.currentConditions.temp.f + ' \u2109';
        document.getElementById('wind').innerHTML = "Wind: " + json.currentConditions.wind.km + ' km / '+ json.currentConditions.wind.mile + ' miles';
        nextDays = json.next_days;
        document.getElementById('mainTble').style.display = 'block';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('wait').style.display = 'none';
        //createTableForNextDays();
        }
        else{
          if(json.status === "fail"){
            document.getElementById('wait').style.display = 'none';
            document.getElementById('error-from-api').innerHTML = "Error from API : "+ json.message
            document.getElementById('loader').style.display = 'none';

            document.getElementById('loc').innerHTML = "";
            document.getElementById('image').src = "";
            document.getElementById('comment').innerHTML = "";
            document.getElementById('humidity').innerHTML = "Humidity: "+ "";
            document.getElementById('precip').innerHTML = "precip: " + "";
            document.getElementById('temp').innerHTML = "Temp: " + "";
            document.getElementById('wind').innerHTML = "Wind: " + "";
            
          }
        }
    })
  }

  function createTableForNextDays() {
    const nextDaysTable = document.getElementById('nextInfoTable');
    let tableHeaders = ["Day", "Temp Max", "Temp Min", "Comment", "icon"];
    
      while (nextDaysTable.firstChild) nextDaysTable.removeChild(nextDaysTable.firstChild)
      if(nextDays){
        let nextTable = document.createElement('table')
        nextTable.className = 'nextTable';

        let nextTableHead = document.createElement('thead')
        nextTableHead.className = 'nextTableHead';

        let nextTableHeaderRow = document.createElement('tr')
        nextTableHeaderRow.className = 'nextTableHeaderRow';

        tableHeaders.forEach( header => {
            let nextHeader = document.createElement('th');
            nextHeader.style.paddingLeft='50px'
            //nextHeader.width = "30%"
            nextHeader.innerText = header;
            nextTableHeaderRow.append(nextHeader)
        });
        nextTableHead.append(nextTableHeaderRow);
        nextDaysTable.append(nextTableHead);

        let nextDaysTableBody = document.createElement('tbody')
        nextDaysTableBody.className = "nextDaysTable-body"
        nextTable.append(nextDaysTableBody)
        nextDaysTable.append(nextTable)
        for(let i = 1; i < nextDays.length; i++) {
          assignDataToTable(nextDays[i]);
        }
      }
}

  function assignDataToTable(item) {
      const nextDaysTable = document.querySelector('.nextTable');
      let nextDayTableBodyRow = document.createElement('tr')
      nextDayTableBodyRow.className = 'nextDayTableBodyRow'

      let nextDaysDay = document.createElement('td')
      nextDaysDay.style.paddingLeft = '20px';
      nextDaysDay.innerText = item.day;

      let nextDaysTempMin = document.createElement('td')
      nextDaysTempMin.style.paddingLeft = '20px'
      nextDaysTempMin.innerText = item.min_temp.c + ' \u2103'+ ' / ' + item.min_temp.f + '\u2109';

      let nextDaysTempMax = document.createElement('td')
      nextDaysTempMax.style.paddingLeft = '50px'
      nextDaysTempMax.innerText = item.max_temp.c + ' \u2103'+ ' / ' + item.min_temp.f + '\u2109';

      let nextDaysComment = document.createElement('td')
      nextDaysComment.style.paddingLeft = '40px'
      nextDaysComment.innerText = item.comment;

      let nextDaysIcon = document.createElement('td')
      nextDaysIcon.style.paddingLeft = '40px'
      var img = document.createElement('img');
      img.src = item.iconURL;
      nextDaysIcon.appendChild(img)

      nextDayTableBodyRow.append(nextDaysDay, nextDaysTempMin, nextDaysTempMax, nextDaysComment, nextDaysIcon);
      nextDaysTable.append(nextDayTableBodyRow);
  }

  function error(error) {
   console.log(error);
   switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById('error-from-api').innerHTML = "User denied the request for Geolocation."
      document.getElementById('loader').style.display = 'none';
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById('error-from-api').innerHTML = "Location information is unavailable."
      document.getElementById('loader').style.display = 'none';
      break;
    case error.TIMEOUT:
      document.getElementById('error-from-api').innerHTML = "The request to get user location timed out."
      document.getElementById('loader').style.display = 'none';
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById('error-from-api').innerHTML = "An unknown error occurred."
      document.getElementById('loader').style.display = 'none';
      break;
    }
  }

  function getSearchStringInfo() {
    const search = document.getElementById('searchIn').value;
    document.getElementById('loader').style.display = 'block';
    if(search){
      document.getElementById('error-from-api').innerHTML = ""
      nextDays = null;
      const nextDaysTable = document.getElementById('nextInfoTable');
      while (nextDaysTable.firstChild) nextDaysTable.removeChild(nextDaysTable.firstChild)
      getWeatherInfo(search);
    } else{
      document.getElementById('error-from-api').innerHTML = "Enter valid input"
      document.getElementById('loader').style.display = 'none';
    } 
  }