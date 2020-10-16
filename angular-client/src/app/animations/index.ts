import { animate, transition, trigger } from '@angular/animations';

export const appearance = trigger('appearance', [
  transition('* <=> *', animate(800)),
]);
