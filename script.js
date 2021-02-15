const Mainimage = document.getElementById('main-img');
const Title = document.getElementById('title')
const Artist = document.getElementById('artist')
 

const music = document.querySelector('audio');
const prograssContainer = document.getElementById('prograss-container');
const prograss = document.getElementById('prograss');
const Duration = document.querySelector('.duration-warper')

const CurrentTimeEl = document.getElementById('curent-time')
const durationEl = document.getElementById('duration')
const playcontainer = document.getElementById('play-container')
 

 

const prevBtn = document.getElementById('prev');
const PLayBtn = document.getElementById('play');
const NextBtn = document.getElementById('next');

const body = document.getElementById('body');
const Back = document.querySelector('.back');





//-----------------------------------------------------------------------------------


//music list

let songs = [
    {
        name: 'hussin',
        displayName : 'أحبّك ',
        artist: 'حسين الجسمي',
        background : '#c09670',
    },
      
 
    {
        name: 'Majid',
        displayName : 'عطشان ',
        artist: 'ماجد المهندس',
        background : '#930207',
    },

    {
        name: 'faia',
        displayName : 'يا قاتلي',
        artist: 'فايا يونان',
        background: '#2d3696',
    },

    {
        name: 'kadm',
        displayName : 'أحبيني بلا عقد',
        artist: 'كاظم الساهر',
        background: 'rgb(49 44 44)',
    },

    {
        name: 'rahma',
        displayName : 'وعد مني',
        artist: 'رحمه رياض',
        background : '#93224b',
    },

    
    {
        name: 'Sultan',
        displayName : 'مالي غيرك',
        artist: 'سلطان العماني',
        background : '#e4d44b',
    },

    {
        name: 'mohammadsalim',
        displayName : ' اعوف الدنيا',
        artist: 'محمد السالم ',
        background : 'rgb(49 44 44)',
    },
    
    {
        name: 'aseel',
        displayName : 'سر الحياة',
        artist: 'أصيل هميم',
        background : '#444057',
    },
    {
        name: 'ashaq',
        displayName : 'عشق',
        artist: 'فيصل عبدالكريم',
        background : '#363030',
    },


    
    {
        name: 'Amar',
        displayName : '  مدرسة الحب',
        artist: 'عمار الكوفي   ',
        background : '#2f2703',
    },

    {
        name: 'Marwan',
        displayName : 'كل القصايد',
        artist: 'مروان خوري ',
        background : '#930207',
    },
   

    {
        name: 'mohammad',
        displayName : ' أسجل روحي',
        artist: 'محمد عبدالجبار',
        background : '#330909',
    },

    {
        name: 'dino',
        displayName : 'روژ',
        artist: 'هوزان دينو',
        background : 'rgb(49 44 44)',
    },

    {
        name: 'adham',
        displayName : ' هو الحُب ',
        artist: 'أدهم نابلسي',
        background : '#a6191f',
    },

    {
        name: 'alisaber',
        displayName : 'معقوله ',
        artist: 'علي صابر',
        background : '#433d3c',
    },
    
     
]






//check if playing or not

 let isPlaying = false;
// play 
function playSong() {
    isPlaying = true;
    PLayBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    PLayBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    music.pause();
}


//play or pause eventlitner

PLayBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));



//update song

function loadSong(song) {
    Title.textContent = song.displayName;
    Artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    Mainimage.src = `img/${song.name}.jpg`;
    prograss.style.background = song.background;
    body.style.background = song.background;
    Duration.style.color = song.background;
    
    PLayBtn.style.color = song.background;
    prevBtn.style.color = song.background;
    NextBtn.style.color = song.background;
    
}



//current song
let SongIndex = 0;

// on load select the firstsong

loadSong(songs[SongIndex]);



////prev function  
function prevSong() {
    SongIndex--;
    if (SongIndex < 0) {
        SongIndex = songs.length -1;
    }
    loadSong(songs[SongIndex]);
    playSong();
}

//// next function  
function nextSong() {
    SongIndex++;
    if (SongIndex > songs.length - 1) {
        SongIndex = 0;
    }
    loadSong(songs[SongIndex]);
    playSong();
}


//update song time

function UpdatePrograss(e) {
    if (isPlaying) {
        //duration is the time of th song // current time is the begning of the song
        const { duration, currentTime } = e.srcElement;
        
        //update prograss bar width

        let prograssPercent = (currentTime / duration) * 100;
        prograss.style.width = `${prograssPercent}%`;


        //Calculate display duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`;
        }

    // delay switching duration element to avoid NaN - NOT A NUMBER
        if (durationSecond) {
            durationEl.textContent = `${durationMinutes} : ${durationSecond}`;
        }
        // display currenttime
        const CurrentMinutes = Math.floor(currentTime / 60);
        let CurrentSecond = Math.floor(currentTime % 60);
        if (CurrentSecond < 10) {
            CurrentSecond = `0${CurrentSecond}`;
        }
          
        CurrentTimeEl.textContent = `${CurrentMinutes} : ${CurrentSecond}`;

    }
}


// set prograss bar

function SetprograssBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}






//  addEventListener

prevBtn.addEventListener('click', prevSong);
NextBtn.addEventListener('click', nextSong);
music.addEventListener("timeupdate", UpdatePrograss)
music.addEventListener('ended' , nextSong)
prograssContainer.addEventListener('click', SetprograssBar)
 
