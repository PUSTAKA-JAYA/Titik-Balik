document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            pages = data.pages;
            totalPages = pages.length;
            initializePages();
            updateFlipbook();
        })
        .catch(error => console.error('Error loading data:', error));
});

let currentPage = 0;
let pages = [];
let totalPages = 0;

function initializePages() {
    const flipbook = document.querySelector('.flipbook');
    flipbook.innerHTML = '';

    pages.forEach((page, index) => {
        const pageElement = document.createElement('div');
        pageElement.classList.add('page');
        pageElement.id = `page${index + 1}`;
        pageElement.innerHTML = `
            <h2>${page.title}</h2>
            <p>${page.content}</p>
            <img src="${page.image}" alt="Image for ${page.title}">
        `;
        flipbook.appendChild(pageElement);
    });
}

document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateFlipbook();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateFlipbook();
    }
});

document.getElementById('go').addEventListener('click', () => {
    const pageInput = document.getElementById('page-input');
    const pageNumber = parseInt(pageInput.value, 10) - 1;
    if (pageNumber >= 0 && pageNumber < totalPages) {
        currentPage = pageNumber;
        updateFlipbook();
    }
});

function updateFlipbook() {
    const flipbook = document.querySelector('.flipbook');
    pages.forEach((page, index) => {
        const pageElement = document.getElementById(`page${index + 1}`);
        if (index === currentPage) {
            pageElement.style.transform = `rotateY(${index * -180}deg)`;
            pageElement.classList.remove('hidden');
        } else if (index < currentPage) {
            pageElement.style.transform = `rotateY(${index * -180}deg)`;
            pageElement.classList.remove('hidden');
        } else {
            pageElement.style.transform = `rotateY(${index * -180 - 180}deg)`;
            pageElement.classList.add('hidden');
        }
    });
    updatePageIndicator();
}

function updatePageIndicator() {
    const indicator = document.getElementById('page-indicator');
    indicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
}

updatePageIndicator();

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX) {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateFlipbook();
        }
    } else if (touchEndX > touchStartX) {
        if (currentPage > 0) {
            currentPage--;
            updateFlipbook();
        }
    }
}
