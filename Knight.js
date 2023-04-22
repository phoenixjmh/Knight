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
      console.log(this.findPaths(start,end,end));

      // pathLayerOne.forEach(node=>console.log(node.name))
      let adjacencyList=this.createAdjacencyList();
      console.log(adjacencyList);
    
      // let q=[];
      
      // //add first adjascent
      // q.push(adjacencyList[0]);
      // let array=[];
      // while(q.length!==0&&adjacencyList.length>0){
        
        
      //   let node = q.shift();
        
      //   let targs=node.adjacents;
      //   targs.forEach(targ=>{
      //     if(this.compare(targ,end)){
      //       console.log(targ,' found in ',node)
      //       array.push(node);
      //     }
      //   })
      //   if(targs.length){
      //     q.push(adjacencyList.shift());
      //   }
        
      // }
      
      // console.log('Finished');
      // return array;
    }
        
          
    findPaths(start,end,originalEnd,arr=[],iteratedList=this.createAdjacencyList()){
      console.log('Start:',start,'End:',end);
      if(this.compare(start,end))
     {
      console.log('got there');
      return arr;}

    let finished=[];
      let q=[];
      
      //add first adjascent
      q.push(iteratedList[0]);
      while(q.length!==0&&iteratedList.length>0){
        
        let node = q.shift();
        console.log(node,'Node   :');
        
        let targs=node.adjacents;
        targs.forEach(targ=>{
          if(this.compare(targ,end)){
            console.log(targ,' found in ',node)
            this.findPaths(start,node.name,arr);
          }
        })
        
        if(targs.length){
          q.push(iteratedList.shift());
        }
        
      }
      
      console.log('left the while loop');
      arr.forEach(node=>{
        return [finished].concat(this.findPaths(start,arr.shift().name,originalEnd,arr,iteratedList=this.createAdjacencyList()));
      })
    }
   
       
    
   
   
  createAdjacencyList(arr){
    if(arr){
      let adjacencyList=[];
      arr.forEach(node=>{
      let adjacents=this.getTargets(node);
      adjacencyList.push({name:node,adjacents:adjacents});
    })


    return adjacencyList;
      }
    
    let board= new Board();
    let adjacencyList=[];
    board.array.forEach(square=>{
      let adjacents=this.getTargets(square);
      adjacencyList.push({name:square,adjacents:adjacents});
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


