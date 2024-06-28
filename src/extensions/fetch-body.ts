export async function fetchBody (url: string): Promise<HTMLElement | undefined> {
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Unable to retrieve document', url);
    return undefined;
  }

  return new DOMParser()
    .parseFromString(await response.text(), 'text/html')
    .body;
}
