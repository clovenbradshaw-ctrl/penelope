function isPalindrome(str) {
  // Remove non-letter characters and convert to lowercase
  const cleanStr = str.replace(/[^a-z]/gi, '').toLowerCase();

  // Check if the cleaned string is a palindrome
  return cleanStr === cleanStr.split('').reverse().join('');
}
