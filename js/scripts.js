document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    var flipbook = document.getElementById('flipbook');

    if (flipbook) {
        console.log('Flipbook element found');
        $(flipbook).turn({
            width: 800,
            height: 600,
            autoCenter: true
        });

        console.log('Turn.js initialized');
        
        // Load pages into flipbook
        for (var i = 1; i <= 10; i++) {
            var page = $('<div class="turn-page"><img src="images/page' + i + '.jpg" alt="Page ' + i + '" /></div>');
            $(flipbook).turn('addPage', page);
            console.log('Added page ' + i);
        }
    } else {
        console.log('Flipbook element not found');
    }
});
