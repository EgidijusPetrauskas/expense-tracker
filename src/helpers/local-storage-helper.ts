export const getLocalStorage = <T>(name: string): T | null => {
  const stringItem = localStorage.getItem(name);

  if (stringItem === null) return null;

  return JSON.parse(stringItem) as T;
};

export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};
