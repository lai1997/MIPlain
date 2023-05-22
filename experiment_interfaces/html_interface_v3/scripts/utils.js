var minimaxTable = canonicalData,
    boardRepreToCanonical = canonicalMap;


function win(board, player) {
    if (board[0] === board[1] && board[1] === board[5] && board[5] === player) {
        return true;
    } else if (board[0] === board[3] && board[3] === board[7] && board[7] === player) {
        return true;
    } else if (board[1] === board[2] && board[2] === board[3] && board[3] === player) {
        return true;
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] === player) {
        return true;
    } else if (board[7] === board[6] && board[6] === board[5] && board[5] === player) {
        return true;
    } else if (board[7] === board[8] && board[8] === board[1] && board[1] === player) {
        return true;
    } else if (board[8] === board[0] && board[0] === board[4] && board[4] === player) {
        return true;
    } else if (board[2] === board[0] && board[0] === board[6] && board[6] === player) {
        return true;
    }
    return false
}

function winLine(board, player) {
    if (board[0] === board[1] && board[1] === board[5] && board[5] === player) {
        return [0,1,5];
    } else if (board[0] === board[3] && board[3] === board[7] && board[7] === player) {
        return [0,3,7];
    } else if (board[1] === board[2] && board[2] === board[3] && board[3] === player) {
        return [1,2,3];
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] === player) {
        return [3,4,5];
    } else if (board[7] === board[6] && board[6] === board[5] && board[5] === player) {
        return [5,6,7];
    } else if (board[7] === board[8] && board[8] === board[1] && board[1] === player) {
        return [1,7,8];
    } else if (board[8] === board[0] && board[0] === board[4] && board[4] === player) {
        return [0,4,8];
    } else if (board[2] === board[0] && board[0] === board[6] && board[6] === player) {
        return [0,2,6];
    }
    return [];
}


function parsePrologVar(sub){
    return inverseLabelsOnBoard(sub.toString().split('(')[2].split(')')[0].split(', '));
}


function composeStrategyState(board){
    var numMove = board.filter(x => x === 0).length;
    var toPlay = numMove % 2 === 1 ? 'x' : 'o';
        outcome = '_';
    return 's('
            + toPlay
            + ',' + outcome
            + ',b(' + changeLabelsOnBoard(board).join(',')
            + '))';
}


/*
    Change number labels to o / x labels on a board and switch positioning of cells.
*/
function changeLabelsOnBoard(board) {
    var newBoard = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        keys = ['e', 'x', 'o'];
    newBoard[4] = keys[board[0]];
    newBoard[0] = keys[board[1]];
    newBoard[1] = keys[board[2]];
    newBoard[2] = keys[board[3]];
    newBoard[5] = keys[board[4]];
    newBoard[7] = keys[board[6]];
    newBoard[8] = keys[board[5]];
    newBoard[6] = keys[board[7]];
    newBoard[3] = keys[board[8]];
    return newBoard;
}

/*
    Inverse o / x labels to number labels on a board and switch positioning of cells.
*/
function inverseLabelsOnBoard(board) {
    var rightOrder = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        newBoard = [];
    rightOrder[0] = board[4];
    rightOrder[1] = board[0];
    rightOrder[2] = board[1];
    rightOrder[3] = board[2];
    rightOrder[4] = board[5];
    rightOrder[6] = board[7];
    rightOrder[5] = board[8];
    rightOrder[7] = board[6];
    rightOrder[8] = board[3];
    rightOrder.map(function(x) {
                        if (x === 'x') {
                            newBoard.push(1);
                        } else if (x === 'o') {
                            newBoard.push(2);
                        } else {
                            newBoard.push(0);
                        }});
    return newBoard;
}

function boardRepreToBoardRotated(boardRepre) {
    return boardRepre.split('').map(Number);
}

// Rotating indexing to row based indexing
function changeIndex(pos) {
    var rightInd = [4,0,1,2,5,8,7,6,3];
    return rightInd[pos];
}

function createButton(buttonId, parentId, text, func) {
    var button = document.getElementById(buttonId);

    if (button == null) {
        button = document.createElement('Button');
        document.getElementById(parentId).appendChild(button);
    }

    button.type = 'button';
    button.style.width = '80px';
    button.style.height = '35px';
    button.id = buttonId;
    button.textContent = text;
    button.onclick = func;
}

