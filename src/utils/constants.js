import SecurityCheckListJson from '../assets/jsons/signatures-metadata.json';
import {uniq} from './helpers';



export const Providers = uniq(SecurityCheckListJson.map(it=>it?.cloud)).filter(it=>it);
export const Services = uniq(SecurityCheckListJson.map(it=>it?.service)).filter(it=>it);

