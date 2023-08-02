export function toSentenceCase(text: string) {
  return text
    .toLowerCase()
    .split(".")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(".");
}

export function debounce(fn: () => void, delay: number) {
  let timer;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