function createImage(imageId, parentId, text, src) {
    var img = document.getElementById(imageId);

    if (img == null) {
        img = document.createElement('IMG');
        document.getElementById(parentId).appendChild(img);
    }

    img.type = 'img';
    img.style.width = '45px';
    img.style.height = '45px';
    img.style.border = "5px solid white";
    img.src = src;
}

function removeChild(childId, parentId) {
    var child = document.getElementById(childId);
    if (child != null && child.parentElement.id == parentId){
       document.getElementById(parentId).removeChild(child);
    }
}


function convertSymbolToID(symbol) {
    if (symbol === EMPTY) {
        return 0;
    } else {
        return symbol === 'X' ? 1 : 2;
    }
}


function convertIDToSymbol(ID) {
    if (ID === 0) {
        return EMPTY;
    } else {
        return ID === 1 ? 'X' : 'O';
    }
}

function convertBoxesTOBoard(boxes){
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  board[0] = convertSymbolToID(boxes[4].innerHTML);
  board[1] = convertSymbolToID(boxes[0].innerHTML);
  board[2] = convertSymbolToID(boxes[1].innerHTML);
  board[3] = convertSymbolToID(boxes[2].innerHTML);
  board[4] = convertSymbolToID(boxes[5].innerHTML);
  board[5] = convertSymbolToID(boxes[8].innerHTML);
  board[6] = convertSymbolToID(boxes[7].innerHTML);
  board[7] = convertSymbolToID(boxes[6].innerHTML);
  board[8] = convertSymbolToID(boxes[3].innerHTML);
  return board;
}

function convertBoardToBoxes(board, boxes){
  boxes[4].innerHTML = convertIDToSymbol(board[0]);
  boxes[0].innerHTML = convertIDToSymbol(board[1]);
  boxes[1].innerHTML = convertIDToSymbol(board[2]);
  boxes[2].innerHTML = convertIDToSymbol(board[3]);
  boxes[5].innerHTML = convertIDToSymbol(board[4]);
  boxes[7].innerHTML = convertIDToSymbol(board[6]);
  boxes[8].innerHTML = convertIDToSymbol(board[5]);
  boxes[6].innerHTML = convertIDToSymbol(board[7]);
  boxes[3].innerHTML = convertIDToSymbol(board[8]);
}

/**
 * Check if a win or not, given rotated board and player
 */
function win(board, player) {
    if (board[0] === board[1] && board[1] === board[5] && board[5] === player) {
        return true
    } else if (board[0] === board[3] && board[3] === board[7] && board[7] === player) {
        return true
    } else if (board[1] === board[2] && board[2] === board[3] && board[3] === player) {
        return true
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] === player) {
        return true
    } else if (board[7] === board[6] && board[6] === board[5] && board[5] === player) {
        return true
    } else if (board[7] === board[8] && board[8] === board[1] && board[1] === player) {
        return true
    } else if (board[8] === board[0] && board[0] === board[4] && board[4] === player) {
        return true
    } else if (board[2] === board[0] && board[0] === board[6] && board[6] === player) {
        return true
    }
    return false
}

/**
 *  Find (AI / player) 's optimal board state.
 */
