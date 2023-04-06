export type FallbackTransitionParams = {
  isActive: boolean;
  durationSecs: number;
}

/**
 * There is a bug on Safari that the "transitionend" event doesn't fire. To mitigate this, we use a fallback to the setTimeout.
 * @param node - DOM node
 * @param isActive
 */
export function fallbackTransition(node: HTMLElement, { isActive, durationSecs: _ }: FallbackTransitionParams) {
  let isCurrentlyActive = isActive;
  let wasFired = false;
  const handleTransition = () => {
    if (!wasFired) {
      node.dispatchEvent(new CustomEvent("pageturned"));
      wasFired = true;
    }
  }

  return {
    destroy() {
      node.removeEventListener('transitionend', handleTransition);
    },
    update({ isActive, durationSecs }: FallbackTransitionParams) {
      if (isActive) {
        wasFired = false;
        setTimeout(handleTransition, durationSecs * 1000);
        node.addEventListener('transitionend', handleTransition);
      } else {
        wasFired = false;
        node.removeEventListener('transitionend', handleTransition);
      }
      isCurrentlyActive = isActive;
    }
  }
}