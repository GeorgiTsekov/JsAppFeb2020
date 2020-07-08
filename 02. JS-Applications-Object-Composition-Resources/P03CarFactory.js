function solution({ model, power, color, carriage, wheelsize }) {
    
    let possibilities = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ]

    let newCar = {
        model: model,
        engine: possibilities.find(p => p.power >= power),
        carriage: { type: carriage, color: color },
        wheels: Array(4).fill(wheelsize % 2 === 0 ? wheelsize - 1 : wheelsize)
    }

    return newCar;
}

console.log(solution({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}
));