function longestConsecutiveWhiteWithSwap(bin_str) {
  let maxLength = 0;
  let currentLength = 0;
  let prevLength = 0;
  let zeroIndex = -1;

  for (let i = 0; i < bin_str.length; i++) {
    if (bin_str[i] === '1') {
      currentLength++;
    } else {
    
      if (zeroIndex !== -1) {
        prevLength = i - zeroIndex - 1;
      }
 
      zeroIndex = i;
      currentLength = i - zeroIndex + 1;
    }
    maxLength = Math.max(maxLength, prevLength + currentLength);
  }

  return maxLength;
}

// Example usage:
let bin_str = "11111000";
console.log(longestConsecutiveWhiteWithSwap(bin_str)); // Output: 5
