export function convertToNumberId(id: string) {
  const numberId = parseInt(id, 10);
  if (isNaN(numberId)) {
    throw new Error("Invalid user ID format. ID must be a number.");
  }
  return numberId;
}
