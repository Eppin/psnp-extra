export function findParent (element: HTMLElement, query: string): HTMLElement | null {
  while (true) {
    if (element.parentElement?.querySelector(query) != null) {
      return element;
    }

    if (element.parentElement == null) {
      return null;
    }

    element = element.parentElement;
  }
}
