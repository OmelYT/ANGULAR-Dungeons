import {Position} from "./position";

export class Hitbox {
  private position: Position;
  private width: number;
  private height: number;

  constructor(position: Position, width: number, height: number) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setPosition(position: Position): void {
    this.position = position;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "rgba(240, 52, 52, 0.3)";
    context.fillRect(this.position.getX(), this.position.getY(), this.width, this.height);
  }


}
