/* ============================================================
   CISAC Protezione Catodica srl — script del sito
   ============================================================ */

/* --- 1. MENU MOBILE ----------------------------------------- */
(function () {
	var burger = document.querySelector('.hamburger');
	var nav = document.querySelector('.mobile-nav');
	if (!burger || !nav) return;

	burger.addEventListener('click', function () {
		var open = nav.classList.toggle('open');
		burger.classList.toggle('open', open);
		burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		document.body.style.overflow = open ? 'hidden' : '';
	});

	nav.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			nav.classList.remove('open');
			burger.classList.remove('open');
			burger.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
	});
})();

/* --- 2. CONTATORI ------------------------------------------- */
(function () {
	var nums = document.querySelectorAll('.fact .num[data-target]');
	if (!nums.length || !('IntersectionObserver' in window)) return;

	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;
			io.unobserve(entry.target);

			var el = entry.target;
			var target = parseInt(el.dataset.target, 10);
			var suffix = el.dataset.suffix || '';
			var start = null;

			function step(ts) {
				if (!start) start = ts;
				var p = Math.min((ts - start) / 1400, 1);
				el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
				if (p < 1) requestAnimationFrame(step);
			}
			requestAnimationFrame(step);
		});
	}, { threshold: .4 });

	nums.forEach(function (n) { io.observe(n); });
})();

/* --- 3. REVEAL ALLO SCROLL ---------------------------------- */
(function () {
	var els = document.querySelectorAll('.reveal');
	if (!els.length) return;

	if (!('IntersectionObserver' in window)) {
		els.forEach(function (el) { el.classList.add('visible'); });
		return;
	}

	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				io.unobserve(entry.target);
			}
		});
	}, { threshold: .12, rootMargin: '0px 0px -40px' });

	els.forEach(function (el) { io.observe(el); });
})();

/* --- 4. FORM CONTATTI (mailto, sito statico) ---------------- */
(function () {
	var form = document.getElementById('contact-form');
	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var nome = form.nome.value.trim();
		var email = form.email.value.trim();
		var tel = form.telefono.value.trim();
		var msg = form.messaggio.value.trim();

		var body =
			'Nome: ' + nome + '\n' +
			'Email: ' + email + '\n' +
			'Telefono: ' + tel + '\n\n' +
			msg;

		window.location.href = 'mailto:info@cisac.it' +
			'?subject=' + encodeURIComponent('Richiesta dal sito – ' + nome) +
			'&body=' + encodeURIComponent(body);
	});
})();

/* --- 5. ANNO CORRENTE NEL FOOTER ---------------------------- */
(function () {
	var y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();
})();
