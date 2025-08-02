export function copyToClipboard(el: HTMLInputElement): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(el.value);
  }

  el.setAttribute("contenteditable", "true");
  el.focus();

  document.execCommand("selectAll", false, undefined);
  document.execCommand("copy");

  el.removeAttribute("contenteditable");
  return Promise.resolve();
}
