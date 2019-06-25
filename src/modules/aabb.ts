class Aabb {
  private acreage: number;

  constructor(private minX: number = 0, private minY: number = 0, private maxX: number = 0, private maxY: number = 0) {
    if (minX > maxX || minY > maxY) {
      throw new Error("Min values greater than max values");
    }

    this.calculateAcreage();
  }

  public getCopy(): Aabb {
    return new Aabb(this.minX, this.minY, this.maxX, this.maxY);
  }

  public embrace(aabb1: Aabb, aabb2: Aabb): Aabb {
    this.minX = Math.min(aabb1.getMinX(), aabb2.getMinX());
    this.minY = Math.min(aabb1.getMinY(), aabb2.getMinY());
    this.maxX = Math.max(aabb1.getMaxX(), aabb2.getMaxX());
    this.maxY = Math.max(aabb1.getMaxY(), aabb2.getMaxY());

    return this.calculateAcreage();
  }

  public getMinX(): number {
    return this.minX;
  }

  public getMinY(): number {
    return this.minY;
  }

  public getMaxX(): number {
    return this.maxX;
  }

  public getMaxY(): number {
    return this.maxY;
  }

  public getAcreage(): number {
    return this.acreage;
  }

  public getWidth(): number {
    return (this.maxX - this.minX);
  }

  public getHeight(): number {
    return (this.maxY - this.minY);
  }

  public collidesWithPoint(x: number, y: number): boolean {
    return (
      x >= this.minX &&
      x <= this.maxX &&
      y >= this.minY &&
      y <= this.maxY
    );
  }

  public collidesWithAabb(aabb: Aabb): boolean {
    return (
      this.maxX >= aabb.getMinX() &&
      this.minX <= aabb.getMaxX() &&
      this.maxY >= aabb.getMinY() &&
      this.minY <= aabb.getMaxY()
    );
  }

  private calculateAcreage(): Aabb {
    this.acreage = (this.maxX - this.minX) * (this.maxY - this.minY);

    return this;
  }
}

export default Aabb;
