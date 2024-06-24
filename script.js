document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubRepos();
    fetchCarouselData();
    fetchColegasData();
});

function fetchGitHubRepos() {
    const username = 'RafaelIannini';
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach((repo, index) => {
                const repoLink = `repo${index + 1}.html`;
                const repoCard = `
                    <div class="card">
                        <a href="${repoLink}" class="repo-link">
                            <img src="assets/images/github.png" class="card-img-top" alt="Imagem da logo github">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'Sem descrição'}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Última atualização ${new Date(repo.updated_at).toLocaleDateString()}</small>
                        </div>
                    </div>
                `;
                const reposContainer = document.getElementById('repos-container');
                reposContainer.innerHTML += repoCard;

                // Salva informações na sessionStorage para as páginas individuais
                sessionStorage.setItem(`repo${index + 1}`, JSON.stringify(repo));
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
}


function fetchColegasData() {
    fetch('db/db.json')
        .then(response => response.json())
        .then(data => {
            const colegasContainer = document.querySelector('.colegas-container');
            colegasContainer.innerHTML = ''; 
            data.colegas.forEach(colega => {
                const cardHTML = `
                    <div class="card">
                        <img src="${colega.foto}" class="card-img-top" alt="${colega.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${colega.nome}</h5>
                            <a href="${colega.github}" class="btn btn-primary" target="_blank">Ver GitHub</a>
                        </div>
                    </div>
                `;
                colegasContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => console.error('Erro ao buscar dados dos colegas:', error));
}



function fetchCarouselData() {
    fetch('db/db.json') 
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.getElementById('carousel-indicators');
            const carouselInner = document.getElementById('carousel-inner');
            
            data.carousel.forEach((item, index) => {
                const indicator = `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>
                `;
                const carouselItem = `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${item.image}" class="d-block w-100" alt="${item.alt}">
                    </div>
                `;
                carouselIndicators.innerHTML += indicator;
                carouselInner.innerHTML += carouselItem;
            });
        })
        .catch(error => console.error('Erro ao buscar dados do carrossel:', error));
}
