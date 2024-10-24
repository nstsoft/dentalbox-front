/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const createQueryStringFromObject = (params: any) => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val));
    } else {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

export const extractNumber = (str: string): number => {
  return parseInt(str.replace(/\D/g, ""), 10);
};
