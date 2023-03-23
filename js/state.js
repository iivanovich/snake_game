const state = {
    snake: {
        tail: [
            {x: 10, y: 8, d: "right", h: false},
            {x: 10, y: 7, d: "right", h: false},
            {x: 10, y: 6, d: "right", h: false},
            {x: 10, y: 5, d: "right", h: true}
        ],
        direction: "right",
        lastPosTail: {},
        speed: 300
    },
    food: {
        didAte: true,
        apples: {  }
    },
    level: 1, 
    maps: {
        "map1": map1,
        "map2": map2
    },
    score: 0,
    nextLevel: false,
    win: false,
    gameStart: false,
    gameOver: false
}