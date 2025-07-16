// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

// Анимация появления элементов при прокрутке
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");

			// Анимация счетчиков
			if (entry.target.classList.contains("stat-number")) {
				animateCounter(entry.target);
			}

			// Анимация прогресс-баров
			if (entry.target.querySelector(".progress-bar")) {
				animateProgressBar(entry.target.querySelector(".progress-bar"));
			}
		}
	});
}, observerOptions);

// Применяем анимацию ко всем элементам с классом animate-on-scroll
document.addEventListener("DOMContentLoaded", () => {
	const animatedElements = document.querySelectorAll(".animate-on-scroll");

	animatedElements.forEach((el) => {
		observer.observe(el);
	});

	// Наблюдаем за счетчиками отдельно
	const statNumbers = document.querySelectorAll(".stat-number");
	statNumbers.forEach((stat) => {
		observer.observe(stat);
	});
});

// Анимация счетчиков
function animateCounter(element) {
	const target = parseInt(element.getAttribute("data-count"));
	const duration = 2000; // 2 секунды
	const start = performance.now();

	function updateCounter(currentTime) {
		const elapsed = currentTime - start;
		const progress = Math.min(elapsed / duration, 1);

		// Easing function для плавности
		const easeOutQuart = 1 - Math.pow(1 - progress, 4);
		const current = Math.floor(easeOutQuart * target);

		element.textContent = current + "+";

		if (progress < 1) {
			requestAnimationFrame(updateCounter);
		} else {
			element.textContent = target + "+";
		}
	}

	requestAnimationFrame(updateCounter);
}

// Анимация прогресс-баров
function animateProgressBar(progressBar) {
	const progress = progressBar.getAttribute("data-progress");
	if (progress) {
		setTimeout(() => {
			progressBar.style.setProperty("--progress-width", progress + "%");
			progressBar.classList.add("animate-progress");
		}, 500);
	}
}

// Изменение стиля навигации при прокрутке
window.addEventListener("scroll", () => {
	const header = document.querySelector(".header");
	if (window.scrollY > 100) {
		header.style.background = "rgba(250, 250, 250, 0.98)";
		header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
	} else {
		header.style.background = "rgba(250, 250, 250, 0.95)";
		header.style.boxShadow = "none";
	}
});

// Эффект печатания для hero описания
document.addEventListener("DOMContentLoaded", () => {
	const typingText = document.querySelector(".typing-text");
	if (typingText) {
		const text = typingText.textContent;
		typingText.textContent = "";
		typingText.style.width = "0";

		setTimeout(() => {
			let i = 0;
			const typeWriter = () => {
				if (i < text.length) {
					typingText.textContent += text.charAt(i);
					i++;
					setTimeout(typeWriter, 50);
				} else {
					// Убираем курсор после завершения печатания
					setTimeout(() => {
						typingText.style.borderRight = "none";
					}, 1000);
				}
			};
			typeWriter();
		}, 2000);
	}
});

// Интерактивные эффекты для карточек услуг
document.addEventListener("DOMContentLoaded", () => {
	const serviceCards = document.querySelectorAll(".service-card");

	serviceCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			// Добавляем эффект свечения для иконки
			const icon = card.querySelector(".service-icon");
			if (icon) {
				icon.style.transform = "scale(1.2) rotate(10deg)";
			}
		});

		card.addEventListener("mouseleave", () => {
			const icon = card.querySelector(".service-icon");
			if (icon) {
				icon.style.transform = "scale(1) rotate(0deg)";
			}
		});
	});
});

// Интерактивные эффекты для увлечений
document.addEventListener("DOMContentLoaded", () => {
	const hobbyItems = document.querySelectorAll(".hobby-item");

	hobbyItems.forEach((item) => {
		item.addEventListener("mouseenter", () => {
			const icon = item.querySelector(".hobby-icon");
			if (icon) {
				icon.style.transform = "scale(1.2) rotate(15deg)";
			}
		});

		item.addEventListener("mouseleave", () => {
			const icon = item.querySelector(".hobby-icon");
			if (icon) {
				icon.style.transform = "scale(1) rotate(0deg)";
			}
		});
	});
});

// Эффекты для контактных ссылок
document.addEventListener("DOMContentLoaded", () => {
	const contactLinks = document.querySelectorAll(".contact-link");

	contactLinks.forEach((link) => {
		link.addEventListener("mouseenter", () => {
			const arrow = link.querySelector(".contact-arrow");
			const icon = link.querySelector(".contact-icon");

			if (arrow) {
				arrow.style.transform = "translateX(10px)";
			}
			if (icon) {
				icon.style.transform = "scale(1.2)";
			}
		});

		link.addEventListener("mouseleave", () => {
			const arrow = link.querySelector(".contact-arrow");
			const icon = link.querySelector(".contact-icon");

			if (arrow) {
				arrow.style.transform = "translateX(0)";
			}
			if (icon) {
				icon.style.transform = "scale(1)";
			}
		});
	});
});

// Параллакс эффект для фоновых элементов
window.addEventListener("scroll", () => {
	const scrolled = window.pageYOffset;
	const parallaxElements = document.querySelectorAll(
		".floating-element, .about-floating-1, .services-floating-1, .hobby-floating-1, .contact-floating-1"
	);

	parallaxElements.forEach((element, index) => {
		const speed = 0.5 + index * 0.1;
		const yPos = -(scrolled * speed);
		element.style.transform = `translateY(${yPos}px)`;
	});
});

// Добавляем эффект ripple для кнопок
document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".btn, .contact-link");

	buttons.forEach((button) => {
		button.addEventListener("click", function (e) {
			const ripple = document.createElement("span");
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			ripple.style.width = ripple.style.height = size + "px";
			ripple.style.left = x + "px";
			ripple.style.top = y + "px";
			ripple.classList.add("ripple-effect");

			this.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	});
});

// Мобильное меню
const createMobileMenu = () => {
	const nav = document.querySelector(".nav");
	const navMenu = document.querySelector(".nav-menu");

	if (window.innerWidth <= 768) {
		if (!document.querySelector(".mobile-menu-btn")) {
			const menuBtn = document.createElement("button");
			menuBtn.className = "mobile-menu-btn";
			menuBtn.innerHTML = "☰";
			menuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--accent-color);
                display: block;
            `;

			nav.appendChild(menuBtn);

			menuBtn.addEventListener("click", () => {
				navMenu.classList.toggle("mobile-active");
			});
		}
	} else {
		const existingBtn = document.querySelector(".mobile-menu-btn");
		if (existingBtn) {
			existingBtn.remove();
		}
		navMenu.classList.remove("mobile-active");
	}
};

// Инициализация при загрузке и изменении размера окна
window.addEventListener("load", createMobileMenu);
window.addEventListener("resize", createMobileMenu);
// Инициализация Lucide иконок
document.addEventListener("DOMContentLoaded", () => {
	// Инициализируем Lucide иконки
	if (typeof lucide !== "undefined") {
		lucide.createIcons();
	}
});

// Переинициализация иконок после динамических изменений
const reinitializeLucideIcons = () => {
	if (typeof lucide !== "undefined") {
		lucide.createIcons();
	}
};

// Вызываем переинициализацию после загрузки страницы
window.addEventListener("load", reinitializeLucideIcons);
