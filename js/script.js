let currentPage = 1;

function updatePage() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.left = `${(index - currentPage + 1) * 100}%`;
    });
}

function nextPage() {
    if (currentPage < 2) { // Ubah sesuai jumlah halaman
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
