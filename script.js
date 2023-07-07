
const {body}=document;
const music= document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image=document.querySelector('.art');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');


const songs=[{
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
}, {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
}, {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
}, {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
}];



//update DOM
function loadSong(song) {
    title.textContent= song.displayName
    artist.textContent=song.artist
    //template string
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
};

//initialize music player
let songIndex=0;

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);


function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime}=e.srcElement;
        const progressPercent=(currentTime/duration)*100;
        progress.style.width=`${progressPercent}%`

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds= Math.floor(duration%60);
        if(durationSeconds<10){ durationSeconds= `0${durationSeconds}`};
        

        //avoid NaN
        if(durationSeconds){
            durationEl.textContent= `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds= Math.floor(currentTime%60);
        if(currentSeconds<10){ currentSeconds= `0${currentSeconds}`};

        currentTimeEl.textContent= `${currentMinutes}:${currentSeconds}`;
        


    }


}


function setProgressBar(e){
    const width=this.clientWidth;
    const clickX= e.offsetX;
    const {duration}= music;
    music.currentTime=(clickX/width)*duration;

}



prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


function changeBackground(number){
    console.log(number)

    let prevBackground;
    if(body.className){
        prevBackground=body.className;
    }


    //reset css class
    body.className='';
    
    switch(number){
        case '1':
            return(prevBackground==='background-1'? fasle: body.classList.add('background-1'));
        case '2':
            return(prevBackground==='background-2'? fasle: body.classList.add('background-2'));
        case '3':
            return(prevBackground==='background-3'? fasle: body.classList.add('background-3'));
        default:
            break;    
        

    }
}

let isPlaying=false;

function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();

}


function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

playBtn.addEventListener('click', ()=>(
    isPlaying? pauseSong(): playSong()))

