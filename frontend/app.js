let currentColor = 'red';  // Default color
let cubeData = {
    front: Array(9).fill('red'),
    back: Array(9).fill('orange'),
    left: Array(9).fill('blue'),
    right: Array(9).fill('green'),
    top: Array(9).fill('white'),
    bottom: Array(9).fill('yellow')
};

document.getElementById('solveButton').addEventListener('click', async () => {
    let solution = await fetchSolverSolution(cubeData);
    document.getElementById('solution').innerText = solution;
});

function setColor(color) {
    currentColor = color;
}

function changeColor(side) {
    const sideElement = document.getElementById(side);
    const colorBoxes = sideElement.querySelectorAll('.box');
    
    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.backgroundColor = currentColor;
        cubeData[side][i] = currentColor;
    }
}

async function fetchSolverSolution(cubeData) {
    const response = await fetch('https://your-netlify-server-url/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cubeData),
    });

    const data = await response.json();
    return data.solution;
}
 
