export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

type AnyObject = { [key: string]: any };

export const deepMerge = <T extends AnyObject, U extends AnyObject>(
  target: T,
  source: U
): T & U => {
  const output = { ...target } as T & U;

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      if (key in target && typeof target[key] === "object") {
        (output as AnyObject)[key] = deepMerge(target[key], sourceValue);
      } else {
        (output as AnyObject)[key] = sourceValue;
      }
    } else {
      (output as AnyObject)[key] = sourceValue;
    }
  });

  return output;
};
