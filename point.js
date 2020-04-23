class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    const point = `(${this.x},${this.y})`;
    return `[Point @${point}]`;
  }
  visit(functionCall) {
    const { x, y } = this;
    return functionCall(x, y);
  }
  isEqualTo(pointB) {
    return (
      pointB instanceof Point && this.x === pointB.x && this.y === pointB.y
    );
  }
  clone() {
    const { x, y } = this;
    return new Point(x, y);
  }
  findDistanceTo(point2) {
    if (!(point2 instanceof Point)) return NaN;
    const xAxisDifference = this.x - point2.x;
    const yAxisDifference = this.y - point2.y;
    return Math.sqrt(xAxisDifference ** 2 + yAxisDifference ** 2);
  }
  isOn(shape) {
    return shape.hasPoint(this);
  }
}

module.exports = Point;
