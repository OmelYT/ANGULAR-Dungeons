import {Position} from "./position";
import {Scale} from "./scale";

export class Sprite {
  private readonly position: Position;
  protected readonly image: HTMLImageElement;
  private readonly imageSrc: string;
  private isSpriteSheet: boolean = false;

  public frameRate;
  public currentFrame: number = 0;
  public elapsedFrames = 0;
  public frameBuffer = 3;

  private width: number = 0;
  private height: number = 0;

  private readonly scale: Scale;

  /**
   * Create a new Sprite
   * @param imageSrc path to the image
   * @param position {Position} of the Sprite
   * @param funcOnLoad {() => void} function to call when the image is loaded
   * @param frameRate {number} if the image is a sprite sheet, the frame rate of the sprite sheet (1 Frame per Sprite)
   */
  constructor(imageSrc: string, position?: Position, funcOnLoad?: () => void, frameRate?: number) {
    this.position = position ? position : new Position(0, 0);
    this.image = new Image();
    this.imageSrc = imageSrc;
    this.frameRate = frameRate ?? 1;

    /**
     * Set the width and height of the image
     * when the image is loaded
     */
    this.image.onload = () => {


      this.width = this.image.width / this.frameRate;

      this.height = this.image.height;
      funcOnLoad?.();

    }


    this.image.src = this.imageSrc;
    this.scale = new Scale(1);
  }

  public setSpriteSheet(isSpriteSheet: boolean): void {
    this.isSpriteSheet = isSpriteSheet;
  }

  public getIsSpriteSheet(): boolean {
    return this.isSpriteSheet;
  }

  /**
   * Get the image Element of the Sprite
   * @returns {HTMLImageElement} of the Sprite
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Get the position of the Sprite
   * @returns {Position} of the Sprite
   */
  public getPosition(): Position {
    return this.position;
  }

  /**
   * Set the position of the Sprite
   * @param position {Position} of the Sprite
   */
  public setPosition(position: Position): void {
    this.getPosition().setY(position.getY());
    this.getPosition().setX(position.getX());
  }

  /**
   * Set the scale of the Sprite
   * @param scale {Scale} of the Sprite
   */
  public setScale(scale: Scale): void {
    this.getScale().setScale(scale.getScale());
    this.height = this.image.height * this.scale.getScale();
    this.width = this.image.width * this.scale.getScale();
  }

  /**
   * Get the width of the Sprite
   * @returns {number} width
   */
  public getWidth(): number {
    return (this.width * this.getScale().getScale());
  }

  /**
   * Get the height of the Sprite
   * @returns {number} height
   */
  public getHeight(): number {
    return this.height * this.getScale().getScale();
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  /**
   * Get the scale of the Sprite
   * @returns {Scale} of the Sprite
   */
  public getScale(): Scale {
    return this.scale;
  }

  /**
   * Draw the Sprite on the canvas
   * @param context {CanvasRenderingContext2D} of the canvas
   * @param delta {number} time since the last frame
   */
  public drawSprite(context: CanvasRenderingContext2D, delta?: number): void {

    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0
      },
      width: this.getWidth(),
      height: this.getHeight()
    }
    context.drawImage(this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.getX(),
      this.position.getY(),
      this.getWidth(),
      this.getHeight());

    this.nextFrame(delta!);

  }

  private nextFrame(delta: number): void {

    this.elapsedFrames = this.elapsedFrames + delta * 60;

    if (this.elapsedFrames >= this.frameBuffer) {

      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame = this.currentFrame + 1;
      } else {
        this.currentFrame = 0;
      }

      this.elapsedFrames = 0;

    }
  }

}
