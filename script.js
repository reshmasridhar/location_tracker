document.getElementById('getLocationBtn').addEventListener('click', getLocation);
document.getElementById('getLocationBtn').addEventListener('click', getLocation);


document.getElementById('getLocationBtn').addEventListener('click', getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var locationData = document.getElementById('locationData');
    locationData.style.display = 'block'; // Show location data
    document.getElementById('latitude').textContent = 'Latitude: ' + latitude;
    document.getElementById('longitude').textContent = 'Longitude: ' + longitude;
    sendDataToThingSpeak(latitude, longitude); // Send data to ThingSpeak
    
    // Show Location History section after getting the location
    document.getElementById('graphSection').style.display = 'block';
}




// Rest of your script.js file...

function sendDataToThingSpeak(latitude, longitude) {
    const apiKey = '43EYHRN0UI4BTOER';
    const channelID = '2526500';
    const latitudeField = '1'; // Field ID for latitude
    const longitudeField = '2'; // Field ID for longitude
    const urlLatitude = `https://api.thingspeak.com/update?api_key=${apiKey}&field${latitudeField}=${latitude}`;
    const urlLongitude = `https://api.thingspeak.com/update?api_key=${apiKey}&field${longitudeField}=${longitude}`;

    fetch(urlLatitude)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Latitude data sent to ThingSpeak:', data);
        displayThingSpeakGraph(latitudeField);
    })
    .catch(error => {
        console.error('Error sending latitude data to ThingSpeak:', error);
    });

    fetch(urlLongitude)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Longitude data sent to ThingSpeak:', data);
        displayThingSpeakGraph(longitudeField);
    })
    .catch(error => {
        console.error('Error sending longitude data to ThingSpeak:', error);
    });
}

function displayThingSpeakGraph(field) {
    const channelID = '2526500';
    const apiKey = 'CKYJ64F0DK3Z4ZY1';
    const numPoints = '50'; // Number of data points to display

    const graphContainer = document.getElementById('graphContainer');
    const iframe = document.createElement('iframe');
    iframe.src = `https://thingspeak.com/channels/${channelID}/charts/${field}?api_key=${apiKey}&dynamic=true&results=${numPoints}`;
    iframe.width = '100%';
    // iframe.height = '400';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.margin = '0 auto'; // Center the iframe horizontally
    iframe.style.aspectRatio = '16 / 9'; 
    graphContainer.appendChild(iframe);
}