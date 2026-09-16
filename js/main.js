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

/* --- 4. FORM CONTATTI (invio diretto, sito statico) ---------- */
/*  Il modulo viene inviato via fetch() al servizio indicato qui sotto,
    che recapita il messaggio a info@cisac.it. Nessun client di posta
    viene aperto sul computer di chi scrive.
    Per cambiare servizio (es. Web3Forms) basta sostituire ENDPOINT
    e, se serve, aggiungere i campi nascosti richiesti in contatti.html. */
(function () {
	var ENDPOINT = 'https://formsubmit.co/ajax/info@cisac.it';

	var form = document.getElementById('contact-form');
	if (!form) return;

	var btn = document.getElementById('form-submit');
	var status = document.getElementById('form-status');
	var btnLabel = btn ? btn.textContent : '';

	function show(kind, text) {
		if (!status) return;
		status.className = 'form-status ' + kind;
		status.textContent = text;
		status.hidden = false;
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		if (!form.checkValidity()) { form.reportValidity(); return; }
		/* trappola antispam: se è piena, fingiamo il successo e non inviamo nulla */
		if (form._honey && form._honey.value) { show('ok', 'Richiesta inviata.'); return; }

		var data = new FormData(form);
		data.set('_subject', 'Richiesta informazioni dal sito – ' + form.nome.value.trim());

		if (btn) { btn.disabled = true; btn.textContent = 'Invio in corso…'; }
		show('pending', 'Invio in corso…');

		fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'Accept': 'application/json' },
			body: data
		})
			.then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
			.then(function (res) {
				if (!res.ok) throw new Error('HTTP error');
				form.reset();
				show('ok', 'Richiesta inviata, grazie. Ti rispondiamo al più presto.');
			})
			.catch(function () {
				show('error', 'Invio non riuscito. Riprova più tardi oppure scrivici a info@cisac.it o chiama lo 035-583244.');
			})
			.then(function () {
				if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
			});
	});
})();

/* --- 5. ANNO CORRENTE NEL FOOTER ---------------------------- */
(function () {
	var y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();
})();
