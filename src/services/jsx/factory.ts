export default function jsx(tag: string | Function, props: any, ...children: any[]): HTMLElement {
	const element = typeof tag === 'function'
		? tag(props) // Chama a função se for um componente
		: document.createElement(tag); // Cria um elemento para o DOM

	for (const [name, value] of Object.entries(props || {})) {
		if (name.startsWith('on') && typeof value === 'function') {
			element.addEventListener(name.slice(2).toLowerCase(), value); // Adiciona evento
		} else {
			element.setAttribute(name, value); // Define atributos
		}
	}

	children.forEach(child => {
		if (Array.isArray(child)) {
			child.forEach(nestedChild => element.append(nestedChild)); // Adiciona filhos aninhados
		} else {
			element.append(child instanceof Node ? child : document.createTextNode(child)); // Adiciona texto ou nós
		}
	});

	return element;
}
