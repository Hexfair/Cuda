
document.addEventListener('DOMContentLoaded', function () {

	/* Функция для работы бургера */
	const iconMenu = document.querySelector('.header__burger');
	const menuBody = document.querySelector('.header__menu');
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('lock');
			iconMenu.classList.toggle('active');
			menuBody.classList.toggle('active');
		});
	};


	/* Анимация при скроле */
	function animWithScroll() {
		const animItems = document.querySelectorAll('._anim-items');	// Получаем все элементы, которые отметили этим классом - мы хотим их анимировать
		if (animItems.length > 0) {												// Проверяем попал ли в выборку хотя бы один элемент
			window.addEventListener('scroll', animOnScroll);				// Вызываем функцию animOnScroll при прокрутке страницы
			function animOnScroll() {
				for (let index = 0; index < animItems.length; index++) {		// Перебираем элементы нашей выборки
					const animItem = animItems[index];								// Помещаем в animItem конкретный элемент нашей выборки
					const animItemHeight = animItem.offsetHeight;				// В animItemHeight помещаем размер элемента - высоту
					const animItemOffset = offset(animItem).top;					// Получаем координаты элемента
					const animStart = 4;

					let animItemPoint = window.innerHeight - animItemHeight / animStart;
					if (animItemHeight > window.innerHeight) {
						animItemPoint = window.innerHeight - window.innerHeight / animStart;
					}

					if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
						animItem.classList.add('_active');
					} else {
						if (!animItem.classList.contains('_anim-no-hide')) {			// Если у элемента нет класса _anim-no-hide, то у него удаляется класс _active,
							animItem.classList.remove('_active');							// а значит при скроле анимация будет постоянно повторяться.
						}																				// Иначе класс _active после первого вызова останется у элемента и анимация не будет повторяться
					}
				}
			};
			function offset(el) {
				const rect = el.getBoundingClientRect(),													// Получаем координаты элемента относительно окна браузера
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,		// Кол-во прокрученных пикселей по X
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;		// Кол-во прокрученных пикселей по Y
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
			};
			setTimeout(() => {
				animOnScroll();
			}, 100);
		};
	}

	animWithScroll();


	/* Фильтр портфолио */
	let arrFilter = document.querySelectorAll('.filter__item');
	let arrItem = document.querySelectorAll('.portfolio__column');
	for (let i = 0; i < arrFilter.length; i++) {
		arrFilter[i].onclick = function () {
			let atr = arrFilter[i].getAttribute('data-filter');
			if (atr == 1) {
				arrItem.forEach(function (item, index, array) {
					item.hidden = false;
				});
			} else {
				let arrItem2 = document.querySelectorAll(`.portfolio__column.f_${atr}`);
				arrItem.forEach(function (item, index, array) {
					item.hidden = true;
				});
				arrItem2.forEach(function (item, index, array) {
					item.hidden = false;
				});
			}
			arrFilter.forEach(function (item, index, array) {
				item.classList.remove('_active');
			});
			arrFilter[i].classList.add('_active');
		};
	};


	/* Анимация круговой диаграммы */
	function radialDiagram() {
		const animItems = document.querySelectorAll('.radial-diagram');
		let scrolled = true;
		if (animItems.length > 0) {
			window.addEventListener('scroll', animOnScroll);
			function animOnScroll() {
				for (let index = 0; index < animItems.length; index++) {
					const animItem = animItems[index];
					const animItemHeight = animItem.offsetHeight;
					const animItemOffset = offset(animItem).top;
					const animStart = 4;

					let animItemPoint = window.innerHeight - animItemHeight / animStart;
					if (animItemHeight > window.innerHeight) {
						animItemPoint = window.innerHeight - window.innerHeight / animStart;
					}

					if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight) && scrolled == true) {
						animDiagram();
						scrolled = false;
					}
				}
			};
			function offset(el) {
				const rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
			};
			function animDiagram() {
				let arrDiagram = document.querySelectorAll('.diagram');
				arrDiagram.forEach(function (item, index, array) {
					let counter = 0;
					let percent = Number(item.getAttribute('data-percent'));
					let circle = item.querySelector('.front');

					let radius = circle.getAttribute('r');
					let sd = (2 * 3.1415926535 * radius) * (percent / 100);
					let ss = 565.5 - sd;
					circle.style.strokeDasharray = `${sd},${ss}`;
					circle.classList.add('_active');

					const elementStyle = getComputedStyle(circle);
					const duration = parseInt(elementStyle.animationDuration);
					let step = 1;
					let timeDelay = (duration * 1000) / ((percent + step) / step);

					let textPercent = item.querySelector('.percentage');
					function updateNumber(perc) {
						if (counter + step < perc) {
							textPercent.innerHTML = (`<tspan>${counter}</tspan><tspan>%</tspan>`);
							counter += step;
						} else {
							textPercent.innerHTML = (`<tspan>${perc}</tspan><tspan>%</tspan>`);
							clearInterval(timerID);
						}
					}
					let timerID = setInterval(updateNumber, timeDelay, percent);
				});
			};
			setTimeout(() => {
				animOnScroll();
			}, 100);
		};

	};
	radialDiagram();


	/* Убрать бутафорный плейсхолдер */
	function dynamicPlaceholder() {
		let arrItem = document.querySelectorAll('.form__item, .form__bottom');
		if (arrItem) {
			arrItem.forEach(function (item, index, array) {
				let arrInput = item.querySelector('.form__input, .form__text');
				let arrLabel = item.querySelector('.form__label');
				arrInput.addEventListener("click", function (e) {
					arrLabel.hidden = true;
				});
				arrLabel.addEventListener("click", function (e) {
					arrLabel.hidden = true;
					arrInput.focus();
				});

				arrInput.addEventListener("blur", function (e) {
					if (!arrInput.value) {
						arrLabel.hidden = false;
					}
				});
			});
		}
	};
	dynamicPlaceholder();



	/* Изменение размера textarea */
	function dynamicSizeTextarea() {
		var ie = 0;
		var op = 0;
		var ff = 0;
		var block; // Основной блок
		var block_r; // Блок для изменения размеров
		var delta_w = 0; // Изменение по ширине
		var delta_h = 0; // Изменение по высоте
		/* После загрузки страницы */
		onload = function () {
			/* Определяем браузер */
			var browser = navigator.userAgent;
			if (browser.indexOf("Opera") != -1) op = 1;
			else {
				if (browser.indexOf("MSIE") != -1) ie = 1;
				else {
					if (browser.indexOf("Firefox") != -1) ff = 1;
				}
			}
			block = document.querySelector(".block__resize"); // Получаем основной блок
			block_r = document.querySelector(".icon__resize"); // Получаем блок для изменения размеров
			document.onmouseup = clearXY; // Ставим обработку на отпускание кнопки мыши
			block_r.onmousedown = saveWH; // Ставим обработку на нажатие кнопки мыши
		}
		/* Функция для получения текущих координат курсора мыши */
		function getXY(obj_event) {
			if (obj_event) {
				x = obj_event.pageX;
				y = obj_event.pageY;
			}
			else {	// ХЗ зачем эта хрень
				x = window.event.clientX;
				y = window.event.clientY;
				if (ie) {
					y -= 2;
					x -= 2;
				}
			}
			return new Array(x, y);
		}
		function saveWH(obj_event) {
			var point = getXY(obj_event);
			w_block = block.clientWidth; // Текущая ширина блока
			h_block = block.clientHeight; // Текущая высота блока
			delta_w = w_block - point[0]; // Измеряем текущую разницу между шириной и x-координатой мыши
			delta_h = h_block - point[1]; // Измеряем текущую разницу между высотой и y-координатой мыши
			/* Ставим обработку движения мыши для разных браузеров */
			document.onmousemove = resizeBlock;
			if (op || ff) document.addEventListener("onmousemove", resizeBlock, false);
			return false; // Отключаем стандартную обработку нажатия мыши
		}
		/* Функция для измерения ширины окна */
		function clientWidth() {
			return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
		}
		/* Функция для измерения высоты окна */
		function clientHeight() {
			return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
		}
		/* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
		function clearXY() {
			document.onmousemove = null;
		}
		function resizeBlock(obj_event) {
			var point = getXY(obj_event);
			new_w = delta_w + point[0]; // Изменяем новое приращение по ширине
			new_h = delta_h + point[1]; // Изменяем новое приращение по высоте
			block.style.width = new_w + "px"; // Устанавливаем новую ширину блока
			block.style.height = new_h + "px"; // Устанавливаем новую высоту блока
			/* Если блок выходит за пределы экрана, то устанавливаем максимальные значения для ширины и высоты */
			if (block.offsetLeft + block.clientWidth > clientWidth()) block.style.width = (clientWidth() - block.offsetLeft) + "px";
			if (block.offsetTop + block.clientHeight > clientHeight()) block.style.height = (clientHeight() - block.offsetTop) + "px";
		}
	}
	dynamicSizeTextarea();


	/* Валидация формы */
	function validationForm() {
		const form = document.getElementById('form');				// Берем весь объект форма и вешаем на него событие
		form.addEventListener('submit', formSend);					// при отправке формы, мы переходим к выполнению функции formSend
		async function formSend(e) {
			e.preventDefault();												// Сначала запрещаем стандартную отправку формы
			formValidate(form);
		}

		function formValidate(form) {
			let formReq = document.querySelectorAll('._req');	// Берем все объекты классом _req - означает каким объектам нужна валидация
			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];				// Получаем каждый объект из выборки formReq
				formRemoveError(input);						// Сначала, когда приступаем к проверке, нужно убрать класс _error

				if (input.classList.contains('_email')) {		// Проверяем - если объект E-mail, то далее выполняем тест. Нужно предварительно добавить полю с email класс _email
					if (emailTest(input)) {
						formAddError(input);			// Если тест не пройдет, то выполняем функцию formAddError - добавляем объекту класс _error
						setTimeout(() => { formRemoveError(input); }, 5000);
					}
				} else {
					if (input.value === '') {	// Если значения вообще нет - пустая строка
						formAddError(input);		// Вешаем класс _error
						setTimeout(() => { formRemoveError(input); }, 5000);
					}
				}
			}
		}

		/* Две функции, которые добавляют и убирают у объектов класс _error */
		function formAddError(input) {
			input.parentElement.classList.add('_error');		// Добавляем родителю объекта класс _error - потому что реальные объекты скрыты, а используются бутаффорные
			input.classList.add('_error');						// Добавляем объекту класс _error
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');	// Убираем у родителя объекта класс _error
			input.classList.remove('_error');					// Убираем у объекта класс _error
		}

		/* Функция теста email */
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}

	};
	validationForm();



	/* Вызов baguetteBox - галерея */
	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {});
	}

	/* Плавная прокрутка к блоку */
	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

		if ($('.header-menu').hasClass('active')) {
			$('.header-menu,.header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});
})

