import {Gizmo} from "./gizmo";
import {Position} from "../position";
import {GameAudio} from "../../audio/audio";

export class Pig extends Gizmo {

  protected shouldSpeak: boolean = false;
  private currentBubble: number = 0;

  constructor(position: Position) {
    super('../../../assets/sprites/pig/animation/idleRight.png', position, {
      idleLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/idleLeft.png'
      },
      idleRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/idleRight.png'
      },
      runLeft: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/runLeft.png'
      },
      runRight: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/runRight.png'
      }
    }, 11);


  }

  public override update(context: CanvasRenderingContext2D, delta: number) {
    super.update(context, delta);
    if (this.shouldSpeak) {
      this.speechBubbles[this.currentBubble].show(context, delta);
      return;
    }

  }

  onSwitch(context: CanvasRenderingContext2D, delta: number): void {

    this.currentBubble = Math.floor(Math.random() * this.speechBubbles.length);

    this.shouldSpeak = Math.random() < 0.10;

    if (Math.random() < 0.1) {
      GameAudio.getAudio('pig:grunt').play();
    }
  }

  onCollide(context: CanvasRenderingContext2D, delta: number): void {
    if (this.shouldSpeak) return;
    this.speechBubbles[this.currentBubble].show(context, delta);
  }

  public override updateHitbox(offsetX: number, offsetY: number) {
    super.updateHitbox(6, 8);
  }


}


export class KingPig extends Gizmo {


  constructor(position: Position) {
    super('../../../assets/sprites/pig/animation/king/idleRight.png', position, {
      idleLeft: {
        frameRate: 12,
        frameBuffer: 6,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/king/idleLeft.png'
      },
      idleRight: {
        frameRate: 12,
        frameBuffer: 6,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/king/idleRight.png'
      },

      runLeft: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/king/runLeft.png'
      },
      runRight: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: '../../../assets/sprites/pig/animation/king/runRight.png'
      }
    }, 12);


  }

  onCollide(context: CanvasRenderingContext2D, delta: number): void {

    this.speechBubbles[0].show(context, delta);


  }

  onSwitch(context: CanvasRenderingContext2D, delta: number): void {
    if (Math.random() < 0.10) {
      GameAudio.getAudio('pig:grunt').play();
    }
  }


}
