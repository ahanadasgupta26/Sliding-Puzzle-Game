var rows=3;
var coloumns=3;
var curtile;
var othtile;
var turns=0;
var imgord=['1','3','8','7','2','5','9','4','6'];

window.onload=function()
{
    let btn=document.querySelector(".start");
    btn.addEventListener("click",strgame);
}

function strgame()
{
    document.querySelector(".str").style.display="none";
    document.querySelector(".game").style.display="block";
    turns=0;
    imgord=shuff(['1','3','8','7','2','5','9','4','6']);
    initializeb();
}

function shuff(array)
{
     for(let i=array.length-1;i>0;i--)
        {
              const j=Math.floor(Math.random()*(i+1));
              [array[i],array[j]]=[array[j],array[i]];
        }
        return array;
}

function initializeb()
{
    let board = document.querySelector("#board"); 
    board.innerHTML = '';
    for(let r=0;r<rows;r++)
        {
            for(let c=0;c<coloumns;c++)
                {
                    let tile = document.createElement("img");
                    tile.id= r.toString()+"-"+c.toString();
                    tile.src="p" + imgord.shift() + ".jpg";
                    
                    board.appendChild(tile); 
                    tile.addEventListener("dragstart",dragStart);
                    tile.addEventListener("dragover",dragOver);
                    tile.addEventListener("dragenter",dragEnter);
                    tile.addEventListener("dragleave",dragLeave);
                    tile.addEventListener("drop",dragDrop);
                    tile.addEventListener("dragend",dragEnd);
                }    
        }
}

function dragStart()
{
    curtile=this;
}

function dragOver(e)
{
    e.preventDefault();
}

function dragEnter(e)
{
    e.preventDefault();
}

function dragLeave(e)
{
    e.preventDefault();
}

function dragDrop()
{
    othtile=this;
}

function dragEnd()
{
    if(!othtile.src.includes("1.jpg"))
        {
            return;
        }
    let currcords=curtile.id.split("-");
    let r=parseInt(currcords[0]);
    let c=parseInt(currcords[1]);

    let othcords=othtile.id.split("-");
    let r1=parseInt(othcords[0]);
    let c1=parseInt(othcords[1]);

    let moveleft= r==r1&&c1==c-1;
    let moveright= r==r1&&c1==c+1;

    let moveup= c==c1&&r1==r-1;
    let movedown= c==c1&&r1==r+1;

    let ajc=moveleft||moveright||moveup||movedown

    if(ajc)
   {
    let curimg=curtile.src;
    let othimg=othtile.src;
    curtile.src=othimg;
    othtile.src=curimg;
    turns++;
    document.querySelector("#turns").innerText=turns;
   }
}

