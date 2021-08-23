$(document).ready(() => {
    const $board = $("#board");
    let game = new Game(4);
    updateBoardView($board, game);

    game.onMove(() => $());
    $("#reset-button").on("click", () => {
      game.setupNewGame();
      updateBoardView($board, game);
      $("#winText").addClass("hidden");
      $("#lostText").addClass("hidden");
  
      $("#winLoseDiv").addClass("hidden");
    });

    game.onWin(() => {
      $("#winText").removeClass("hidden");
      $("#winLoseDiv").removeClass("hidden");
    });

    game.onLose(() => {
      $("#loseText").removeClass("hidden");
      $("#winLoseDiv").removeClass("hidden");
      loserBoardView($board, game);
    });  

    $(document).keydown(function(e) {
      switch (e.keyCode) {
        case 65:
        case 37:
          game.move("left");
          break;
        case 87:
        case 38:
          game.move("up");
  
          break;
        case 68:
        case 39:
          game.move("right");
  
          break;
        case 83:
        case 40:  
          game.move("down");
          break;
      }
      updateBoardView($board, game);
    });
  });
  
  let updateBoardView = ($board, game) => {
    $board.empty();
    let $board_table = $("<table></table>");
    let index = 0;
    for (let y = 0; y < 4; y++) {
      let row = $("<tr></tr>");
      for (let x = 0; x < 4; x++) {
        let spot = game.gameState.board[index];
  
        let spot_div = $(`<div class='spot value${spot}'></div>`);
        index++;
        spot_div.append(`<h1>${spot != 0 ? spot : ""} </h1`);
        row.append($("<td></td>").append(spot_div));
      }
      $board_table.append(row);
    }
    $board.append($board_table);
    $("#score").text(`Score: ${game.gameState.score} `);
  };
  
  let loserBoardView = ($board, game) => {
    $board.empty();
    let $board_table = $("<table></table>");
    let index = 0;
    for (let y = 0; y < 4; y++) {
      let row = $("<tr></tr>");
      for (let x = 0; x < 4; x++) {
        let spot = game.gameState.board[index];
  
        let spot_div = $(`<div class='spot loserSpot'></div>`);
        index++;
        spot_div.append(`<h1>${spot != 0 ? spot : ""} </h1`);
        row.append($("<td></td>").append(spot_div));
      }
      $board_table.append(row);
    }
    $board.append($board_table);
    
  };

  class Game {
    constructor(dimensions) {
      this.dimensions = dimensions;
      this.callOnMove = [];
      this.callOnWin = [];
      this.callOnLose = [];
      this.checkAvail = false;
      this.gameState = {
        board: new Array(dimensions * dimensions).fill(0),
        score: 0,
        won: false,
        over: false
      };
  
    this.setupNewGame();
    }
    toString() {
      let s = "";
      for (let i = 0; i < this.gameState.board.length; i++) {
        if (i % this.dimensions == 0) {
          s += "\n";
        }
        s += this.gameState.board[i] + " ";
      }
      s += "\n\n";
      s += "Score: " + this.gameState.score + "\n";
      s += "Won: " + this.gameState.won + "\n";
      s += "Over: " + this.gameState.over + "\n";
  
      return s;
    }
    setupNewGame() {
      this.tiles = this.newArr(this.dimensions, this.dimensions, null);
      this.gameState = {
        board: new Array(this.dimensions * this.dimensions).fill(0),
        score: 0,
        won: false,
        over: false
      };
      this.newNum();
      this.newNum();
      this.update();
    }
    loadGame(gameState) {
      this.gameState = gameState;
    }
    move(direction) {
      
      this.tiles = this.createArr(this.dimensions,this.dimensions,null);
      if(this.gameState.over){
        return false
      }

      let initial, yIn, xIn;
      switch (direction) {
        case "up":
          initial = 0;
          yIn = -1;
          xIn = 0;
          break;
        case "down":
          initial = this.dimensions*this.dimensions;
          initial--;
          yIn = 1;
          xIn = 0;
          break;
        case "left":
          initial = 0;
          yIn = 0;
          xIn = -1;
          break;
        case "right":
          initial = this.dimensions * this.dimensions;
          initial--;
          yIn = 0;
          xIn = 1;
          break;
      }
      let moved = false;
      for (let i = 0; i < this.dimensions * this.dimensions; i++) {
        let x = Math.abs(initial - i);
  
        let r = Math.floor(x / this.dimensions);
        let l = x % this.dimensions;
  
        if (this.tiles[r][l] === null) {
          continue;
        }
  
        let nextR = r + yIn;
        let nextL = l + xIn;
  
        while (nextR >= 0 && nextR < this.dimensions &&
          nextL >= 0 && nextL < this.dimensions) {

          let next = this.tiles[nextR][nextL];
          let cur = this.tiles[r][l];
          if (next === null) {
            if (this.checkAvail) {
              return true;
            }
            this.tiles[nextR][nextL] = cur;
            this.tiles[r][l] = null;
            r = nextR;
            l = nextL;
            nextR += yIn;
            nextL += xIn;
            moved = true;
          } else if (next.canMerge(cur)) {
            if (this.checkAvail) {
              return true;
            }
            let value = next.merge(cur);
            this.gameState.score += value;
            this.tiles[r][l] = null;
            moved = true;
            break;
          } else {
            break;
          }
        }
      }
      if (moved) {
        this.newNum();
        this.update();
        if(this.callOnMove.length > 0){
        this.callOnMove.forEach(x=>x(this.gameState));
      }}
  
      this.clear();
      return moved;
    }

    onMove(callback) {
      this.callOnMove.push(callback);
    }

    onWin(callback) {
      this.callOnWin.push(callback);
    }

    onLose(callback) {
      this.callOnLose.push(callback);
    }

    getGameState() {
      return this.gameState;
    }
  
    clear() {
      for (let i = 0; i < this.tiles.length; i++) {
        for (let j = 0; j < this.tiles[i].length; j++) {
          if (this.tiles[i][j] != null) {
            this.tiles[i][j].setMerged(false);
          }
        }
      }
    }
  
    newNum() {
      let pos = Math.floor(Math.random() * this.dimensions * this.dimensions);
      let col, row;
      do {
        pos = (pos + 1) % (this.dimensions * this.dimensions);
        row = Math.floor(pos / this.dimensions);
        col = pos % this.dimensions;
      } while (this.tiles[row][col] != null);
      let value = Math.random() < 0.9 ? 2 : 4;
      this.tiles[row][col] = new Tile(value);
    }
  
    newArr(width, height, value){
      var arr = [];
      for (let i = 0; i < height; i++) {
        arr[i] = [];
        for (let j = 0; j < width; j++) {
            arr[i][j] = value;
        }
      }
      return arr;
    }
    
    createArr(width, height, value) {
      let index = 0;
      var arr = [];
      for (let i = 0; i < height; i++) {
        arr[i] = [];
        for (let j = 0; j < width; j++) {
          if(this.gameState.board[index]==0){
            arr[i][j] = value;
          }else{
          arr[i][j] = new Tile(this.gameState.board[index]);
          }
          index++;
        }
      }
      return arr;
    }

    update() {
      let arr = [].concat.apply([],this.tiles);
      this.gameState.board = arr.map(x => {
        return x == null ? 0 : x.value;
      });

      if (this.gameState.board.some(x => x === 2048 )) {
        if(this.callOnWin.length > 0){
        this.callOnWin.forEach(x=>x(this.gameState))
        }
        this.gameState.won = true;
      }

      if(!this.movesAvailable()){
        this.gameState.over = true;
        if(this.callOnLose.length >0){
        this.callOnLose.forEach(x=>x(this.gameState));
      }}
    }
    
    movesAvailable() {
      this.checkAvail = true;
      let hasMoves = this.move("left") || this.move("right") || this.move("up") || this.move("down");
      this.checkAvail = false;
      return hasMoves;
    }
  }
  
  class Tile {
    constructor(value) {
      this.value = value;
      this.merged = false;
    }
  
    setMerged(merged) {
      this.merged = merged;
    }
  
    canMerge(other) {
      return (!this.merged && other != null &&
        !other.merged && this.value == other.value);
    }
    merge(other) {
      if (this.canMerge(other)) {
        this.value += other.value;
        this.merged = true;
        return this.value;
      }
      return -1;
    }
  }