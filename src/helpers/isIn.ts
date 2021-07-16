export default function isIn(id: string, array?: string[]) {
  return array ? array.includes(id) : false;
}

export function caseInsensitiveIsIn(str: string, arr: string[]) {
  str = str.toLowerCase();

  for (const a of arr) {
      if (a.toLowerCase() === str) {
          return true;
      }
  }
  return false;
}
