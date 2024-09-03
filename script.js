const gameBoard = document.querySelector("#gameBoard");
const player = document.querySelector("#player");
const infoDisplay = document.querySelector("#infoBox");
const width = 8;
let playerTurn = 'black';
player.textContent = 'Black';
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];
function createBoard(){
    startPieces.forEach((startPiece, i)=>{
        const square = document.createElement('div');
        square.classList.add("square");
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable',true);
        square.setAttribute("square-id",i);
        // square.classList.add("beige");
        const row = Math.floor((63-i)/8)+1;
        if(row%2===0)
        {
            square.classList.add(i%2==0?'beige':'brown');
        }
        else{
            square.classList.add(i%2==0?'brown':'beige');
        }
        if(i<=15)
        {
            square.firstChild.firstChild.classList.add('black');
        }
        if(i>=48)
        {
            square.firstChild.firstChild.classList.add('white');
        }
        gameBoard.append(square);
    })
}
createBoard();


const allSquares = document.querySelectorAll(".square");
allSquares.forEach(square=>{
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
})

let startPositionId;
let draggedElement;

function dragStart(e){
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}
function dragOver(e){
    e.preventDefault();
    // console.log(e.target);
}
function dragDrop(e)
{
    e.stopPropagation();
    const taken = e.target.classList.contains('piece');
    const correctTurn = draggedElement.firstChild.classList.contains(playerTurn);
    const opponentTurn = playerTurn==="white"?"black":"white";
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn);
    const valid = checkIfValid(e.target);
    if(correctTurn)
    {
        if(takenByOpponent && valid)
        {
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            return;
        }
        if(taken && !takenByOpponent)
        {
            infoDisplay.textContent = "Invalid Move";
            setTimeout(()=>infoDisplay.textContent="",2000);
            return;
        }
        if(valid)
        {
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            return;
        }
    }
}
function checkIfValid(target)
{
    const targetId = Number(target.getAttribute('square-id'))||Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    switch(piece){
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15,16,17];
            if(
                starterRow.includes(startId) && startId + width*2 === targetId || 
                startId+width === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
                startId+width+1 ===targetId && document.querySelector(`[square-id="${startId+width+1}"]`).firstChild ||
                startId+width-1 ===targetId && document.querySelector(`[square-id="${startId+width-1}"]`).firstChild
            )
            {
                return true;
            }
            // else{
            //     infoDisplay.textContent = "Invalid Move";
            //     setTimeout(()=>infoDisplay.textContent="",2000);
            //     return;
            // }
            break;
        case 'knight':
            if(
                startId+(width*2)+1==targetId ||
                startId+(width*2)-1==targetId ||
                startId+width+2 == targetId ||
                startId+width-2==targetId ||
                startId-(width*2)+1==targetId ||
                startId-(width*2)-1==targetId ||
                startId-width+2 == targetId ||
                startId-width-2==targetId 
                // startId+(width*2)+1 == targetId && document.querySelector(`[square-id="${startId+(width*2)+1}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'bishop':
            if(
                startId+width+1==targetId ||
                startId+width*2+2===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
                startId+width*3+3===targetId && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
                startId+width*4+4===targetId && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
                startId+width*5+5===targetId && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                startId+width*6+6===targetId && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild||
                startId+width*7+7===targetId && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild||

                startId+width-1==targetId ||
                startId+width*2-2===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
                startId+width*3-3===targetId && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
                startId+width*4-4===targetId && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
                startId+width*5-5===targetId && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                startId+width*6-6===targetId && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild||
                startId+width*7-7===targetId && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild||

                startId-width+1==targetId ||
                startId-width*2+2===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
                startId-width*3+3===targetId && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
                startId-width*4+4===targetId && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
                startId-width*5+5===targetId && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                startId-width*6+6===targetId && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild||
                startId-width*7+7===targetId && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild||

                startId-width-1==targetId ||
                startId-width*2-2===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
                startId-width*3-3===targetId && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                startId-width*4-4===targetId && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
                startId-width*5-5===targetId && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                startId-width*6-6===targetId && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild||
                startId-width*7-7===targetId && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'rook':
            if(
                startId+width==targetId ||
                startId+width*2==targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                startId+width*3==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild ||
                startId+width*4==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                startId+width*5==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild||
                startId+width*6==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*5}"]`).firstChild||
                startId+width*7==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*5}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*6}"]`).firstChild||

                startId-width==targetId ||
                startId-width*2==targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                startId-width*3==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild ||
                startId-width*4==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                startId-width*5==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild||
                startId-width*6==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*5}"]`).firstChild||
                startId-width*7==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*5}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*6}"]`).firstChild||

                startId+1==targetId ||
                startId+2==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+3==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+4==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                startId+5==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild||
                startId+6==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+5}"]`).firstChild||
                startId+7==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+5}"]`).firstChild&&!document.querySelector(`[square-id="${startId+6}"]`).firstChild||

                startId-1==targetId ||
                startId-2==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-3==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-4==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                startId-5==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild||
                startId-6==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-5}"]`).firstChild||
                startId-7==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-5}"]`).firstChild&&!document.querySelector(`[square-id="${startId-6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'queen':
            if(
                startId+width+1==targetId ||
                startId+width*2+2===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
                startId+width*3+3===targetId && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
                startId+width*4+4===targetId && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
                startId+width*5+5===targetId && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                startId+width*6+6===targetId && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild||
                startId+width*7+7===targetId && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild||

                startId+width-1==targetId ||
                startId+width*2-2===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
                startId+width*3-3===targetId && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
                startId+width*4-4===targetId && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
                startId+width*5-5===targetId && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                startId+width*6-6===targetId && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild||
                startId+width*7-7===targetId && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild||

                startId-width+1==targetId ||
                startId-width*2+2===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
                startId-width*3+3===targetId && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
                startId-width*4+4===targetId && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
                startId-width*5+5===targetId && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                startId-width*6+6===targetId && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild||
                startId-width*7+7===targetId && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild||

                startId-width-1==targetId ||
                startId-width*2-2===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
                startId-width*3-3===targetId && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                startId-width*4-4===targetId && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
                startId-width*5-5===targetId && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                startId-width*6-6===targetId && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild||
                startId-width*7-7===targetId && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild ||

                startId+width==targetId ||
                startId+width*2==targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                startId+width*3==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild ||
                startId+width*4==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                startId+width*5==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild||
                startId+width*6==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*5}"]`).firstChild||
                startId+width*7==targetId && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*5}"]`).firstChild&&!document.querySelector(`[square-id="${startId+width*6}"]`).firstChild||

                startId-width==targetId ||
                startId-width*2==targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                startId-width*3==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild ||
                startId-width*4==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                startId-width*5==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild||
                startId-width*6==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*5}"]`).firstChild||
                startId-width*7==targetId && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*5}"]`).firstChild&&!document.querySelector(`[square-id="${startId-width*6}"]`).firstChild||

                startId+1==targetId ||
                startId+2==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+3==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+4==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                startId+5==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild||
                startId+6==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+5}"]`).firstChild||
                startId+7==targetId && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild&&!document.querySelector(`[square-id="${startId+5}"]`).firstChild&&!document.querySelector(`[square-id="${startId+6}"]`).firstChild||

                startId-1==targetId ||
                startId-2==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-3==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-4==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                startId-5==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild||
                startId-6==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-5}"]`).firstChild||
                startId-7==targetId && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild&&!document.querySelector(`[square-id="${startId-5}"]`).firstChild&&!document.querySelector(`[square-id="${startId-6}"]`).firstChild
            )
            {
                return true;
            }
            break;
        case 'king':
            if(
                startId+1===targetId ||
                startId-1===targetId ||
                startId+width===targetId ||
                startId-width===targetId ||
                startId+width+1===targetId ||
                startId-width+1===targetId ||
                startId+width-1===targetId ||
                startId-width-1===targetId 
            )
            {
                return true;
            }
    }
}
function changePlayer(){
    if(playerTurn == "black")
    {
        playerTurn = "white";
        player.textContent = "White";
        reverseIds();
    }
    else{
        playerTurn = "black";
        player.textContent = "Black";
        revertIds();
    }
}
function reverseIds(){
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square,i)=>{
        square.setAttribute('square-id',((width*width)+1)-i);
    })
}
function revertIds(){
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square,i)=>{
        square.setAttribute('square-id',i);
    })
}
function checkForWin(){
    const kings = Array.from(document.querySelectorAll('#king'));
    if(!kings.some(king=> king.firstChild.classList.contains('white'))){
        infoDisplay.textContent = 'Black Wins';
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square=>{
            square.firstChild?.setAttribute('draggable',false);
        });
    }
    if(!kings.some(king=> king.firstChild.classList.contains('black'))){
        infoDisplay.textContent = 'White Wins';
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square=>{
            square.firstChild?.setAttribute('draggable',false);
        });
    }
}
