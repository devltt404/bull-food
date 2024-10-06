export function getEventImageSrc(image: string | null | undefined): string {
  if (!image)
    return 'https://bullsconnect.usf.edu/images/groups/professional-02.png'; // default image
  if (image.startsWith('http')) {
    return image;
  }
  return `https://bullsconnect.usf.edu${image}`;
}
