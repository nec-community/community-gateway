const WHEEL_STEP = 180;

let counterDeltaTop = 0;
let counterDeltaBottom = 0;
export function countWheels(delta) {
  if (delta > 0) {
    counterDeltaTop += delta;
    counterDeltaBottom = 0;
  }
  if (delta < 0) {
    counterDeltaBottom += delta;
    counterDeltaTop = 0;
  }
  if (counterDeltaTop >= WHEEL_STEP) {
    counterDeltaTop = 0;
    return 'top';
  }
  if (counterDeltaBottom <= -WHEEL_STEP) {
    counterDeltaBottom = 0;
    return 'bottom';
  }
  return 'not changed';
}
