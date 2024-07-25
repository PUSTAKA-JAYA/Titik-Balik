document.addEventListener('DOMContentLoaded', function() {
    var flipbook = document.querySelector('.flipbook');

    for (var i = 1; i <= 68; i++) {
        var page = document.createElement('div');
        page.classList.add('page');
        page.innerHTML = '<img src="images/page' + i + '.jpg"><div class="page-footer">' + i + '</div>';
        flipbook.appendChild(page);
    }

    function resizeFlipbook() {
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height();
        var headerHeight = $('header').outerHeight();
        var flipbookWidth, flipbookHeight;

        if (window.innerWidth > window.innerHeight) { // Landscape
            flipbookWidth = viewportWidth;
            flipbookHeight = viewportHeight - headerHeight;
            $('.flipbook').turn('display', 'double');
        } else { // Portrait
            flipbookWidth = viewportWidth;
            flipbookHeight = viewportHeight - headerHeight;
            $('.flipbook').turn('display', 'single');
        }

        $('.flipbook').turn('size', flipbookWidth, flipbookHeight);
    }

    $('.flipbook').turn({
        width: $(window).width(),
        height: $(window).height() - $('header').outerHeight(),
        autoCenter: true,
        display: 'single',
        gradients: true,
        elevation: 50,
        when: {
            turned: function(event, page, view) {
                $('#current-page').text(page);
            }
        }
    });

    $(window).resize(function() {
        resizeFlipbook();
    });

    resizeFlipbook();

    // Navigation buttons
    document.getElementById('prev').addEventListener('click', function() {
        $('.flipbook').turn('previous');
    });

    document.getElementById('next').addEventListener('click', function() {
        $('.flipbook').turn('next');
    });

    // Fullscreen toggle
    document.getElementById('fullscreen-toggle').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    document.addEventListener('fullscreenchange', function() {
        var header = document.querySelector('header');
        var controls = document.querySelector('.controls');
        if (document.fullscreenElement) {
            header.style.display = 'none';
            controls.classList.add('fullscreen-controls');
        } else {
            header.style.display = 'block';
            controls.classList.remove('fullscreen-controls');
        }
        resizeFlipbook();
    });
});
