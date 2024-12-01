document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar y renderizar datos
    function renderCards(jsonPath, containerId, cardClass, linkPage, getData) {
        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById(containerId);
                container.innerHTML = ''; // Limpia el contenedor antes de agregar datos

                data.forEach(item => {
                    const article = document.createElement('div');
                    article.classList.add('col-12', 'col-md-6', 'mb-3'); // Clases para un diseño responsivo
                    article.innerHTML = `
                        <div class="${cardClass} card shadow-sm">
                            <img src="${getData(item).image}" class="card-img-top" alt="${getData(item).name}">
                            <div class="card-body">
                                <h5 class="card-title">${getData(item).name}</h5>
                                <p class="card-text">$${getData(item).price}</p>
                                <button class="btn btn-primary details-btn" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#detailsModal"
                                    data-image="${getData(item).image}"
                                    data-name="${getData(item).name}"
                                    data-price="${getData(item).price}"
                                    data-description="${getData(item).description}">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>`;
                    container.appendChild(article);
                });

                // Añadir eventos para el modal de detalles
                document.querySelectorAll('.details-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        document.getElementById('modal-image').src = this.getAttribute('data-image');
                        document.getElementById('modal-name').innerText = this.getAttribute('data-name');
                        document.getElementById('modal-price').innerText = `$${this.getAttribute('data-price')}`;
                        document.getElementById('modal-description').innerText = this.getAttribute('data-description');
                    });
                });
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    }

    // Renderizar destinos populares
    renderCards(
        'js/viajes.json', // Ruta del JSON
        'all-popular-destinations', // ID del contenedor donde se agregarán las cartas
        'popular-card', // Clase de las tarjetas
        'lugares.html', // Página de enlace (no usada en este caso)
        item => ({
            image: item.imagen,
            name: item.lugar,
            price: item.precio,
            description: item.descripcion || 'Sin descripción disponible.'
        })
    );

    // Renderizar viajes de aventura
    renderCards(
        'js/viajes.json', // Ruta del JSON
        'all-adventure-trips', // ID del contenedor donde se agregarán las cartas
        'adventure-card', // Clase de las tarjetas
        'aventura.html', // Página de enlace (no usada en este caso)
        item => ({
            image: item.aventura.imagen,
            name: item.aventura.aventura,
            price: item.precio,
            description: item.aventura.descripcion || 'Sin descripción disponible.'
        })
    );
});
