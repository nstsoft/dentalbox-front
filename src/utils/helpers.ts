// export function debounce<T extends (...args: unknown[]) => void>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timeoutId: ReturnType<typeof setTimeout> | undefined;

//   return (...args: Parameters<T>): void => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }

//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

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
