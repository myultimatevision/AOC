const Point = require("./point.js");

const isNumOutOfRange = function(range, number) {
  const [lowerLim, higherLim] = range.sort((num1, num2) => num1 - num2);
  return number < lowerLim || higherLim < number;
};

const getRequireCoordinate = function(x1, x2, ratioOfDistance) {
  return (1 - ratioOfDistance) * x1 + ratioOfDistance * x2;
};

const getAreaOfTriangle = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return Math.abs((1 / 2) * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)));
};

class Line {
  constructor(pointA, pointB) {
    this.endA = new Point(pointA.x, pointA.y);
    this.endB = new Point(pointB.x, pointB.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
    );
  }

  toString() {
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
  }

  get length() {
    return this.endA.findDistanceTo(this.endB);
  }

  isParallelTo(otherLine) {
    if (!(otherLine instanceof Line)) return false;
    let areCollinearPoints =
      getAreaOfTriangle(this.endA, this.endB, otherLine.endA) == 0;
    if (
      Math.abs(this.slope) == Infinity &&
      Math.abs(otherLine.slope) == Infinity
    )
      return !areCollinearPoints;

    return this.slope == otherLine.slope && !areCollinearPoints;
  }

  get slope() {
    const xAxisDifference = this.endB.x - this.endA.x;
    const yAxisDifference = this.endB.y - this.endA.y;
    return yAxisDifference / xAxisDifference;
  }

  findY(x) {
    const isXOutOfLine = isNumOutOfRange([this.endA.x, this.endB.x], x);
    if (isXOutOfLine) return NaN;
    if (this.endA.x == this.endB.x || this.endB.y == this.endA.y)
      return this.endA.y;
    const m = this.slope;
    const b = this.endA.y - m * this.endA.x;
    return m * x + b;
  }

  findX(y) {
    const isYOutOfLine = isNumOutOfRange([this.endA.y, this.endB.y], y);
    if (isYOutOfLine) return NaN;
    if (this.endA.x == this.endB.x || this.endB.y == this.endA.y)
      return this.endA.x;
    const m = this.slope;
    const b = this.endA.y - m * this.endA.x;
    return (y - b) / m;
  }

  hasPoint(point) {
    return (
      point instanceof Point &&
      (this.findY(point.x) === point.y || this.findX(point.y) === point.x)
    );
  }

  split() {
    const { endA, endB } = this;
    const midPoint = {
      x: (endA.x + endB.x) / 2,
      y: (endA.y + endB.y) / 2
    };
    return [new Line(endA, midPoint), new Line(midPoint, endB)];
  }
  findPointFromStart(num) {
    const distance = this.length;
    if (distance < num || num < 0) return null;
    const ratioOfDistance = num / distance;
    const x = getRequireCoordinate(this.endA.x, this.endB.x, ratioOfDistance);
    const y = getRequireCoordinate(this.endA.y, this.endB.y, ratioOfDistance);
    if (isNaN(x) || isNaN(y)) return null;
    return new Point(x, y);
  }
  findPointFromEnd(num) {
    return this.findPointFromStart(this.length - num);
  }
}

module.exports = Line;
