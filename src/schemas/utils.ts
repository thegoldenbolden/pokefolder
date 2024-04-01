export function minErrorMessage(length = 0) {
  return `Must be at least ${length} character(s)`;
}

export function maxErrorMessage(length = 0) {
  return `Cannot be more than ${length} character(s)`;
}
