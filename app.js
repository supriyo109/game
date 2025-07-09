let gameSeq=[];
let userSeq=[];
let level=0;
let start=false;

let btns=["red", "purple", "yellow", "blue"];

let h2 = document.querySelector("h2");

let score=document.querySelector("h3");

let hc=0;

let points=0;

let play= document.querySelector(".play");

play.addEventListener("click", function() {
    if(start==false){
        start=true;
        score.innerText="Game Start";
        levelUp();
    }
})

function gameFlashBtn(btn) {
    btn.classList.add("Flash");
    setTimeout(function(){
        btn.classList.remove("Flash");
    },250)
}

function UserFlashBtn(btn) {
    btn.classList.add("uFlash");
    setTimeout(function(){
        btn.classList.remove("uFlash");
    },250)
}

function levelUp(){
    level++;
    userSeq=[];
    h2.innerText=`level ${level}`;
    let rendomIdx= Math.floor(Math.random()*4);
    let rendomColor= btns[rendomIdx];
    let rendomBtn= document.querySelector(`.${rendomColor}`);
    gameFlashBtn(rendomBtn);
    gameSeq.push(rendomColor);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            points=points+(level*5);
            score.innerHTML=`Your Score is <b>${points}</b>.`
            levelUp();
        }
    }
    else{
        if(hc<points){
            hc=points;
            h2.innerHTML=`Game Over. <br> Press PLAY button to start`;
            score.innerHTML=`Your Score is <b>${points}</b>.<br><br><br>High score is <b>${hc}</b>.`;
        }
        else{
            h2.innerHTML=`Game Over.<br> Press PLAY button to start`;
            score.innerHTML=` Your Score is <b>${points}</b>.<br><br><br>Highest Score was <b>${hc}</b>.`;
        }
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}

function btnPress(){
    let btn= this;
    UserFlashBtn(btn);
    let ucolor= btn.getAttribute("id");
    userSeq.push(ucolor);

    checkAns(userSeq.length-1);
}

let allBtn= document.querySelectorAll(".btn");
for(btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    level=0;
    points=0;
    userSeq=[];
    gameSeq=[];
    start=false;
}