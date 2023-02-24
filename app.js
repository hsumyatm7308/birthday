
//  Gallery 
const getallbtn = document.getElementById('allbtn');
const getgallerybtn = document.getElementById('gallerybtn');
const all = document.getElementById('all');
const gallery = document.getElementById('gallery');

getgallerybtn.addEventListener('click',function(){
   gallery.style.display = "block";
   getgallerybtn.style.backgroundColor = "#dfa060";
   all.style.display = "none";
   getallbtn.style.backgroundColor = "aquamarine";

});

getallbtn.addEventListener('click',function(){
    gallery.style.display = "none";
    getgallerybtn.style.backgroundColor = "aquamarine";
    all.style.display = "block";
    getallbtn.style.backgroundColor = "#dfa060";

});



var getaccotitle = document.querySelectorAll('.accodion-title');
var accodion = document.querySelectorAll('.accodion');

for(var x = 0; x < getaccotitle.length; x++){
    // console.log(getaccotitle[x]);
    getaccotitle[x].addEventListener('click',function(){
        var getcontent = this.nextElementSibling

        if(getcontent.style.height){
        getcontent.style.height = null;
            
        }else{
        getcontent.style.height = getcontent.scrollHeight + "px"

        };
    
    });
}


// lightbox
const bigcontainer = document.querySelector('.bigcontainer');
const getimg = document.querySelectorAll('.img');
const getbimg = document.querySelector('.b-img')
const esc = document.querySelector('.esc');
const prevang = document.getElementById('prevang');
const nextang = document.getElementById('nextang'); 

let curidx = 1

for(var x = 0; x < getimg.length ; x++){
    // console.log(x);
    getimg[x].addEventListener('click',function(){
        shown(this);
    });

   
    esc.addEventListener('click',function(){
        bigcontainer.style.display = "none";
    });
};

function shown(e){
    bigcontainer.style.display = 'block';
    // console.log(e.src)
    getbimg.src = e.src;
    curidx++;
    if(curidx > getimg.length-1 ){
        curidx = 0;
    }else if(curidx < 0){
        curidx--;
        curidx = getimg.length-1
    };
}

prevang.addEventListener('click',function(){
    shown(getimg[curidx]);
 });
 
 nextang.addEventListener('click',function(){
     shown(getimg[curidx]);
 });


 

//  Audio Part 


const getaudio = document.getElementById('audio');
const songname = document.getElementById('songname');


const getprogresscontainer = document.getElementById('progresscontainer');
const getprogress = document.getElementById('progress');

const repeatbtn = document.getElementById('repeat');
const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');
const timestamp = document.getElementById('timestamp');

const getstick = document.querySelector('.stick');
const getsmallcicle = document.querySelector('.smallcicle');

const notes = document.getElementById('notes');


var audioes = ['eldorado','runaway','sweetlies','thefirstsnow','mama'];
var songtitles = ['El Dorado','Run Away','Sweet Lies','The First Snow','MAMA'];






let cursongidx = 0;
let curtitleidx = 0;





function loading() {
    getaudio.src = `./fav/${audioes[cursongidx]}.mp3`;
}

function prevsongs(){

    cursongidx--;
    curtitleidx--;
    if(cursongidx < 0){
        cursongidx = audioes.length-1;
        curtitleidx = audioes.length-1;
        
    }; 
    loading()
    playpausesongs();

    songname.innerHTML = songtitles[curtitleidx];

   
}

function nextsongs(){
    cursongidx++;
    curtitleidx++;
    console.log(audioes.length-1)
    if(cursongidx > audioes.length-1){
        cursongidx = 0;
        curtitleidx = 0;
    }
    loading()
    playpausesongs();

    songname.innerHTML = songtitles[curtitleidx];
}

function updateprogress(){
    var currenttime = getaudio.currentTime;
    var adoduration = getaudio.duration;
    var audiolength = audioes.length -1;



    if(currenttime === 0){
        getprogress.style.width = "0%"
        getprogress.style.overflow = "hidden"
    }else{
        let progressing = (currenttime/adoduration)*100;
        getprogress.style.width = `${progressing}%`;
        getprogress.style.overflow = "visible";

    console.log(Math.floor(getaudio.duration))

    }


   if(currenttime === adoduration){
    // console.log(cursongidx + 1)

    if(cursongidx < audiolength ){
        getaudio.src = `./fav/${audioes[cursongidx+1]}.mp3`;
        cursongidx ++;
        songname.innerHTML = songtitles[curtitleidx+1];
        curtitleidx++;

        playpausesongs();

    }
   }else  if(currenttime >= 273){

        playbtn.innerHTML = `<button type="button" id="play" ><i class="fa-solid fa-play"></i></button>`;
        getstick.classList.remove('transformorg');
        getsmallcicle.classList.remove('turnningplay') ; 
        notes.classList.remove('notes')
 
//    console.log(Math.floor(getaudio.duration))

   
        if(repeatbtn.classList.contains('repeat1')){
            if(getaudio.currentTime >= 273){
               cursongidx = -1;
               curtitleidx = -1;
             }
            }  

   }

    let min = Math.floor(currenttime/60)
    let sec = Math.floor(currenttime%60)

    const mins = min.toString().padStart(2,'0');
    const secs = sec.toString().padStart(2,'0');

    timestamp.innerHTML = `${mins}:${secs}`;




    
}


function progressbar(e){
    const progresswidth = getaudio.clientWidth;
    const progressoffset = e.offsetX;
    const progressduration = getaudio.duration;  
    getaudio.currentTime = (progressoffset/progresswidth)*progressduration ;

    getaudio.play();
    playbtn.innerHTML = `<button type="button" id="play" ><i class="fa-solid fa-pause"></i></button>`;
    getstick.classList.add('transformorg')
    getsmallcicle.classList.add('turnningplay') ;  
    notes.classList.add('notes')

 
}

function playpausesongs(){
    if(getaudio.paused){
        getaudio.play();
        playbtn.innerHTML = `<button type="button" id="play" ><i class="fa-solid fa-pause"></i></button>`;
        getstick.classList.add('transformorg')
        getsmallcicle.classList.add('turnningplay') ; 
        notes.classList.add('notes')

        
        
      
    }else{
        getaudio.pause();
        playbtn.innerHTML = `<button type="button" id="play" ><i class="fa-solid fa-play"></i></button>`;

    }
}


function looping(){
    repeatbtn.classList.toggle('repeat1');
 }
 




getaudio.addEventListener('timeupdate',updateprogress);
getprogresscontainer.addEventListener('click',progressbar);
playbtn.addEventListener('click',playpausesongs);
prevbtn.addEventListener('click',prevsongs);
nextbtn.addEventListener('click',nextsongs);
repeatbtn.addEventListener('click',looping);











   
    
   
const getsonglists = document.querySelectorAll('.songs');


getsonglists.forEach(function(getsonglist,idx){

   getsonglist.addEventListener('click',function(){
     getplaysong(idx);
     console.log(getsonglist)
   });
});


function getplaysong(idx){

    audioes.forEach(function(audio,adoidx){
        console.log(adoidx)

        if(idx === adoidx){
            // console.log('hi')
            getaudio.src = `./fav/${audioes[adoidx]}.mp3`;
            songname.innerHTML = songtitles[adoidx];

            playbtn.innerHTML = `<button type="button" id="play" ><i class="fa-solid fa-pause"></i></button>`;
            getstick.classList.add('transformorg')
            getsmallcicle.classList.add('turnningplay') ; 
            notes.classList.add('notes');


       
    
           
        };
    });
}







    


    





    


 




 

 