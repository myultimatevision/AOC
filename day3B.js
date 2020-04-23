const wires = require('./day3A.json');

const rightDirection = function (direction, value) {
  const directionPoints = [];
  for (let xAxis = direction.x + 1; xAxis <= direction.x + value; xAxis++) {
    const point = { x: xAxis, y: direction.y, l: ++direction.l };
    directionPoints.push(point);
  }
  return directionPoints.slice();
};

const leftDirection = function (direction, value) {
  const directionPoints = [];
  for (let xAxis = direction.x - 1; xAxis >= direction.x - value; xAxis--) {
    const point = { x: xAxis, y: direction.y, l: ++direction.l };
    directionPoints.push(point);
  }
  return directionPoints.slice();
};

const upDirection = function (direction, value) {
  const directionPoints = [];
  for (let yAxis = direction.y + 1; yAxis <= direction.y + value; yAxis++) {
    const point = { x: direction.x, y: yAxis, l: ++direction.l };
    directionPoints.push(point);
  }
  return directionPoints.slice();
};

const downDirection = function (direction, value) {
  const directionPoints = [];
  for (let yAxis = direction.y - 1; yAxis >= direction.y - value; yAxis--) {
    const point = { x: direction.x, y: yAxis, l: ++direction.l };
    directionPoints.push(point);
  }
  return directionPoints.slice();
};

const getDirectionsOfWire = function (map, direction) {
  const directions = {
    right: rightDirection,
    left: leftDirection,
    up: upDirection,
    down: downDirection,
  };
  const routeDirection = directions[Object.keys(direction)[0]](
    map.slice(-1)[0],
    Object.values(direction).slice(-1)[0]
  );
  map.push(...routeDirection);
  return map;
};

const arePointsEqual = function (pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

const getEqualPoints = function (wire1Points, wire2Points) {
  const equalPoints = [];
  for (let point1Index = 0; point1Index < wire1Points.length; point1Index++) {
    for (let point2Index = 0; point2Index < wire2Points.length; point2Index++) {
      if (arePointsEqual(wire1Points[point1Index], wire2Points[point2Index])) {
        const intersectionPoint = {
          x: wire1Points[point1Index].x,
          y: wire1Points[point1Index].y,
          l: wire1Points[point1Index].l + wire2Points[point2Index].l,
        };
        equalPoints.push(intersectionPoint);
      }
    }
  }
  return equalPoints.slice();
};

const main = function () {
  const directionsOfWire1 = wires.wire1
    .reduce(getDirectionsOfWire, [
      {
        x: 0,
        y: 0,
        l: 0,
      },
    ])
    .slice(1);
  const directionsOfWire2 = wires.wire2
    .reduce(getDirectionsOfWire, [
      {
        x: 0,
        y: 0,
        l: 0,
      },
    ])
    .slice(1);

  const equalPoints = getEqualPoints(directionsOfWire1, directionsOfWire2);
  const intersectionDistances = equalPoints.map((point) => point.l);
  const nearestIntersectionDistance = Math.min(...intersectionDistances);
  console.log(nearestIntersectionDistance);
};

main();
