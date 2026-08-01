export function removeFileExtension(filename: string) {
  const index = filename.lastIndexOf(".");

  if (index === -1) {
    return filename;
  }

  return filename.slice(0, index);
}
