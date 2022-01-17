$(document).ready(function () {
    // применение библиотеки rellax js в main-блоке и у рыбок:
    new Rellax('.rellax', {horizontal: true});
    new Rellax('.fish');

    // применение библиотеки Parallax js в main-блоке и у рыбок:
    function parallaxItems(selector) {
        document.querySelectorAll(selector).forEach(item => {
            new Parallax(item);
        });
    }

    parallaxItems('.fish');
    parallaxItems('.crown');

    //карточки advantages:
    let advantageImg = $('.advantage-image');
    let advantage = $('.advantage');

    advantageImg.click((e) => {
        advantage.removeClass('active');
        $(e.target).parents('.advantage').addClass('active');
    })

    //slick для products
    $('#products').slick({
        slidesToShow: 1, //показать слайдов
        slidesToScroll: 1, // прокручивать по одному
        arrows: true, // стрелки нужны - true
        fade: true, // плавная анимация переключения слайдов
        asNavFor: '#products-nav' // навигационное меню
    });
    $('#products-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        asNavFor: '#products', // связываем с первым слайдером
        dots: false, //точки
        centerMode: false, //чтобы эл-ты не центрировались
        focusOnSelect: true,
        infinite: false // убрать бесконечное перелистывание
    });

    //tabs для описания и свойств продуктов:
    $('.product-tabs').tabs();

    //движущиеся глаза у груши и рыбок:
    function moveEyes(event, eyes) {
        for (let eye of eyes) {
            let distance = eye.getBoundingClientRect();

            let x = event.x - distance.right + 28;
            let y = event.y - distance.top - 28;

            // console.log(x + ' ' + y);

            function arcctg(x, y) {
                if (x > 0 && y > 0) {
                    return Math.PI / 2 - Math.atan(x / y);
                }
                if (x < 0 && y > 0) {
                    return Math.PI / 2 - Math.atan(x / y);
                }
                if (x < 0 && y < 0) {
                    return Math.PI + Math.atan(y / x);
                }
                if (x > 0 && y < 0) {
                    return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y));
                }
            }

            eye.style.transform = 'rotate(' + 57.298 * arcctg(x, y) + 'deg)';
        }
    }

    document.addEventListener('mousemove', (e) => moveEyes(e, document.querySelectorAll('.eye')));
    document.addEventListener('wheel', (e) =>  moveEyes(e, document.querySelectorAll('.eye')));


    let phone = $('#phone');
    let name = $('#name');

    //обработчик события на появление detmir-popup:
    $('.product-action').click(() => {
        $('#popup-detmir').css('display', 'flex');
    });

    // обработчик события - скрытие модального окна при нажатии на свободную область
    $('.popup').click((event) => {
        if (event.target.classList[0] === 'popup' || event.target.id === 'detmir-image'
            || event.target.classList[0] === 'popup-cancel-svg' || event.target.nodeName === 'path') {
            $('.popup').hide();
            $(name).val('');
            $(phone).val('');
        }
    });

    //Чтобы в инпут имени можно было вводить только русские или англ. буквы, пробел или дефис:
    name.on("input", function () {
        $(this).val($(this).val().replace(/[^a-zA-Zа-яА-Я- ]/g, ''));
    });

    //для открытия модального окна "popup-send":
    $('#order-action > button').click(() => {
        // $('.error-input').hide();

        let hasError = false;

        let inputs = [phone, name];

        for (i of inputs) {
            if (!$(i).val()) {
                $(i).css('border-color', '#FF5F4E');
                $(i).siblings('.error-input').css('opacity', '1.0');
                hasError = true;
            } else {
                $(i).css('border-color', 'transparent');
                $(i).siblings('.error-input').css('opacity', '0');
            }
        }

        if (!hasError) {
            // Для отображения на github pages (т.к. он не поддерживает php):
            $('#popup-send').css('display', 'flex');

            // Отправка письма для размещения на хостинге:
            // $.ajax({
            //     type: 'post',
            //     url: 'mail.php',
            //     data: 'name=' + name.val() + '&phone=' + phone.val(),
            //     success: () => {
            //         $('#popup-send').css('display', 'flex');
            //     },
            //     error: () => {
            //         alert('Ошибка записи. Свяжитесь, пожалуйста, по номеру телефона.');
            //     }
            // });
        }
    });

    // для плавного перехода по якорным ссылкам внутри страницы:
    function smoothAnimation(selector) {
        $(selector).on("click", function (event) {
            event.preventDefault();
            let id = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        });
    }

    smoothAnimation('#menu a');
    smoothAnimation('#main-action');
});