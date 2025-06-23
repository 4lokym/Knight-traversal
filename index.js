const chessboard = [];
for (let y = 0; y < 8; y++) {
  chessboard.push([]);
  for (let x = 0; x < 8; x++) {
    chessboard[y].push([y, x]);
  }
}

const validCoord = function checkIfaCoordinateIsValid([starty, startx]) {
  if (
    starty > chessboard.length - 1 ||
    starty < 0 ||
    startx > chessboard[0].length ||
    startx < 0
  ) {
    return false;
  }
  return true;
};

const knightAdjacent = function allPossibleMoves([starty, startx]) {
  if (startx === undefined || starty === undefined) {
    throw new Error("No valid cordinates assigned");
  }
  if (!validCoord([starty, startx])) {
    return null;
  }

  const moves = [];
  const longStep = [2, -2];
  const shortStep = [1, -1];

  for (let i = 0; i < longStep.length; i++) {
    for (let j = 0; j < shortStep.length; j++) {
      let newX = startx + longStep[i];
      let newY = starty + shortStep[j];
      if (validCoord([newY, newX], chessboard)) {
        moves.push([newY, newX]);
      }

      newX = startx + shortStep[i];
      newY = starty + longStep[j];
      if (validCoord([newY, newX], chessboard)) {
        moves.push([newY, newX]);
      }
    }
  }

  return moves;
};

const shortestPathTo = function breadthFirstTypeShortestPathSearch(
  [startY, startX],
  [endY, endX],
) {
  const q = [];

  q.push({ prev: null, pos: [startY, startX] });

  let lastNode = null;
  const path = [];

  for (let i = 0; i < 10000; i++) {
    let top = q.shift();
    let [topy, topx] = top.pos;

    if (topy === endY && topx === endX) {
      lastNode = top;
      break;
    }
    let moves = knightAdjacent([topy, topx]);

    moves.forEach(([y, x]) => {
      q.push({ prev: top, pos: [y, x] });
    });
  }
  while (lastNode) {
    path.unshift(lastNode.pos);
    lastNode = lastNode.prev;
  }

  return path;
};

console.log(knightAdjacent([3, 3], chessboard));
console.log(shortestPathTo([0, 0], [7, 7]));
