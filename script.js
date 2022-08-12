const game=document.querySelector('.game')
const score=document.querySelector('#score')
const width=100
const height=30
const boardwidth=790
const diameter=30
const start=[300,0]
const ballstart=[390,50]
const boardheight=490
let ballpos=ballstart
let position=start
let timeset=window.prompt("Bạn hãy chọn số giây quả bóng chạy\r\nThời gian là ms: Normal là 45ms")
let x=10
let y=10
let res=0
class Block 
{
    constructor(xAxis,yAxis)
    {
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis + width,yAxis]
        this.topLeft=[xAxis,yAxis+height]
        this.topRight=[xAxis+width,yAxis+height]
    }
}

const blocks=
[
    new Block(10,450),
    new Block(120,450),
    new Block(230,450),
    new Block(340,450),
    new Block(450,450),
    new Block(560,450),
    new Block(670,450),
    new Block(10,410),
    new Block(120,410),
    new Block(230,410),
    new Block(340,410),
    new Block(450,410),
    new Block(560,410),
    new Block(670,410),
    new Block(10,370),
    new Block(120,370),
    new Block(230,370),
    new Block(340,370),
    new Block(450,370),
    new Block(560,370),
    new Block(670,370),

]
console.log(blocks[0])
function addBlocks()
{
    for(let i=0;i<blocks.length;i++)
    {
        const block=document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        game.appendChild(block)
    }
}
addBlocks()
//user
const user=document.createElement('div')
user.classList.add('user')
user.style.left=position[0]+'px'
user.style.bottom=position[1]+'px'
game.appendChild(user)
function drawuser()
{
user.style.left=position[0]+'px'
user.style.bottom=position[1]+'px'
}
function drawball()
{
    ball.style.left=ballpos[0]+'px'
    ball.style.bottom=ballpos[1]+'px'
}
function move(e)
{
    switch(e.key)
    {
        case "ArrowLeft":
            if(position[0]>0)
            {
            position[0]-=30;
            drawuser()
            break;}
        case "ArrowRight":
            if(position[0]<580)
            {position[0]+=30;
            drawuser()
            break;}
    }
}
document.addEventListener('keydown',move)

//ball
const ball=document.createElement('div')
ball.classList.add('ball')
drawball()
game.appendChild(ball)

function moveball()
{
    ballpos[0]+=x
    ballpos[1]+=y
    drawball()
    checkhit()
}
let choice
let button=document.querySelectorAll('button')
button.forEach(button => button.addEventListener('click',(e)=>
{
    choice=e.target.id
    console.log(choice)
    if(timeset===null)
    {
        alert("Bạn chưa chọn tốc độ bóng vui lòng chọn hihi")
        window.location.reload();
    }
    else{if(choice==='yes')
    yesfunction()
    else nofunction()
    }
}))
function yesfunction()
{
    time=setInterval(moveball,timeset)
}
function nofunction()
{
    clearInterval(time)
}

function checkhit()
{
    //check block
    for(let i=0;i<blocks.length;i++)
    {
        if(ballpos[0]>blocks[i].bottomLeft[0] && ballpos[0]<blocks[i].bottomRight[0]
            && ballpos[1]>blocks[i].bottomLeft[1] && ballpos[1]<blocks[i].topLeft[1])
        {
            const allblocks=Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            blocks.splice(i,1)
            res++;
            changedirection()
            score.innerHTML=res;
            if(blocks.length==0)
            {
                clearInterval(time)
                document.removeEventListener('keydown',move)
                alert('Giỏi quá hihi')
            }
        }
    }
    //check user
    if(ballpos[0]>=position[0] && ballpos[0]<=(position[0]+200)
    && ballpos[1]>=position[1] && ballpos[1]<=(position[1]+height))
    {
        changedirection()
    }
    //checkborder
    if(ballpos[0]>=(boardwidth-diameter) || ballpos[1]>=(boardheight-diameter)
    ||ballpos[0]<=0)
    {
        changedirection()
    }
    //check for gameover
    if(ballpos[1]<=0)
    {
        clearInterval(time)
        score.innerHTML='You lose'
        document.removeEventListener('keydown',move)
        alert('Non hehe')
        window.location.reload();
    }
}

function changedirection()
{
    if(x==10 && y==10)
    {
        y=-10
        return
    }
    if(x==10 && y==-10)
    {
        x=-10
        return
    }
    if(x==-10 && y==-10)
    {
        y=10
        return
    }
    if(x==-10 && y==10)
    {
        x=10
        return
    }

}