import {GameComponent} from "../../../components/game/game.component";
import {TitleScreen} from "../window/title";
import {Mobile} from "../window/mobile";

export function registerGuiListener() {
  window.addEventListener("click", (event) => {
    if(GameComponent.isPaused){
      TitleScreen.checkButtons(event.clientX, event.clientY);
    }

    if(GameComponent.isMobile){
      Mobile.checkButtons(event.clientX, event.clientY);
    }


  });

  window.addEventListener('touchstart', (event) => {
    if(GameComponent.isPaused){
      TitleScreen.checkButtons(event.touches[0].clientX, event.touches[0].clientY);
    }

    if(GameComponent.isMobile){
      Mobile.checkButtons(event.touches[0].clientX, event.touches[0].clientY);
    }

  });


}