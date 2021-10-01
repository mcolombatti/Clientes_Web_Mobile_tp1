/**
 * Se encarga de crear el elemento en el DOM a partir
 * de las opciones ingresadas
 *
 * @param {{string}} template
 * @param {{}} options
 * @returns HTMLelement
 */
function componentCreation(template, options) {
    const DOMNode = stringToDOM(template);
    return DOMNode;
}
/**
 *
 * Convierte el string a un elemento HTML de DOM parseandolo
 *
 * @param {string} template
 * @returns HTMLelement
 */
function stringToDOM(template) {
    const div = document.createElement("div");
    div.innerHTML = template;
    return div.firstChild;
}

export {
    componentCreation
};
