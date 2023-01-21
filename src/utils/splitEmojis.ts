export const splitEmojis = (num: number) => {
  let result = [];
  let quotient = Math.floor(num / 10);
  let remainder = num % 10;
  for (let i = 0; i < 10; i++) {
    result.push(quotient);
  }
  for (let i = 0; i < remainder; i++) {
    result[i] = result[i] + 1;
  }
  return result;
};
