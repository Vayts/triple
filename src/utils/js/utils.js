export function addListener(id, eventType, callback) {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function getElement(id)  {
  const node = document.getElementById(id);

  if (node) {
    return node;
  }
  return false;
}

export function getInputValue(id) {
  const input = getElement(id);
  
  if (input) {
    return input.value;
  }
  return false;
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min ;
}

export function getNodeList(className) {
  const nodeList = document.querySelectorAll(className);
  
  if (nodeList) {
    return nodeList;
  }
  return false;
}

export function addListListeners(className, eventType, callback) {
  const nodeList = getNodeList(className);
  if (nodeList) {
    nodeList.forEach((item) => {
      item.addEventListener(eventType, callback);
    })
    return true;
  }
  return false;
}

export function setDisabled(id) {
  const elem = getElement(id);
  if (elem) {
    elem.setAttribute('disabled', 'disabled');
    return true;
  }
  return false;
}

export function removeDisabled(id) {
  const elem = getElement(id);
  if (elem) {
    elem.removeAttribute('disabled');
    return true;
  }
  return false;
}

export function setTextContent(id, str) {
  const elem = getElement(id);
  if (elem) {
    elem.textContent = str;
    return true;
  }
  return false;
}

export function setActive(id) {
  const elem = getElement(id);
  if (elem) {
    elem.classList.add('active');
    return true;
  }
  return false;
}

export function removeActive(id) {
  const elem = getElement(id);
  if (elem) {
    elem.classList.remove('active');
    return true;
  }
  return false;
}

export function setDisplay(id, display) {
  const elem = getElement(id);
  if (elem) {
    elem.style.display = display;
    return true;
  }
  return false;
}

export function randomNumberWithException(min, max, exception) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (number === exception) {
    return randomNumberWithException(min, max, exception);
  }
  return number;
}
