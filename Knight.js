class Board {
  constructor() {
    this.createBoard();
  }

  createBoard() {
    let row1 = Array.from({ length: 8 },
      (item, index) => `0${index}`);
    let row2 = Array.from({ length: 8 },
      (item, index) => `1${index}`);
    let row3 = Array.from({ length: 8 },
      (item, index) => `2${index}`);
    let row4 = Array.from({ length: 8 },
      (item, index) => `3${index}`);
    let row5 = Array.from({ length: 8 },
      (item, index) => `4${index}`);
    let row6 = Array.from({ length: 8 },
      (item, index) => `5${index}`);
    let row7 = Array.from({ length: 8 },
      (item, index) => `6${index}`);
    let row8 = Array.from({ length: 8 },
      (item, index) => `7${index}`);
    this.array = [
      ...row1, ...row2, ...row3, ...row4,
      ...row5, ...row6, ...row7, ...row8,
    ];
  }
  generateNodes() {
    let nodesList = [];
    let board = new Board().array;
    for (let square of board) {

      nodesList.push(new Node(square));
    }
    return nodesList;
  }
}
class Node {
  constructor(value, adjacents) {
    this.value = value;
    this.adjacents = [];
  }
  connect(node) {
    this.adjacents.push(node);
  }
}


class Knight {

  knightMoves(start, end) {
    start = start.toString().replace(',', '');
    end = end.toString().replace(',', '');


    let board = new Board();
    let nodesList = board.generateNodes();
    console.log(nodesList);
    this.createAdjacencyList(nodesList);
    console.log(nodesList);
    let nodeStart, nodeEnd;
    nodesList.forEach(node => {
      if (node.value == start)
        nodeStart = node;
      if (node.value === end)
        nodeEnd = node;


    })
    if (!nodeStart || !nodeEnd) {

      return "Not on board";
    }


    return this.getPath(nodeStart, nodeEnd)
  }

  reconstructPath(startNode, endNode, visitedNodes) {
    let currNode = endNode;
    let shortestPath = [];
    while (currNode !== null) {
      shortestPath.push(currNode);
      currNode = visitedNodes[currNode.value];
    }
    let finishString = 'start =>';
    shortestPath = shortestPath.reverse();
    shortestPath.forEach(move => {
      finishString += 
      ` [ ${Array.from(move.value, Number)} ]=> `
    })
    return finishString;
  }

  getPath(start, end) {

    let q = [start];
    let visited = {};
    visited[start.value] = null;

    while (q.length !== 0) {
      let node = q.shift()
      if (node.value === end.value) {
        console.log('FOUND IT');
        return this.reconstructPath(start, end, visited);
      }
      let adj = node.adjacents;

      adj.forEach(adjacency => {
        if (!visited.hasOwnProperty(adjacency.value)) {
          visited[adjacency.value] = node;
          q.push(adjacency);

        }
      })
    }
    console.log(visited);
    return;

  }

  createAdjacencyList(nodesList) {
    nodesList.forEach(node => {
      this.getTargets(node.value, nodesList, node);
    })

  }

  getTargets(pos, nodesList, currNode) {
    let newPos = Array.from(pos, Number);
    let posX = newPos[0];
    let posY = newPos[1];
    let targets = [];


    let target1 =`${(posX + 1)}${(posY + 2)}`;
    let target2 =`${(posX + 2)}${(posY + 1)}`;
    let target3 =`${(posX + 2)}${(posY - 1)}`;
    let target4 =`${(posX + 1)}${(posY - 2)}`;
    let target5 =`${(posX - 1)}${(posY - 2)}`;
    let target6 =`${(posX - 2)}${(posY - 1)}`;
    let target7 =`${(posX - 2)}${(posY + 1)}`;
    let target8 =`${(posX - 1)}${(posY + 2)}`;
    targets.push(target1, target2, target3, target4,
                 target5, target6, target7, target8);

    targets.forEach(target => {
      nodesList.forEach(node => {
        if (node.value === target) {
          currNode.connect(node);
        }
      })
    });

  }

}


let knight = new Knight();

console.log(knight.knightMoves([0, 0], [0,1]));


