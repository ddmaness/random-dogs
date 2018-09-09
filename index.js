function requestDog(callback){
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
        button.addEventListener('click', function playVideo() {
            button.style.display = 'none';
            video.play();
            video.loop = true;
        })
        container.appendChild(video);
        container.appendChild(button);
    }
    else {
        var photo = document.createElement('img');
        photo.src = parsedData.url;
        photo.alt = 'dog photo';
        container.appendChild(photo);
    }
}

document.getElementById('dog-get').addEventListener('click', function(){
    requestDog(handleData)
});