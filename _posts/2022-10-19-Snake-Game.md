---
layout: page
title: Snake Game
permalink: /snake-game
---


<!DOCTYPE html>
<html>
  <head>
    <!-- title of game -->
  	<title>Snake Game</title>
    <link href="https://fonts.googleapis.com/css?family=Antic+Slab" rel="stylesheet">

  </head>

  <body>
    <!--setting the canvas up as a id and canvas size-->
    <canvas id="snakeboard" width="400" height="400"></canvas>

  <!--setting up the position of the board/canvas-->
    <style>
      #snakeboard {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
  <!--Setting up the score label-->
      #score {
        text-align: center;
        font-size: 100px;
      }
    </style>
  </body>

  <!--Beautifying the border and snake--> 
  <script>
    // const will be the consistent reference to our board border + background, snake color + border
    const board_border = 'green';
    const board_background = "lightblue";
    const snake_col = 'green';
    const snake_border = 'pink';

    // setting up the snakes' body position  
    let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]

    // setting the starting score at 0
    let score = 0;
    // True if changing direction
    let changing_direction = false;
    // Horizontal velocity + food
    let food_x;
    let dx = 10;
    // Vertical velocity + food
    let dy = 0;
    let food_y;
    
    // Get the canvas element
    const snakeboard = document.getElementById("snakeboard");
    // Display as a 2d drawing
    const snakeboard_ctx = snakeboard.getContext("2d");
    // Start game
    main();

    // generate food
    gen_food();

    document.addEventListener("keydown", change_direction);
    
    // main function called repeatedly to keep the game running
    function main() {

        if (has_game_ended()) return;

        changing_direction = false;
        setTimeout(function onTick() {
        clearboard();
        move_snake();
        drawSnake();
        // Call main again
        main();
        }, 100)
    }
    
    // drawing a border around the canvas
    function clear_board() {
      //  Select the colour to fill the drawing
      snakeboard_ctx.fillStyle = board_background;
      //  The colour for the border of the canvas
      snakeboard_ctx.strokestyle = board_border;
      // Drawing a "filled" rectangle to cover the entire canvas, the center of the canvas
      snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
      // Drawing a "border" around the entire canvas
      snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }
    
    // Drawing the snake on the canvas
    function drawSnake() {
      // Drawing each individual part of the snake
      snake.forEach(drawSnakePart)
    }
    
    // Drawing one snake part
    function drawSnakePart(snakePart) {

      // Setting the colour of the snake part
      snakeboard_ctx.fillStyle = snake_col;
      // Setting the border colour of the snake part
      snakeboard_ctx.strokestyle = snake_border;
      // Drawing a "filled" rectangle to represent the snake on the coordinates
      snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Drawing a border around the snake part
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }


    // drawing the food :p
    function drawFood() {
      snakeboard_ctx.fillStyle = 'lightblue';
      snakeboard_ctx.strokestyle = 'darkgreen';
      snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
      snakeboard_ctxstrokeRect(food_x, food_y, 10, 10);
    }

    function has_game_ended() {
      for (let i = 4; < snake.length; i++) {
        if (snake [i].x === snake [0].x && snake[i].y === snake [0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeboard.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    // new random food location 
    function random_food(min, max) {
        return Math.round((Math.random () * (max-min) + min) / 10 ) * 10;
    }

    function gen_food()
    {
      food_x = random_food(0, snakeboard.width - 10);
      food_y = random_food(0, snakeboard.height - 10);
      snake.forEach(function has _snake_eaten_food(part) {
        const has_eaten = part.x == food_x && party.y == food_y;
        if (has_eaten) gen_food();
      });
    }

    function change_direction(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

     // Prevent the snake from reversing
    
      if (changing_direction) return;
      changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function move_snake() {
      // Snake's head
      const head = {x: snake[0].x + dx, y: snake[0] + dy};
      // Add head to body
      snake.unshift(head);
      snake.pop();
    }
    
  </script>
</html>