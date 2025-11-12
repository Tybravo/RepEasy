 
// export const AI_TEMPRATURE = [
//   0.2,
//   0.1,
//   0.3,
// ];



// export const getRandomTemperature = () => {
//   const randomIndex = Math.floor(Math.random() * AI_TEMPRATURE.length);
//   return AI_TEMPRATURE[randomIndex];
// }

export function getRandomTemperature() {
  let temp;
//   do {
    temp = Math.random() * 1.3; 
//   } while (temp >= 0.7 && temp <= 0.9);
  return parseFloat(temp.toFixed(2)); // round for clarity
}

console.log(getRandomTemperature());