function computeNextMove(board, player){
    var canonicalRepre = boardRepreToCanonical[board.join('')];
    var entry = minimaxTable[canonicalRepre];
    var bestOutcomeScore = player == 1 ? Math.max(...entry[1]) : Math.min(...entry[1]);
    var opponent = player == 1 ? 2 : 1;

    var optimalMoves = entry[0].filter(function(move, i){
        return entry[1][i] === bestOutcomeScore;
    });

    var optimalRepre = canonicalRepre.split('').map(Number);
    optimalRepre[optimalMoves[0]] = player;
    optimalRepre = optimalRepre.join('');

    var score = 0;

    for (var i = 0; i < optimalMoves.length; i++) {

        var optimalMove = optimalMoves[i];
        var canonicalNextBoard = canonicalRepre.split('').map(Number);
        var copyBoard = [...canonicalNextBoard];
        copyBoard[optimalMove] = opponent;
        canonicalNextBoard[optimalMove] = player;
        var canonicalNextRepre = canonicalNextBoard.join('');

        if (win(copyBoard, opponent)) {
            optimalRepre = canonicalNextRepre;
            break;
        }

        var scores = minimaxTable[boardRepreToCanonical[canonicalNextRepre]][1];

        if (player == 1 && score < Math.min(...scores)) {
            score = Math.min(...scores);
            optimalRepre = canonicalNextRepre;
        } else if (player == 2 && score > Math.max(...scores)){
            score = Math.max(...scores);
            optimalRepre = canonicalNextRepre;
        }
    }
    return board.map(function(_, i){
                        var copyBoard = board.slice();
                        copyBoard[i] = copyBoard[i] === 0  ?  player : copyBoard[i];
                        return copyBoard.join('');})
                        .filter(repre => boardRepreToCanonical[repre] === boardRepreToCanonical[optimalRepre])[0]
                        .split('')
                        .map(Number);
}


/*
    Query minimax table to check score of a player's move (from previous board to current board)
*/
function getMiniMaxScore(prevBoard, currentBoard, player) {
    var canonicalPrevBoardRepre = boardRepreToCanonical[prevBoard.join('')];
    var canonicalPrevBoard = canonicalPrevBoardRepre.split('').map(Number);
    var canonicalMove = canonicalPrevBoard.map(function(_, i){
                        var copyBoard = canonicalPrevBoard.slice();
                        copyBoard[i] = copyBoard[i] === 0  ?  player : copyBoard[i];
                        return boardRepreToCanonical[copyBoard.join('')] === boardRepreToCanonical[currentBoard.join('')] ? i : -1;})
                        .filter(x => x >= 0)[0];
    var canonicalMoveInd = minimaxTable[canonicalPrevBoardRepre][0].findIndex(move => move === canonicalMove);
    return minimaxTable[canonicalPrevBoardRepre][1][canonicalMoveInd];
}

function wrapTime(time) {

    if (time === 0) {
        return '00';
    } else if (time < 10) {
        time = '0' + time;
    }

    return time;
}

function shuffle(array) {
    return array.sort(()=> Math.random() - 0.5);
}

function computeBoardDifficulty(board) {
    return Math.round(((board.filter(x => x == 0).length) / (minimaxTable[boardRepreToCanonical[board.join('')]][1]
                          .filter(x => x == 10)
                          .length)) * 100) / 100;
}

function sortTestBoardsAscend(a,b){
    return computeBoardDifficulty(boardRepreToBoardRotated(a)) - computeBoardDifficulty(boardRepreToBoardRotated(b));
}


function findPosStrongOption(board, player) {
    var p = [];
    var v = player == 1 ? 2 : 6;
    var newBoard = [...board].map(x=> x == 2 ? 3 : x);

    if ((newBoard[0] + newBoard[1] + newBoard[5]) == v) {
        p = p.concat([0,1,5]);
    }
    if ((newBoard[0] + newBoard[3] + newBoard[7]) == v) {
        p = p.concat([0,3,7]);
    }
    if ((newBoard[1] + newBoard[2] + newBoard[3]) == v) {
        p = p.concat([1,2,3]);
    }
    if ((newBoard[3] + newBoard[4] + newBoard[5]) == v) {
        p = p.concat([3,4,5]);
    }
    if ((newBoard[5] + newBoard[6] + newBoard[7]) == v) {
        p = p.concat([5,6,7]);
    }
    if ((newBoard[1] + newBoard[7] + newBoard[8]) == v) {
        p = p.concat([1,7,8]);
    }
    if ((newBoard[0] + newBoard[4] + newBoard[8]) == v) {
        p = p.concat([0,4,8]);
    }
    if ((newBoard[0] + newBoard[2] + newBoard[6]) == v) {
        p = p.concat([0,2,6]);
    }
    return [...new Set(p)];
}

function formattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var hours = today.getHours();
    var minutes = today.getMinutes();

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = dd + '_' + mm + '_' + yyyy + '-' + hours + '_' + minutes;
    return today;
}