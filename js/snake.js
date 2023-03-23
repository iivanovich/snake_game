const changeDirection = (keyCode) => {
    const direction = mapKeyCode(keyCode);

    if (_hasDirection(state.snake, direction)) {
        state.snake.direction = direction;
    }
};

const moveSnake = () => {

    const headSnake = _getHeadSnake(state.snake);
    const direction = state.snake.direction;
    let newMovementSnake;

    if(direction === "left"){
        newMovementSnake = { x: headSnake.x - 1, y: headSnake.y, d: direction, h: true};
    }
    if(direction === "right"){
        newMovementSnake = { x: headSnake.x + 1, y: headSnake.y, d: direction, h: true};
    }
    if(direction === "up"){
        newMovementSnake = { x: headSnake.x, y: headSnake.y - 1, d: direction, h: true};
    }
    if(direction === "down"){
        newMovementSnake = { x: headSnake.x, y: headSnake.y + 1, d: direction, h: true};
    }

    newMovementSnake = _setTeleportSnake(state.snake, newMovementSnake);

    if (_getCollisionSnake(newMovementSnake)){
        state.gameOver = true;
        state.nextLevel = false 
        state.gameStart = false;
        state.win = false;

        return true;
    }

    state.snake.lastPosTail = state.snake.tail.shift();
    headSnake.h = false;

    state.snake.tail.push(newMovementSnake);

    _checkGrowth();
};

const _setTeleportSnake = (snake, newHeadSnake) => {
    const {direction} = snake;
    const rowEdge = row - 1;

    if(newHeadSnake.x > rowEdge && direction === "right") {
        return { x: 0, y: newHeadSnake.y, d: newHeadSnake.d, h: newHeadSnake.h };
    }
    if(newHeadSnake.x < 0 && direction === "left") {
        return { x: rowEdge, y: newHeadSnake.y, d: newHeadSnake.d, h: newHeadSnake.h};
    }
    if(newHeadSnake.y < 0 && direction === "up") {
        return { x: newHeadSnake.x, y: rowEdge, d: newHeadSnake.d, h: newHeadSnake.h};
    }
    if(newHeadSnake.y > rowEdge && direction === "down") {
        return { x: newHeadSnake.x, y: 0, d: newHeadSnake.d, h: newHeadSnake.h};
    }

    return { x: newHeadSnake.x, y: newHeadSnake.y, d: newHeadSnake.d, h: newHeadSnake.h};
};

const _hasDirection = (snake, direction) => {
    const headSnake = _getHeadSnake(snake);

    if(
        (direction === "left" && headSnake.d !== "right") ||
        (direction === "right" && headSnake.d !== "left") ||
        (direction === "up" && headSnake.d !== "down") ||
        (direction === "down" && headSnake.d !== "up")
    ) {
        return true;
    }

    return false;
};

const _checkGrowth = () => {
    const { snake, food: { apples } } = state;
    const headSnake = _getHeadSnake(snake);

    if (apples.x === headSnake.x && apples.y === headSnake.y){
        state.food.didAte = true;
        state.snake.tail.unshift(state.snake.lastPosTail);
        state.snake.speed = state.snake.speed - 0.5
        state.score = state.score + 1;
    }
};

const _getCollisionSnake = (headSnake) => {
    const { snake, maps, level } = state;
    const { tail } = snake;
    const map = maps[`map${level}`];

    for(let t = 0; t < tail.length; t += 1){
        if(headSnake.x === tail[t].x && headSnake.y === tail[t].y){
            return true;
        }
    }

    for(let m = 0; m < map.cords.length; m += 1){
        if(headSnake.x === map.cords[m].x && headSnake.y === map.cords[m].y){
            return true;
        }
    }
};  

const _getHeadSnake = (snake) => {
    return snake.tail[snake.tail.length - 1];
};

const checkNextLevel = () => {
    const { score, maps, level } = state;
    const map = maps[`map${level}`];

    if(score >= map.completed && level < amountLevels) {
        state.snake = {
            tail: [
                {x: 1, y: 1, d: "right", h: false},
                {x: 2, y: 1, d: "right", h: false},
                {x: 3, y: 1, d: "right", h: false},
                {x: 4, y: 1, d: "right", h: true}
            ],
            direction: "right",
            lastPosTail: {},
            speed: 300
        };

        state.food = {
            didAte: true,
            apples: {  }
        };

        state.score = 0;
        state.gameStart = false;
        state.win = false;
        state.gameOver = false;

        state.nextLevel = true; 
        state.level = state.level + 1;

        return true;
    }
};

const checkWin = () => {
    const { score, maps, level } = state;
    const map = maps[`map${level}`];

    if(score >= map.completed && level >= amountLevels){
        state.gameOver = false;
        state.nextLevel = false 
        state.gameStart = false;

        state.win = true;

        return true;
    }
};