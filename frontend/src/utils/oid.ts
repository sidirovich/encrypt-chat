import { v4 as uuidv4 } from 'uuid';


export const uid = () => {
  let s: string[] = uuidv4().split('-');
  return s[0];
}

export const oid = () =>
  ((new Date().getTime() / 1000) | 0).toString(16) +
  "xxxxxxxxxxxxxxxx"
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase();