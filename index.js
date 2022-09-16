const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');

input.addEventListener('input', function() {
    input.value = input.value.trim();
    if (input.value.length === 0) {
        input.classList.remove('is-invalid');
    }
});

button.addEventListener('click', function(event) {
    if (window[input.value] === undefined && typeof window[input.value] !== 'function') {
        input.classList.add('is-invalid');
        alert('Данного класса JavaScript не существует');
        event.preventDefault();
    } else {
        const value = window[input.value];
        const getFirstPrototype = value.prototype;
        input.value = '';

        const arrayPrototypes = [getFirstPrototype, getFirstPrototype];
        for (let i = 0; i !== null; i++) {
            i = Object.getPrototypeOf(arrayPrototypes.pop());
            arrayPrototypes.push(i, i);

            if (Object.getPrototypeOf(i) === '' || Object.getPrototypeOf(i) === null) {
                arrayPrototypes.pop();
                break;
            }
        }

        for (let i = 0; i < arrayPrototypes.length; i++) {
            const titlePrototype = document.createElement('ol');
            titlePrototype.classList.add('h2', 'list', 'px-0');
            titlePrototype.textContent = arrayPrototypes[i].constructor.name;
            if (!arrayPrototypes[i].constructor.name) {
                constructor = 'У прототипа нет свойства constructor';
            }

            const properties = Object.keys(arrayPrototypes[i]);
            properties.forEach(key => {
                const fragment = new DocumentFragment();
                const item = document.createElement('li');
                item.classList.add('item', 'small', 'ml-5');
                item.textContent = `${key} , ${'тип: ', typeof key}`;
                fragment.append(item);
                titlePrototype.append(fragment);
                container.append(titlePrototype);
            });
        }
        input.classList.remove('is-invalid');
    }
});
