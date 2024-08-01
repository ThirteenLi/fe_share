function loadCarousel (params) {
  let {length, aniDom, distance, defaultIndex = 0, autoplay, navDom, rightBtnDom, leftBtnDom, aniClass = "", activeNumClass = "", autoTime = 1000, navDiff = 2} = params
  if (!aniDom || !length || !distance) {
    return false
  }
  for(let i = 0; i < length; i++) {
    const item = aniDom.children?.[i]
    if (item) {
      item.setAttribute("data-index", i)
      item.style.left = 500 * i + "px"
      item.style.zIndex = 1
    }
    const nav = navDom?.children?.[i]
    if (nav) {
      nav.setAttribute("data-index", i)
    }
  }
  let current = defaultIndex % length
  aniDom.style.left = distance * current * -1 + "px"
  const clone = aniDom.firstElementChild.cloneNode(true);
  clone.style.left = distance * length + "px"
  clone.setAttribute("data-index", length)
  aniDom.appendChild(clone)
  length += 1

  const changeNums = () => {
    if (!navDom) {
      return false
    }
    const numslength = navDom.children.length
    for(let i = 0; i < numslength; i++) {
      num = navDom.children[i]
      num.classList.remove(activeNumClass)
      num.style.display = "none"
      if (Math.abs(current % (length - 1) - i) <= navDiff && i < length - 1) {
        num.style.display = "block"
        if ((current % (length - 1)) === i) {
          num.classList.add(activeNumClass)
        }
      }
    }
  }

  changeNums()

  const moveNoAni = () => {
    aniDom.classList.remove(aniClass)
    aniDom.style.left = current * -500 + "px"
    setTimeout(() => {
      aniDom.classList.add(aniClass)
    }, 0)
  }

  const move = () => {
    aniDom.style.left = distance * current * -1 + "px"
    changeNums()
  }

  if (navDom) {
    navDom.onclick = (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      current = index
      move()
    }
  }

  if (leftBtnDom) {
    leftBtnDom.onclick = () => {
      if (current === 0) {
        current = length - 1
        moveNoAni()
      }
      setTimeout(() => {
        current = (current + length - 1) % length
        move()
      }, 0);
    }
  }
  const handleRight = () => {
    if (current === length - 1) {
        current = 0
        moveNoAni()
      }
      setTimeout(() => {
        current = (current + 1) % length
        move()
      }, 0);
  }
  if (rightBtnDom) {
    rightBtnDom.onclick = () => {
      handleRight()
    }
  }
  if (autoplay) {
    setInterval(() => {
      handleRight()
    }, autoTime)
  }
}
