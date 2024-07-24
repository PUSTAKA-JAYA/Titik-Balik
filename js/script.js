const totalPages = 68;
let currentPage = 1;

function createPageElements() {
    const flipbook = document.getElementById('flipbook');

    for (let i = 1; i <= totalPages; i++) {
        const page = document.createElement('div');
        page.className = 'page';
        page.id = `page${i}`;
        page.style.left = `${(i - 1) * 100}%`;

        const img = document.createElement('img');
        img.src = `images/page${i}.jpg`;
        img.alt = `Halaman ${i}`;

        page.appendChild(img);
        flipbook.appendChild(page);
    }
}

function updatePage() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.left = `${(index - currentPage + 1) * 100}%`;
    });
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

window.onload = createPageElements;
