import { Coordinates } from "./type";
import { CENTER_POINT, RADIUS } from "./conf";

/*
* Check if a latitude and longitude Coordinates is within a circle (radius 50 mile)
*
* Credit: https://stackoverflow.com/questions/24680247
*/
export const arePointsNear = (
  checkPoint: Coordinates,
  centerPoint: Coordinates = CENTER_POINT,
  mi: number = RADIUS): boolean => {

  const km = mi * 1.609344;
  const ky = 40000 / 360; 
  const kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky; 
  const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx; 
  const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    
  return Math.sqrt(dx * dx + dy * dy) <= km;
};
