//*********************************************************************
// AUTHOR: Jeremy Fox
// COURSE: Advanced Visual Frameworks
// FOR: Full Sail Online
// TERM: 1206
//*********************************************************************

//*********************************************************************
// CONTACTS
//*********************************************************************
var contactsBtn = $('#notification');
contactsBtn.live('live', function(){

});

//*********************************************************************
// CAMERAS/PHOTOS
//*********************************************************************
var pictureSource;
var destinationType;

$('#photoPage').bind('pageshow', onDeviceReady(event));

function onDeviceReady(event) {
    alert("PHOTOS PAGE IS READY!!!!!!!!!!!!!");
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {

    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;

function onPhotoURISuccess(imageURI) {

    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}

var capturePhoto = function() {

    navigator.camera.getPicture(onPhotoDataSuccess, photosOnFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

var capturePhotoEdit = function() {

    navigator.camera.getPicture(onPhotoDataSuccess, photosOnFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

var getPhoto = function(source) {

    navigator.camera.getPicture(onPhotoURISuccess, photosOnFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

var photosOnFail = function(message) {
    alert('Failed because: ' + message);
}

var capturePhotoBtn = $("#capturePhoto");
capturePhotoBtn.live('click', capturePhoto());

var capturePhotoEditBtn = $("#capturePhotoEdit");
capturePhotoEditBtn.live('click', capturePhotoEdit());

var getPhotoLibraryBtn = $("#getPhotoLibrary");
getPhotoLibraryBtn.live('click', getPhoto(pictureSource.PHOTOLIBRARY));

var getPhotoAlbumBtn = $("#getPhotoAlbum");
getPhotoAlbumBtn.live('click', getPhoto(pictureSource.SAVEDPHOTOALBUM));

//*********************************************************************
// NOTIFICATIONS
//*********************************************************************
var notificationBtn = $('#notification');

notificationBtn.live('click', function(){
    function alertDismissed() {
        // do nothing
        console.log("Dismissed");
    }

    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed(),         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
});

//*********************************************************************
// GEOLOCATION
//*********************************************************************
var geolocationBtn = $('#geolocation');

var geoOnSuccess = function(position) {
    var geolocationDiv = $('#geolocationDiv');
    geolocationDiv.append( 'Latitude: '           + position.coords.latitude              + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + new Date(position.timestamp)          + '<br />' +
        '<hr>');
};

var geoOnError = function(error) {
    alert('code: ' + error.code    + '\n' +
       'message: ' + error.message + '\n');
}

geolocationBtn.live('click', function(){
  navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
});