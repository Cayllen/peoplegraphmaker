<script lang="ts">
	import { onMount, afterUpdate, tick } from 'svelte';
	import Header from './components/Header.svelte';
	import FooterNew from './components/FooterNew.svelte';
	import { reveal, setDefaultOptions } from 'svelte-reveal';
	import CookieConsentComponent from '$lib/cookieconsent.svelte';

	onMount(async () => {
		await tick();
		document.querySelector('.back-to-top').onclick = () => {
			scrollTo(document.documentElement);
		};
		function scrollTo(element, to = 0, duration = 500) {
			const start = element.scrollTop;
			const change = to - start;
			const increment = 20;
			let currentTime = 0;

			const animateScroll = () => {
				currentTime += increment;

				const val = easeInOutQuad(currentTime, start, change, duration);

				element.scrollTop = val;

				if (currentTime < duration) {
					setTimeout(animateScroll, increment);
				}
			};

			animateScroll();
		}

		function easeInOutQuad(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		}
		document.querySelector('.back-to-top').onclick = () => {
			scrollTo(document.documentElement);
		};
		document.querySelectorAll('#navbarCollapse ul li:not(.submenu-item) a').forEach((e) =>
			e.addEventListener('click', () => {
				navbarToggler.classList.remove('navbarTogglerActive');
				navbarCollapse.classList.add('hidden');
			})
		);
		let navbarToggler = document.querySelector('#navbarToggler');
		const navbarCollapse = document.querySelector('#navbarCollapse');

		navbarToggler.addEventListener('click', () => {
			navbarToggler.classList.toggle('navbarTogglerActive');
			navbarCollapse.classList.toggle('hidden');
		});
		const pageLink = document.querySelectorAll('.ud-menu-scroll');

		pageLink.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				if (window.location.pathname == '/') {
					e.preventDefault();
					let hrefLink = elem.getAttribute('href');

					if (hrefLink.includes('/') && hrefLink.length > 1) {
						hrefLink = hrefLink.slice(1);
						document.querySelector(hrefLink).scrollIntoView({
							behavior: 'smooth',
							offsetTop: 1 - 60
						});
					} else {
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: 'smooth'
						});
					}
				}
			});
		});
		setTimeout(() => {
			if (location.hash) {
				let target = location.hash;
				document.querySelector(target).scrollIntoView({
					behavior: 'smooth'
				});
			}
		}, 100);
	});

	setDefaultOptions({
		// easing: 'easeOutCubic',
		duration: 400,
		threshold: 0.05
	});
	let navigationMenu = [
		{ name: 'People Graph', anchor: '', link: './' },
		{ name: 'People Diagram', anchor: '', link: 'people-diagram' },
		{ name: 'People Chart', anchor: '', link: 'people-chart' },
		{ name: 'Icon Array', anchor: '', link: 'icon-array' }

		// { name: $_('Layout.navigationmenu.faq'), anchor: 'faq' }
	];
	function handleOnScroll() {
		// this function changes the header appearance depending on how the user scrolled
		const ud_header = document.querySelector('.ud-header');
		const sticky = ud_header.offsetTop;

		const logo = document.querySelector('.header-logo');
		if (window.pageYOffset > sticky) {
			ud_header.classList.add('sticky');
		} else {
			ud_header.classList.remove('sticky');
		}
		// === logo change for different header colors. NOTE: Relative img paths don't work here
		// if (ud_header.classList.contains('sticky')) {
		// 	// logo.src = '$lib/images/logo/TaslerIT_Logo_horiz_wht.svg';
		// 	logo.style.filter = 'invert(1)';
		// } else {
		// 	// logo.src = '$lib/images/logo/TaslerIT_Logo_horiz_blk.svg';
		// 	logo.style.filter = 'invert(0)';
		// }

		// show or hide the back-top-top button
		const backToTop = document.querySelector('.back-to-top');
		if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			backToTop.style.display = 'flex';
		} else {
			backToTop.style.display = 'none';
		}
	}
	let show = false;

	afterUpdate(() => {
		show = true;
	});
</script>

<svelte:window on:scroll={handleOnScroll} />
<!-- {#if show} -->
<div class="relative -z-20 min-h-max bg-gray-200">
	<section class="relative overflow-hidden">
		<Header {navigationMenu} />
		<div class="relative -z-10 opacity-50">
			<svg
				class="absolute top-0 sm:-right-72"
				width="800"
				height="502"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="400"
					cy="102"
					r="400"
					fill="url(#heroglow_paint0_radial)"
					fill-opacity=".6"
				></circle>
				<circle
					cx="209"
					cy="289"
					r="170"
					fill="url(#heroglow_paint1_radial)"
					fill-opacity=".4"
				></circle>
				<defs>
					<radialGradient
						id="heroglow_paint0_radial"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(90 149 251) scale(315.089)"
					>
						<stop stop-color="#3ABAB4"></stop>
						<stop offset="1" stop-color="#3ABAB4" stop-opacity=".01"></stop>
					</radialGradient>
					<radialGradient
						id="heroglow_paint1_radial"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(90 -40 249) scale(133.913)"
					>
						<stop stop-color="#667EEA"></stop>
						<stop offset="1" stop-color="#667EEA" stop-opacity=".01"></stop>
					</radialGradient>
				</defs>
			</svg>
		</div>

		<slot />
		<FooterNew {navigationMenu} />
	</section>
</div>
<!-- ====== Back To Top Start -->
<a
	href={'#'}
	class="back-to-top fixed bottom-8 left-auto right-8 z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-third shadow-md transition duration-300 ease-in-out hover:bg-secondary"
>
	<span class="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-third" />
</a>
<CookieConsentComponent />
<!-- {/if} -->

<!-- ====== Back To Top End -->

<svelte:head>
	<!-- TODO: add a preview image & fill out the correct url. ALso add keywords -->
	<!-- Primary Meta Tags -->

	<meta name="keywords" content="" />
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="People Graph Maker" />

	<meta property="og:image" content="https://peoplegraphmaker.com/preview.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />
	<meta property="og:image" content="https://peoplegraphmaker.com/preview_1_1.png" />
	<meta property="og:image:width" content="600" />
	<meta property="og:image:height" content="600" />

	<meta name="msapplication-TileImage" content="https://peoplegraphmaker.com/preview.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />

	<meta name="twitter:image" content="https://peoplegraphmaker.com/preview.png" />
</svelte:head>
