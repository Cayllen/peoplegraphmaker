<script>
	export let navigationMenu;
</script>

<div class="ud-header absolute left-0 top-0 z-40 flex w-full items-center bg-gray-900">
	<div class="container">
		<div class="relative -mx-4 flex items-center justify-between">
			<div class="w-96 max-w-full px-4">
				<a href="/" class="ud-menu-scroll navbar-logo flex w-full flex-row items-center py-2">
					<!-- <img
                        class="w-12 h-12 mr-2"
                        src="/images/logo/PersonGraphMaker_Logo_horiz_wht.svg"
                        alt="PersonGraphMaker.com" -->
					<p
						class="header-logo bg-gradient-to-r from-sky-200 to-yellow-600 bg-clip-text text-xl font-extrabold tracking-wide text-transparent"
					>
						PeopleGraphMaker.com
					</p>
				</a>
			</div>
			<div class="flex w-full items-center justify-between px-4">
				<div>
					<button
						id="navbarToggler"
						class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 xl:hidden"
					>
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-third" />
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-third" />
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-third" />
					</button>
					<nav
						id="navbarCollapse"
						class="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-third py-5 shadow-lg xl:static xl:block xl:w-full xl:max-w-full xl:bg-transparent xl:px-6 xl:py-0 xl:shadow-none"
					>
						<ul class="blcok xl:flex">
							{#each navigationMenu as { name, anchor, link }}
								<li class="group relative">
									<a
										href={link.length > 0 ? '/' + link : '#' + anchor}
										class="{link.length > 0
											? ''
											: 'ud-menu-scroll'} mx-8 flex whitespace-nowrap py-2 text-base text-dark group-hover:text-third-hover xl:mr-0 xl:inline-flex xl:px-0 xl:py-2 xl:text-third xl:group-hover:text-third-hover xl:group-hover:opacity-70 2xl:ml-12"
									>
										{name}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
