class Board {
  constructor() {
    this.createBoard();
  }

  createBoard() {
    let row1 = Array.from({ length: 8 }, (item, index) => [0, index]);
    let row2 = Array.from({ length: 8 }, (item, index) => [1, index]);
    let row3 = Array.from({ length: 8 }, (item, index) => [2, index]);
    let row4 = Array.from({ length: 8 }, (item, index) => [3, index]);
    let row5 = Array.from({ length: 8 }, (item, index) => [4, index]);
    let row6 = Array.from({ length: 8 }, (item, index) => [5, index]);
    let row7 = Array.from({ length: 8 }, (item, index) => [6, index]);
    let row8 = Array.from({ length: 8 }, (item, index) => [7, index]);
    this.array = [
      ...row1,
      ...row2,
      ...row3,
      ...row4,
      ...row5,
      ...row6,
      ...row7,
      ...row8,
    ];
  }
}
class Knight {
  constructor() {
    this.position = [0, 1];
  }
  compare(a,b){
    if(a[0]===b[0]&&a[1]===b[1]){
        return true;
    }
    else return false;
  }

  knightMoves(start=this.position,end){
      console.log('Start',start,'end: ',end,);
    if(this.compare(start,end)){
      console.log('**********************************************************************')
        return 'FOUNDIT';
      }
      
      let adjacencyList=this.createAdjacencyList();
      console.log(adjacencyList);
      let q=[];
      let arr=[];

       //add first adjascent
      q.push(adjacencyList[0]);

      while(q.length!==0&&adjacencyList.length>1){
        let node = q.shift();
        let targs=node.adjacents;
        // targs.forEach(targ=>{
        //   if(targ===end){
        //     console.log(targ,' found in ',node)
        //     return targ;
        //   }
        
        // })
        if(targs.length){
          q.push(adjacencyList[0]);
        }
        
      }
      
      console.log(targs);
      
      
    }
        
          

   
       
    
   
   
  createAdjacencyList(){
    let board= new Board();
    let adjacencyList=[];
    board.array.forEach(square=>{
      let adjacents=this.getTargets(square);
      adjacencyList.push({name:square.toString(),adjacents:adjacents});
    })
    return adjacencyList;
  }
  
  getTargets(pos) {
    let posX = pos[0];
    let posY = pos[1];
    let targets = [];
    let target1 = [posX + 1, posY + 2];
    let target2 = [posX + 2, posY + 1];
    let target3 = [posX + 2, posY - 1];
    let target4 = [posX + 1, posY - 2];
    let target5 = [posX - 1, posY - 2];
    let target6 = [posX - 2, posY - 1];
    let target7 = [posX - 2, posY + 1];
    let target8 = [posX - 1, posY + 2];
    targets.push(
      target1,
      target2,
      target3,
      target4,
      target5,
      target6,
      target7,
      target8
    );
    targets=this.removeOffBoardTarget(targets);
    return targets;
  }
  removeOffBoardTarget(targs,boardSquares= new Board().array){
    let onBoardTargs=[]
    if(targs.flat().length>2){
        targs.forEach(item=>{
           
           boardSquares.forEach(square=>{
            if(item[0]==square[0]&&item[1]==square[1]){
                // console.log(item,"Valid target")
                onBoardTargs.push(item);
            }
           });
            
        });
    }

    else{
        onBoardTargs===0;
        let x=targs[0];
        let y=targs[1];
        boardSquares.forEach(square=>{
            if(square[0]===x&&square[1]===y)
            {
                // console.log(targs,'Is on board',square)
                onBoardTargs=targs;
            }

        })

    }

    return onBoardTargs;
    }
}
  

let board = new Board();
let knight = new Knight();
console.log(knight.knightMoves([0,0],[7,2]));


