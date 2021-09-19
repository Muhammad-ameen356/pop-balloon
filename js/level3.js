var count = 0
var life = 3;

let score = document.getElementById('score');
let lifecount = document.getElementById('lifecount');

document.addEventListener('mouseover', function (e) {
    if (e.target.className === "orangeballon") {
        e.target.style.backgroundColor = "#ededed";
        e.target.textContent = "POP!";
        count++
        scorefunc(count)
        e.target.addEventListener('mouseout', function(e){
            e.target.removeEventListener('mouseover', function(){})
        })
    } else if (e.target.className === "ballon") {
        e.target.style.backgroundColor = "#C72300";
        e.target.textContent = "Fail!";
        life--;
        lifefunc(life);
    } else if (e.target.className === "redballon") {
        e.target.style.backgroundColor = "#C72300";
        e.target.textContent = "Fail!";
        life--;
        lifefunc(life);
    } else if (e.target.className === "greenballon") {
        e.target.style.backgroundColor = "#C72300";
        e.target.textContent = "Fail!";
        life--;
        lifefunc(life);
    }
})

const scorefunc = (count) => {
    score.innerHTML = `Score ${count}`;
    
    if(count == 5){
        document.getElementById('gonextleve3').style.display="block"
        // window.location.href="./level2.html"
    }
}
const lifefunc = (life) => {
    lifecount.innerHTML = `Life ${life}` ;
    if(life < 0){
        window.location.href="./gameover.html";
    }
}