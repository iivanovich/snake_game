const btn = document.querySelector(".btn");
const result = document.querySelector(".result");
const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
    btn.classList.add("none");
});

const rS = JSON.parse(localStorage.getItem('user'));
if (rS === null){
    result.innerHTML = `Best result: 0`;
} else {
    result.innerHTML = `Best result: ${rS}`;
}


const onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const _renderSnake = (snake, x, y) => {
        snake.tail.forEach(s => {
            if(s.x === x && s.y === y) {
            ctx.fillStyle = colors.snakeBody;
            ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
            if(s.h){
                ctx.fillStyle = colors.snakeHead;
                ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
            }
            }
        });
    };
    
    const _renderFood = (food, x, y) => {
        if(food.apples.x === x && food.apples.y === y){
            ctx.fillStyle = colors.apples;
            ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
        }
    };

    const _renderMap = (map, x, y) => {
        map.cords.forEach(m => {
            if(m.x === x && m.y === y){
                ctx.fillStyle = colors.wall;
                ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
            }
        });
    };

    const _renderScoreBoard = (score, level) => {
        ctx.fillStyle = colors.popup;
        ctx.fillRect(0, 0, board.width, board.height);

        ctx.fillStyle = colors.text;
        ctx.font = board.font;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(score, board.textScore.x, board.textScore.y);

        ctx.fillStyle = colors.apples;
        ctx.fillRect(board.apples.x, board.apples.y, ceil, ceil);
    };

    const _renderPopup = (text) => {
        const halfW = (width / 2),
            halfH = (height / 2),
            x = halfW - (popup.width / 2),
            y = halfH - (popup.height / 2);

        ctx.fillStyle = colors.popup;
        ctx.fillRect(x, y, popup.width, popup.height);

        ctx.fillStyle = colors.text;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = popup.font;
        ctx.fillText(text, halfW, halfH);
    };

    const renderGame = () => {
        ctx.clearRect(0, 0, width, height);

        const { snake, food, maps, level, score, gameStart, gameOver, win } = state;


        for (let y = 0; y < row; y += 1){
            for (let x = 0; x < row; x += 1){
                _renderSnake(snake, x, y);
                _renderFood(food, x, y);
                _renderMap(maps[`map${level}`], x, y);

            }
        }

        if(!gameStart){
            _renderPopup("Press Any Key!");
        }
        if(win){
            _renderPopup("You Win!");
        }
        if(gameOver){
            _renderPopup("Game Over!");
        }

        _renderScoreBoard(score, level);
    };

    renderGame();

    let startTime = 0,
    currentTime = 0,
    time = 0, 
    currentSecond = 0;

    animateRAFInterval.start(() => {

        if(startTime === 0){
            startTime = new Date().getTime();
        }

        currentTime = new Date().getTime();
        time = currentTime - startTime;
        currentSecond = Math.floor(time / state.snake.speed);

        if(currentSecond > 0){
            startTime = 0;

            if(state.gameStart){
                checkWin();
                moveSnake();
                addNewFood();
                renderGame();

                if(state.win){
                    animateRAFInterval.cancel();
                    document.removeEventListener("keydown", onkeydown);
                }
                if(state.gameOver){
                    animateRAFInterval.cancel();
                    document.removeEventListener("keydown", onkeydown);
                    btn.classList.remove("none")
                    reset.classList.remove("none")
                    if (rS < state.score){
                        result.innerHTML = `Best result: ${state.score}`;
                        localStorage.clear();
                        localStorage.setItem('user', JSON.stringify(state.score));
                    }
                }

            }

        }

    });

    const onkeydown = (e) => {
        state.gameStart = true;
        
        changeDirection(e.keyCode);
    };

    document.addEventListener("keydown", onkeydown);

};

window.addEventListener("load", onload);

btn.addEventListener("click", () =>{
    location.reload();
    btn.classList.add("none");
    reset.classList.add("none");
})

