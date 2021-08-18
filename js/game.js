class Game {
    constructor() { }

    getState() {
        var stateRef = database.ref('gameState')
        stateRef.on("value", function (data) {
            gameState = data.val()
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if (gameState === 0) {
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value")
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val()
                player.getCount()
            }
            form = new Form()
            form.display()
        }
        car1 = createSprite(445, 200)
        car1.addImage("car1", car1_img);
        car2 = createSprite(845, 200);
        car2.addImage("car2", car2_img);
        cars = [car1, car2]
    }

    play() {
        form.hide()

        Player.getPlayerInfo();
        player.getCarsAtEnd()
        if (allPlayers !== undefined) {
            background("black")
            image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
            var x = 45

            var y
            var index = 0
            for (var plr in allPlayers) {
                index = index + 1

                x = allPlayers[plr].x
                y = displayHeight - allPlayers[plr].distance
                
                cars[index - 1].x = x;
                cars[index - 1].y = y;


                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    cars[index - 1].shapeColor = "blue"
                    camera.position.x = displayWidth / 2
                    camera.position.y = cars[index - 1].y
                }
            }
        }
        
        if (frameCount % 20 === 0) {
            var rocks = createSprite(random(displayWidth-displayWidth,displayWidth), 0, 10, 10);
            rocks.y =(displayHeight-player.distance)-300
            rocks.addImage("rock",rockimg);
            rocks.scale = 0.1
            rockGroup.add(rocks)
            }

        if (keyIsDown(UP_ARROW) && player.index != null) {
            player.distance += 10
            player.update()
        }

        if (keyIsDown(LEFT_ARROW) && player.index != null) {
            player.x = player.x - 10
            player.update()
        }

        if (keyIsDown(RIGHT_ARROW) && player.index != null) {
            player.x = player.x + 10
            player.update()
        }

        if (player.distance > 3860) {
            gameState = 2
            player.rank += 1
            Player.updateCarsAtEnd(player.rank)
            window.alert("rank:" + player.rank)
        }

        if (player.index !== null){
            for(var i = 0;i<rockGroup.length;i++){
                if(rockGroup.get(i).isTouching(cars)){
                    rockGroup.get(i).destroy()
                    gameState = 2
                    window.alert("Game Ended")
                    console.log("Game Ended")
                }
            }
        }

        drawSprites()
    }

    end() {
        console.log("Game Ended")
    }
}

