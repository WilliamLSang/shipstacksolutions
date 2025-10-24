// Mobile nav toggle
(function(){
	const toggle = document.querySelector('.nav-toggle');
	const nav = document.getElementById('primary-nav');
	if(toggle && nav){
		toggle.addEventListener('click', () => {
			const expanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('show');
		});
	}
})();

// Year in footer
(function(){
	const y = document.getElementById('year');
	if(y){ y.textContent = new Date().getFullYear(); }
})();

// FAQ: ensure only one open at a time (progressive enhancement)
(function(){
	const acc = document.querySelectorAll('.accordion details');
	acc.forEach((d)=>{
		d.addEventListener('toggle', () => {
			if(d.open){
				acc.forEach(other => { if(other !== d) other.removeAttribute('open'); });
			}
		});
	});
})();
