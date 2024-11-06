import { useEffect, useState } from 'react';

export const useGetHtmlElementById = (elementId: string) => {
  const [element, setElement] = useState<HTMLElement>();

  useEffect(() => {
    const foundElement = document.getElementById(elementId);
    if (foundElement !== element) {
      setElement(foundElement ?? undefined);
    }
  });

  return element;
};
