import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';

export const fade = trigger('fade', [

  state('void', style({ opacity: 0})),

  transition(':enter, :leave', [
    animate(400)
  ])
]);

export const slideUpDown = trigger('slideUpDown', [

  state('void', style({ height: '0px', overflow: 'hidden', opacity: 0})),

  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      height: AUTO_STYLE,
      overflow: 'hidden',
      opacity: 1 }),
    animate('500ms ease-out')
  ]),

  transition(':leave', [
    animate('500ms ease-in', style({overflow: 'hidden', height: '0px', opacity: 0 }))
  ])
]);

export const slideLeftRight = trigger('slideLeftRight', [

  state('void', style({ opacity: 0})),

  transition(':enter', [
    style({ transform: 'translateX(200%)',  opacity: 1 }),
    animate('500ms ease-out')
  ]),

  transition(':leave', [
    animate('500ms ease-in', style({  transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const slideRightLeft = trigger('slideRightLeft', [

  state('void', style({ opacity: 0})),

  transition(':enter', [
    style({ transform: 'translateX(-100%)',  opacity: 1 }),
    animate('500ms ease-out')
  ]),

  transition(':leave', [
    animate('500ms ease-in', style({  transform: 'translateX(200%)', opacity: 0 }))
  ])
]);

export const explode = trigger('explode', [

  state('void', style({ transform: 'scale(0.3)', opacity: 0 })),
  state('*', style({ transform: 'translate(-50%, -50%), scale(1)', opacity: 1 })),

  transition(':enter', [
    animate('500ms ease-out')
  ]),

  transition(':leave', [
    animate('500ms ease-in')
  ]),
]);
