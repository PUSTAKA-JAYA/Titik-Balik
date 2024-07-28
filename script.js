document.addEventListener('DOMContentLoaded', function() {
    var flipbook = document.querySelector('.flipbook');

    for (var i = 1; i <= 68; i++) {
        var page = document.createElement('div');
        page.classList.add('page');
        page.innerHTML = '<img src="images/page' + i + '.jpg" class="flip-img"><div class="page-footer">' + i + '</div>';
        flipbook.appendChild(page);
    }

    function resizeFlipbook() {
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height() - $('header').height() - $('.ad-space').height() - $('footer').height();
        var flipbookWidth = viewportWidth;
        var flipbookHeight = viewportHeight;

        if (viewportWidth < 768) { // Mobile
            flipbookWidth = viewportWidth;
            flipbookHeight = viewportHeight;
        } else if (viewportWidth < 992) { // Tablet
            flipbookWidth = viewportWidth;
            flipbookHeight = viewportHeight;
        }

        $('.flipbook').turn('size', flipbookWidth, flipbookHeight);
    }

    function setFlipbookDisplay() {
        if (window.innerWidth > window.innerHeight) {
            $('.flipbook').turn('display', 'double');
        } else {
            $('.flipbook').turn('display', 'single');
        }
    }

    $('.flipbook').turn({
        width: $(window).width(),
        height: $(window).height() - $('header').height() - $('.ad-space').height() - $('footer').height(),
        autoCenter: true,
        display: 'single',
        gradients: true,
        elevation: 150, // Higher elevation for 3D effect
        acceleration: true,
        cornerSize: 100,
        pages: 68,
        when: {
            turning: function(event, page, view) {
                console.log('Turning to page', page);
            },
            turned: function(event, page, view) {
                console.log('Turned to page', page);
            }
        }
    });

    $(window).resize(function() {
        resizeFlipbook();
        setFlipbookDisplay();
    });

    setFlipbookDisplay();
    resizeFlipbook();

    // Handle click to turn pages
    $('.flipbook').on('click', function(event) {
        var page = $('.flipbook').turn('page');
        var pages = $('.flipbook').turn('pages');
        var bookWidth = $('.flipbook').width();
        var x = event.pageX - $('.flipbook').offset().left;

        if (x < bookWidth / 2) {
            if (page > 1) {
                $('.flipbook').turn('previous');
            }
        } else {
            if (page < pages) {
                $('.flipbook').turn('next');
            }
        }
    });

    // Fullscreen toggle
    document.addEventListener('fullscreenchange', function() {
        var header = document.querySelector('header');
        var adSpace = document.querySelector('.ad-space');
        var footer = document.querySelector('footer');
        if (document.fullscreenElement) {
            header.style.display = 'none';
            adSpace.style.display = 'none'; // Hide ad-space in fullscreen mode
            footer.style.display = 'none'; // Hide footer in fullscreen mode
        } else {
            header.style.display = 'block';
            adSpace.style.display = 'block'; // Ensure ad-space is always displayed
            footer.style.display = 'block'; // Ensure footer is always displayed
        }
        resizeFlipbook();
        setFlipbookDisplay();
    });

    // Add event listeners for navigation
    document.querySelector('.nav.prev').addEventListener('click', function() {
        $('.flipbook').turn('previous');
    });

    document.querySelector('.nav.next').addEventListener('click', function() {
        $('.flipbook').turn('next');
    });
});
