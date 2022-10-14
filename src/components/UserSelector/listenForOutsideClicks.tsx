export default function listenForOutsideClicks(
  listening: boolean,
  setListening: React.Dispatch<React.SetStateAction<boolean>>,
  menuRef: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return () => {
    if (listening) {
      return;
    }

    if (!menuRef.current) {
      return;
    }

    setListening(true);
    ['click', 'touchstart'].forEach(() => {
      document.addEventListener('click', (evt) => {
        if (menuRef.current?.contains(evt.target as Node)) {
          return;
        }

        setIsOpen(false);
      });
    });
  };
}
