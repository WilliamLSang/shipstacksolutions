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

// Contact form handler
(function(){
	const form = document.getElementById('contactForm');
	const messageDiv = document.getElementById('formMessage');
	if(form){
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const formData = new FormData(form);
			const data = {
				name: formData.get('name'),
				email: formData.get('email'),
				volume: formData.get('volume'),
				channels: formData.get('channels'),
				message: formData.get('message')
			};
			
			try {
				const response = await fetch('/php_scripts/contacts.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				});
				
				const result = await response.json();
				
				if(response.ok){
					messageDiv.style.color = '#10b981';
					messageDiv.textContent = result.message || 'Thank you! Your message was sent.';
					form.reset();
				} else {
					messageDiv.style.color = '#ef4444';
					messageDiv.textContent = result.error || 'Error sending message. Please try again.';
				}
			} catch(err){
				messageDiv.style.color = '#ef4444';
				messageDiv.textContent = 'Network error. Please try again later.';
				console.error('Contact form error:', err);
			}
		});
	}
})();

