class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank=null
      this.x = 0
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        x:this.x
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
    getCarsAtEnd(){
      var carsatend = database.ref('carsAtEnd')
      carsatend.on("value",(data)=>{
        this.rank = data.val()
      })
    }
    static updateCarsAtEnd(rank){
      database.ref('/').update({
        carsAtEnd:rank
      })
      
    }
    deletePlayers(){
      var playerRef = database.ref("players")
      playerRef.remove()
    }
  }

  