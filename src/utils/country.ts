export function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase() === "UK" ? "GB" : countryCode.toUpperCase();
  
  if (code.length !== 2) return countryCode;
  
  const codePoints = code
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
    
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return countryCode;
  }
}
