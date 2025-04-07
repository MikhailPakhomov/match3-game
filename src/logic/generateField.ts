import { getRandomElement } from "./getRandomElement";
import { FIELD_SIZE } from "./constants";

export const generateField = () => {
    return Array.from({ length: FIELD_SIZE }, () =>
      Array.from({ length: FIELD_SIZE }, getRandomElement),
    );
  };