function requestDog(callback){
    if (document.getElementById('play')) {
        document.getElementById('play').remove();
    }
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('container').innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4) {
            callback(this.responseText);
        }
    }
    xhr.open('GET', 'https://random.dog/woof.json');
    xhr.send();
}

function handleData(data) {
    var parsedData = JSON.parse(data);
    var container = document.getElementById('container');
    if(/\.(mp4|webm)$/.test(parsedData.url)) {
        var video = document.createElement('video');
        video.id = 'dog-video'
        video.src = parsedData.url;
        var button = document.createElement('button');
        button.textContent = 'Play';
        button.id = 'play'
        button.addEventListener('click', function playVideo() {
            button.style.display = 'none';
            video.play();
            video.loop = true;
        })
        video.addEventListener('canplay', function() {
            document.getElementById('spinner').style.display = 'none';
            container.appendChild(video);
            document.getElementById('controls').appendChild(button);
        })
    }
    else {
        var photo = document.createElement('img');
        photo.src = parsedData.url;
        photo.alt = 'dog photo';
        photo.addEventListener('load', function() {
            document.getElementById('spinner').style.display = 'none';
            container.appendChild(photo);
        })
    }
}

document.getElementById('dog-get').addEventListener('click', function(){
    requestDog(handleData)
});