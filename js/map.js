const map1 = {
    cords: [],
    completed: 50
};

const map2 = {
    cords: [],
    completed: 50
};


const generateMap = (map, axis, from, to, numRestAxis) => {
    const countIteration = to - from;
    const getRestAxis = (axis === "x") ? "y" : "x";
    let cords;

    for(let i = 0; i < countIteration; i += 1){
        cords = { [axis]: from + i, [getRestAxis]: numRestAxis };
        map.cords.push(cords);
    }

    map.completed = map.completed - countIteration
};

generateMap(map1, "x", 4, 16, 0);
generateMap(map1, "x", 4, 16, 19);
generateMap(map1, "y", 8, 12, 0);
generateMap(map1, "y", 8, 12, 19);

generateMap(map1, "x", 4, 9, 5);
generateMap(map1, "x", 4, 5, 6);
generateMap(map1, "x", 4, 5, 7);
generateMap(map1, "x", 4, 5, 8);
generateMap(map1, "x", 4, 9, 9);
generateMap(map1, "x", 8, 9, 10);
generateMap(map1, "x", 8, 9, 11);
generateMap(map1, "x", 8, 9, 12);
generateMap(map1, "x", 8, 9, 13);
generateMap(map1, "x", 4, 9, 14);

generateMap(map1, "x", 12, 17, 5);
generateMap(map1, "x", 12, 13, 6);
generateMap(map1, "x", 12, 13, 7);
generateMap(map1, "x", 12, 13, 8);
generateMap(map1, "x", 12, 15, 9);
generateMap(map1, "x", 12, 13, 10);
generateMap(map1, "x", 12, 13, 11);
generateMap(map1, "x", 12, 13, 12);
generateMap(map1, "x", 12, 13, 13);
generateMap(map1, "x", 12, 13, 14);

