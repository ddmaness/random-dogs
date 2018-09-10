(function() {

    // toggle visiblity of play video button
    function togglePlay() {
        if (document.getElementById('play')) {
            document.getElementById('play').remove();
        }
    }

    // disable or enable button to request new dog
    function toggleGetDisable() {
        var button = document.getElementById('get-dog-button');
        button.disabled ? button.disabled = false: button.disabled = true;
    }

    // clear out display area
    function clearDisplayArea() {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('container').innerHTML = '';
    }

    // checks if the url returned from the url represents a video or not
    function isVideo(data) {
        if (/\.(mp4|webm)$/.test(data)) {
            return true;
        }
        else {
            return false;
        }
    }

    // display video from requested url
    function displayVideo(data) {
        var video = document.createElement('video');
        video.loop = true;
        video.src = data;
        var button = document.createElement('button');
        button.textContent = 'Play';
        button.id = 'play'
        document.getElementById('spinner').style.display = 'none';
        container.appendChild(video);
        document.getElementById('controls').appendChild(button);
        document.getElementById('get-dog-button').disabled = false;
        button.addEventListener('click', function() {
            button.style.display = 'none';
            video.play();
        });
    }

    // display photo from requested url
    function displayPhoto(data) {
        var photo = document.createElement('img');
        photo.src = data;
        photo.alt = 'dog photo';
        photo.addEventListener('load', function() {
            document.getElementById('spinner').style.display = 'none';
            container.appendChild(photo);
            document.getElementById('get-dog-button').disabled = false;
        })
    }

    // reset the page
    function reset() {
        toggleGetDisable();
        togglePlay();
        clearDisplayArea();
    }

    // parse data returned by api
    function parseData(data) {
        return JSON.parse(data).url;
    }

    // add event listener to request a new dog to the button element
    function addRequestToButton() {
        document.getElementById('get-dog-button').addEventListener('click', function(){
            requestDog(handleData)
        });
    }

    /*
    ===================================================================================

    Make request and handle response

    ===================================================================================
    */


    // request data from random.dog api
    function requestDog(callback){
        reset();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                callback(this.responseText);
            }
        }
        xhr.open('GET', 'https://random.dog/woof.json');
        xhr.send();
    }

    // parse and display returned data from random.dog api
    function handleData(data) {
        var url = parseData(data);
        if(isVideo(url)) {
            displayVideo(url);
        }
        else {
            displayPhoto(url);
        }
    }

    addRequestToButton();

})()