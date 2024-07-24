$(document).ready(function() {
    console.log('Document ready');

    var flipbook = $('#flipbook');

    if (flipbook.length) {
        console.log('Flipbook element found');
        
        flipbook.turn({
            width: 800,
            height: 600,
            autoCenter: true,
            pages: 10 // Sesuaikan dengan jumlah halaman
        });

        for (var i = 1; i <= 10; i++) {
            var page = $('<div class="turn-page"><img src="images/page' + i + '.jpg" alt="Page ' + i + '" /></div>');
            flipbook.turn('addPage', page);
            console.log('Added page ' + i);
        }

        // Debug untuk memeriksa apakah halaman berhasil ditambahkan
        console.log('Pages added');
    } else {
        console.log('Flipbook element not found');
    }
});
