export function setHight(itemClass: string) {
  let item: NodeListOf<HTMLElement> = document.querySelectorAll(itemClass)
  let hightItem = 0
  for (let i = 0; i < item.length; i++) {
    if (hightItem < item[i].offsetHeight) hightItem = item[i].offsetHeight
  }
  for (let i = 0; i < item.length; i++) {
    item[i].style.height = hightItem + 'px'
  }
}
