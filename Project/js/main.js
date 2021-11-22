function toggleClass(elementName, property) {
    let elements = document.querySelectorAll(elementName);
    elements.forEach(el => el.classList.toggle(property));
}