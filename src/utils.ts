export function formatCatNames(catNames: string[]): string {
  if (catNames.length === 1) {
    return catNames[0];
  }
  if (catNames.length === 2) {
    return catNames.join(' and ');
  }
  return `${catNames.slice(0, -1).join(', ')}, and ${catNames[catNames.length - 1]}`;
}
