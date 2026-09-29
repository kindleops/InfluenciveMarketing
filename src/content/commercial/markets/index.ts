import type { LocationPage } from "../types";
import { newYork } from "./new-york";
import { boston } from "./boston";
import { philadelphia } from "./philadelphia";
import { washingtonDc } from "./washington-dc";
import { chicago } from "./chicago";
import { minneapolis } from "./minneapolis";
import { dallas } from "./dallas";
import { houston } from "./houston";
import { austin } from "./austin";
import { miami } from "./miami";
import { atlanta } from "./atlanta";
import { charlotte } from "./charlotte";
import { losAngeles } from "./los-angeles";
import { sanFrancisco } from "./san-francisco";
import { sanDiego } from "./san-diego";
import { seattle } from "./seattle";
import { phoenix } from "./phoenix";
import { denver } from "./denver";

/** Every market we serve, grouped on the hub by area. */
export const markets: LocationPage[] = [
  newYork,
  boston,
  philadelphia,
  washingtonDc,
  chicago,
  minneapolis,
  dallas,
  houston,
  austin,
  miami,
  atlanta,
  charlotte,
  losAngeles,
  sanFrancisco,
  sanDiego,
  seattle,
  phoenix,
  denver,
];
