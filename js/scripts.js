document.addEventListener('DOMContentLoaded', function() {
    var flipbook = document.getElementById('flipbook');

    $(flipbook).turn({
        width: 800,
        height: 600,
        autoCenter: true
    });

    // Load pages into flipbook
    for (var i = 1; i <= 10; i++) {
        $(flipbook).turn('addPage', $('<div class="turn-page"><img src="images/page' + i + '.jpg" alt="Page ' + i + '" /></div>'));
    }
});
