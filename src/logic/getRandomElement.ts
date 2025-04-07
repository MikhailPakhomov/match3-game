import { COLORS } from '../logic/constants';

export const getRandomElement = () => COLORS[Math.floor(Math.random() * COLORS.length)];