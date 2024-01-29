<script lang="ts">
	import { onMount, afterUpdate, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	import SubPageMetaTags from '$cmp/SubPageMetaTags.svelte';
	import ColorPicker from '$cmp/ColorPicker.svelte';
	import {
		Canvas,
		StaticCanvas,
		Rect,
		Color,
		Path,
		Group,
		Circle as FabricCircle,
		util,
		Gradient,
		loadSVGFromString,
		loadSVGFromURL
	} from 'fabric'; // browser
	import { Circle, Square, User } from 'lucide-svelte';

	export let type = 'People Graph';
	let appName = type;
	let rows, columns;
	let rowsLabel, columnsLabel;
	let xGap, yGap;
	let canvas;
	let zoom = 1;
	let mounted = false;
	let ctx;
	let ownSVG;
	let rtl = false; // TODO add as option
	let downToUp = false; // TODO add as option
	let colorInputs = [];
	let selectedType;
	const iconTypes = {
		person: generatePerson(),
		circle: generateCircle(),
		squareRounded: generateSquareRounded(),
		square: generateSquare()
	};
	function generateSquareRounded() {
		const square = () => new Rect({ width: 16, height: 16, rx: 3, ry: 3 });
		const objectGroup = () => [square()];
		return objectGroup;
	}
	function generateSquare() {
		const square = () => new Rect({ width: 16, height: 16 });
		const objectGroup = () => [square()];
		return objectGroup;
	}

	function generateCircle() {
		const circle = () => new FabricCircle({ radius: 8 });
		const objectGroup = () => [circle()];
		return objectGroup;
	}

	function generatePerson() {
		const path = () =>
			new Path(
				'M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z'
			);
		const path2 = () =>
			new Path(
				'M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z'
			);
		const objectGroup = () => [path(), path2()];

		return objectGroup;
	}
	function reset() {
		const defaultValues = {
			rows: 10,
			columns: 10,
			xGap: 21,
			yGap: 25,
			zoom: 1,
			colorInputs: [
				{ id: 'head', label: 'Head', value: '#BBBBBB', colorUntil: 65.5 },
				{ id: 'head1', label: 'Head1', value: '#e66465', colorUntil: 100 }
				// Add more color inputs as needed
			],
			rtl: false,
			downToUp: false,
			selectedType: 'square',
			ownSVG: ''
		};

		rows = defaultValues.rows;
		columns = defaultValues.columns;
		xGap = defaultValues.xGap;
		yGap = defaultValues.yGap;
		zoom = defaultValues.zoom;
		colorInputs = defaultValues.colorInputs;
		columnsLabel = columns;
		rowsLabel = rows;
		rtl = defaultValues.rtl;
		downToUp = defaultValues.downToUp;
		selectedType = defaultValues.selectedType;
		ownSVG = defaultValues.ownSVG;
	}
	reset();
	// look into https://jsfiddle.net/Maxyz/7mjnvh8u/24/ canvag for bringing in other svgs than just my own

	function drawCanvas() {
		// if (!changed) return;
		colorInputs[colorInputs.length - 1].colorUntil = rows * columns;
		const ratio = 2 + zoom * 1.5;
		const width = columns * xGap + 5;
		const height = rows * yGap + 5;

		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width * zoom + 'px';
		canvas.style.height = height * zoom + 'px';
		ctx.scale(ratio, ratio);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		applyToContext(ctx);
		// requestAnimationFrame(drawCanvas);
		// var img = new Image();
		// img.src = canvas.toDataURL('image/png');
		// img.alt = 'downloaded-from-image';

		// // document.body.appendChild(img);
		// test123.src = canvas.toDataURL('image/png');
		// test123.height = height * zoom;
		// test123.width = width * zoom;
		// console.log(height, width);
	}
	function applyToContext(ctx) {
		let currentID = 0;

		let path1 = new Path2D(
			'M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z'
		);
		let path2 = new Path2D(
			'M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z'
		);
		path1.addPath(path2);

		// canvas.width = width;
		// canvas.height = height;
		// ctx.fillStyle = '#FF00FF';
		// ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		// ctx.scale(5, 5);
		for (let j = 0; j < rows; j++) {
			ctx.save();
			for (let i = 0; i < columns; i++) {
				const id = currentID++;

				const colorInput = colorInputs.find((input) => input.colorUntil > id) || {
					value: '#000000'
				};

				const fill = colorInput.value;

				ctx.fillStyle = fill;

				ctx.fill(path1);
				if (i < columns) ctx.translate(xGap, 0);
			}
			ctx.restore();
			ctx.translate(0, yGap);
		}

		ctx.restore();
	}
	let canvas2;
	let canv2;

	onMount(() => {
		// ctx = canvas.getContext('2d');
		// drawCanvas();
		// requestAnimationFrame(drawCanvas);

		canv2 = new StaticCanvas(canvas2, {
			renderOnAddRemove: false,
			imageSmoothingEnabled: false,
			enableRetinaScaling: true,
			perfLimitSizeTotal: 225000000,
			maxCacheSideLimit: 11000
		});

		zoomCanvas();

		// util.requestAnimFrame(function render() {
		// 	// check if one of the values rows, columns, xGap, yGap, zoom, colorInputs changed from the last input
		// 	// without stringify

		// 	if (changed) {
		// 		redraw();
		// 		// canv2.backgroundColor = '#FF00FF';
		// 		changed = false;
		// 		canv2.renderAll();
		// 	}
		// 	util.requestAnimFrame(render);
		// });

		// redraw();
		mounted = true;
	});
	let changed = false;
	function zoom2(width) {
		var scale = width / canv2.getWidth();
		let height = scale * canv2.getHeight();

		canv2.setDimensions({
			'width': width,
			'height': height
		});

		canv2.calcOffset();
		var objects = canv2.getObjects();
		for (var i in objects) {
			var scaleX = objects[i].scaleX;
			var scaleY = objects[i].scaleY;
			var left = objects[i].left;
			var top = objects[i].top;

			objects[i].scaleX = scaleX * scale;
			objects[i].scaleY = scaleY * scale;
			objects[i].left = left * scale;
			objects[i].top = top * scale;

			objects[i].setCoords();
		}
		canv2.renderAll();
	}
	async function redraw() {
		// colorInputs[colorInputs.length - 1].colorUntil = rows * columns;

		console.log('redraw');
		canv2.clear();
		// https://jsfiddle.net/Maxyz/5hrwt9ka/9/
		if (ownSVG.length) {
			const loadedSVG = await loadSVGFromString(ownSVG);
			console.log(loadedSVG);

			var svgData = util.groupSVGElements(loadedSVG.objects);
			svgData.scaleToWidth(20);
			svgData.scaleToHeight(20);
		}

		const fullGroup = new Group([], {
			objectCaching: true,
			noScaleCache: false
		});
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < columns; i++) {
				let group;
				if (ownSVG.length) {
					group = await svgData.clone().then(
						(gg) =>
							new Group([gg], {
								left: i * xGap,
								top: j * yGap
							})
					);
				} else {
					group = new Group(iconTypes[selectedType](), {}).set({
						left: i * xGap,
						top: j * yGap
					});
				}

				fullGroup.add(group);
			}
		}
		canv2.add(fullGroup);
		changeCanvasColor();
	}
	let canvasWidth = 0;
	let canvasHeight = 0;
	let baseRatio = 1;
	// this ratio makes sure things do not get too big
	$: baseRatio = 1 / (1 + Math.pow(Math.E, 0.0015 * (rows * columns - 2000)));
	function zoomCanvas() {
		// maxbe reduce quality a bit..
		// if (!canv2.getObjects()[0]) return;

		console.log('zoomCanvas');

		// let ratio = zoom * 0.9;
		let zoomRatio = zoom * baseRatio;

		let ratio = zoomRatio;

		canvasWidth = columns * xGap + 5;
		canvasHeight = rows * yGap + 5;
		canv2.setDimensions(
			{
				width: canvasWidth * zoomRatio + 'px',
				height: canvasHeight * zoomRatio + 'px'
			},
			{ cssOnly: true, backstoreOnly: false }
		);
		canv2.setDimensions(
			{ width: canvasWidth * ratio, height: canvasHeight * ratio },
			{ cssOnly: false }
		);

		canv2.setZoom(ratio);
	}

	function changeCanvasGap() {
		if (!canv2.getObjects()[0]) return;
		console.log('changeCanvasGap');

		let centerPoints = canv2.getObjects()[0].getCenterPoint();

		let idx = 0;
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < columns; i++) {
				let ff = canv2.getObjects()[0]?.item(idx);
				ff.set({
					left: i * xGap - centerPoints.x,
					top: j * yGap - centerPoints.y
				});
				idx++;
			}
		}

		canv2.renderAll();
		canv2.getObjects()[0].triggerLayout();
	}
	function changeCanvasColor() {
		colorInputs[colorInputs.length - 1].colorUntil = rows * columns;

		if (!canv2.getObjects()[0]) return;
		console.log('changeCanvasColor');
		let id = 0;

		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < columns; i++) {
				// this option reverses the id for each row
				let dynamicID = rtl ? columns * (j + 1) - (i + 1) : id;
				let dynamicID2 = downToUp ? rows * columns - dynamicID - 1 : dynamicID;

				const ff = canv2.getObjects()[0]?.item(id);
				// console.log(i, j, '+++id', id);
				// console.log('dynamicid', dynamicID);

				const newColorID = colorInputs.findIndex((input) => input.colorUntil > dynamicID2);
				const colorInput = colorInputs[newColorID];
				let nextColor = colorInputs[newColorID + 1];
				// console.log('newColorID', newColorID, '+++');

				if (
					!Number.isInteger(colorInput.colorUntil) &&
					dynamicID2 === Math.floor(colorInput.colorUntil)
				) {
					const afterComma = Math.abs(colorInput.colorUntil) - Math.floor(colorInput.colorUntil);
					console.log(ff);

					var gradient = new Gradient({
						type: 'linear',
						gradientUnits: 'pixels', // or 'percentage'
						coords: { x1: 0, y1: 0, x2: ff.item(0)?.width ?? ff.item(0).height, y2: 0 },
						colorStops: [
							{ offset: afterComma, color: colorInput.value },
							{ offset: 1 - afterComma, color: nextColor.value }
						]
					});
					var gradient2 = new Gradient({
						type: 'linear',
						gradientUnits: 'pixels', // or 'percentage'
						coords: { x1: 0, y1: 0, x2: ff.item(1)?.width ?? ff.item(1)?.height, y2: 0 },
						colorStops: [
							{ offset: afterComma, color: colorInput.value },
							{ offset: 1 - afterComma, color: nextColor.value }
						]
					});
					if (rtl !== downToUp) {
						gradient.colorStops.reverse();
						gradient2.colorStops.reverse();
					}
					// TODO: add option to set color of either fill or stroke or both
					// NOTE: SUPER UGLY METHOD to color stuff because apparently one has to color every single path
					// ff.item(0).set({ fill: gradient });
					// ff.item(1)?.set({ fill: gradient2 });

					!!ff._objects
						? ff._objects.forEach((num, idx, arr) => {
								if (idx < ff._objects.length / 2) {
									num.set({ fill: gradient });
								} else {
									num.set({ fill: gradient2 });
								}
							})
						: ff.group._objects.forEach((num, idx, arr) => {
								if (idx < ff.group._objects.length / 2) {
									num.set({ fill: gradient });
								} else {
									num.set({ fill: gradient2 });
								}
							});
				} else {
					!!ff._objects
						? ff._objects.forEach((num, idx, arr) => {
								num.set({ fill: colorInput.value });
							})
						: ff.group._objects.forEach((num, idx, arr) => {
								num.set({ fill: colorInput.value });
							});
				}

				id++;
			}
		}
		canv2.renderAll();
	}
	// $: mounted && console.log(mounted, rows, columns, xGap, yGap, zoom, colorInputs);
	// $: changed = mounted && (rows, columns) ? true : false;
	$: mounted && (rows, columns, selectedType, ownSVG, redraw());
	$: mounted && (xGap, yGap, changeCanvasGap());
	$: mounted && (zoom, xGap, yGap, rows, columns, zoomCanvas());

	$: mounted && (colorInputs, rtl, downToUp, changeCanvasColor());
	// $: colorInputs[colorInputs.length - 1].colorUntil = rows * columns;
	// $: mounted && (rows, columns, xGap, yGap, zoom, colorInputs, drawCanvas());
	//
	function canvasToSVG(e) {
		const svg = canv2.toSVG();

		var svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
		var svgUrl = URL.createObjectURL(svgBlob);
		e.href = svgUrl;

		//convert the existing canvas to an svg element and download it
	}
	function downloadSVGAsText() {
		const svg = document.querySelector('svg');
		const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
		const a = document.createElement('a');
		const e = new MouseEvent('click');
		a.download = 'download.svg';
		a.href = 'data:image/svg+xml;base64,' + base64doc;
		a.dispatchEvent(e);
	}
	function downloadCanvasAsPNG(e) {
		// canv2.scale(30);

		let dataURL = canvas2.toDataURL({
			multiplier: 1
		});

		dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

		/* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
		dataURL = dataURL.replace(
			/^data:application\/octet-stream/,
			'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png'
		);

		e.href = dataURL;
	}
	function typeF() {
		return type.replace(/People/g, () => {
			// Randomly decide whether to replace with "people"
			return Math.random() < 0.5 ? 'Person' : 'People';
		});
	}
</script>

<!-- TODO: Set the SEO Tags for the Page -->
<SubPageMetaTags
	pageTitle="Create your own {typeF()} in seconds - {typeF()} Maker"
	pageDescription="Create your own {typeF()} in seconds. Just set the settings and download your Person Graph as PNG or SVG. No registration needed. For free."
></SubPageMetaTags>

<section class="z-10 mx-5 flex flex-col gap-5 pt-20 lg:mx-52 lg:flex-row lg:gap-20">
	<div class="flex shrink-0 flex-col gap-5">
		<div class="">
			<h1 class="mb-5 text-center text-2xl font-light">Create your {typeF()} in Seconds</h1>
			<div class="inline">
				<h2 class="inline font-semibold">Settings</h2>
				<Button variant="secondary" on:click={() => reset()} class=" h-6 px-2">Reset</Button>
			</div>

			<div class="mt-2">
				<input
					type="range"
					id="rows"
					name="rows"
					min="0"
					max="50"
					bind:value={rowsLabel}
					on:mouseup={(e) => (rows = e.target.value)}
					on:touchend={(e) => (rows = e.target.value)}
					step="1"
				/>
				<label for="rows">Rows {rowsLabel}</label>
			</div>

			<div>
				<input
					type="range"
					id="columns"
					name="columns"
					min="0"
					max="50"
					bind:value={columnsLabel}
					on:mouseup={(e) => (columns = e.target.value)}
					on:touchend={(e) => (columns = e.target.value)}
					step="1"
				/>

				<label for="columns">Columns {columnsLabel}</label>
			</div>
		</div>

		<div>
			<div>
				<input type="range" id="xgap" bind:value={xGap} min="0" max="50" />
				<label for="xgap">X Gap: {xGap}</label>
			</div>
			<div>
				<input type="range" id="ygap" bind:value={yGap} min="0" max="50" />
				<label for="ygap">Y Gap: {yGap}</label>
			</div>
		</div>

		<div>
			<input type="range" id="zoom" bind:value={zoom} min="0.1" step="0.01" max={7 * baseRatio} />
			<label for="zoom">
				Size: {canvasWidth
					? Math.floor(canvasWidth * zoom * baseRatio) +
						'px x ' +
						Math.floor(canvasHeight * zoom * baseRatio) +
						'px'
					: ''}
			</label>
		</div>
		<ColorPicker bind:colorInputs maxPpl={rows * columns} />

		<div>
			<h2 class="font-semibold">Orientation</h2>

			<input type="checkbox" name="flipY" bind:checked={rtl} id="" />
			<label for="flipY">Flip Horizontal</label>
			<input type="checkbox" name="flipX" bind:checked={downToUp} id="" />
			<label for="flipX">Flip Vertical</label>
		</div>
		<div>
			<h2 class=" mb-2 font-semibold">Icon</h2>
			<div class="flex max-w-full flex-row flex-wrap gap-3">
				<label
					class="rounded-xl px-2 py-1 shadow-xl shadow-gray-400 has-[:checked]:ring-1 has-[:checked]:ring-black"
				>
					<input type="radio" value="person" bind:group={selectedType} class="appearance-none" />
					Person
					<User class="inline fill-black stroke-none" />
				</label>
				<label
					class="rounded-xl px-2 py-1 shadow-xl shadow-gray-400 has-[:checked]:ring-1 has-[:checked]:ring-black"
				>
					<input type="radio" value="circle" bind:group={selectedType} class="appearance-none" />
					Circle
					<Circle class="inline fill-black stroke-none" />
				</label>
				<label
					class="rounded-xl px-2 py-1 shadow-lg shadow-gray-400 has-[:checked]:ring-1 has-[:checked]:ring-black"
				>
					<input
						type="radio"
						value="squareRounded"
						bind:group={selectedType}
						class="appearance-none"
					/>
					Rounded Square
					<Square class="inline fill-black stroke-none" />
				</label>
				<label
					class="block rounded-xl px-2 py-1 shadow-lg shadow-gray-400 has-[:checked]:ring-1 has-[:checked]:ring-black"
				>
					<input type="radio" value="square" bind:group={selectedType} class="  appearance-none" />
					Square
					<!-- svg rectangle square -->
					<svg
						width="20px"
						height="20px"
						class="inline-block"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="20" height="20" rx="0" fill="#000000" />
					</svg>
				</label>
			</div>
			<p class="mt-3">or</p>
			<input
				bind:value={ownSVG}
				placeholder="Paste own SVG code to replace icon"
				class="w-full rounded-lg px-2"
			/>
		</div>
		<div class="mt-5">
			<h3 class="font-semibold">Download</h3>

			<Button
				download="Canvas.png"
				href={'#'}
				class="w-32"
				on:click={(e) => {
					downloadCanvasAsPNG(e.target);
					gtag('event', 'Download PNG', {
						page_location: window.location.href
					});
				}}
			>
				Download PNG
			</Button>
			<Button
				download="Canvas.svg"
				href={'#'}
				class="w-32"
				on:click={(e) => {
					canvasToSVG(e.target);
					gtag('event', 'Download SVG', {
						page_location: window.location.href
					});
				}}
			>
				Download SVG
			</Button>
		</div>

		<!-- <img hidden bind:this={test123} alt="" /> -->
	</div>
	<canvas class="mb-10 lg:mt-20" bind:this={canvas2} />

	<!-- <div class="flex-1 overflow-scroll"> -->
	<!-- <canvas class="mb-5" bind:this={canvas}></canvas> -->
	<!-- </div> -->
	<!-- <hr class="mb-20 h-5 w-full shadow-[0px_-10px_10px_rgba(0,0,0,0.4)]" /> -->
</section>

<!-- <div>
	{#each Array(rows) as row}
		<div class="flex flex-row">
			{#each Array(columns) as column}
				<img src="$lib/images/user.svg" alt="" class="h-5 w-5" />

				<svg
					width="25px"
					height="25px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z"
						fill="#000000"
					/>
					<path
						d="M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z"
						fill="#000000"
					/>
				</svg>
			{/each}
		</div>
	{/each}
</div> -->
<section class="prose z-10 mx-5 flex flex-col gap-5 pt-20 lg:mx-52">
	<h2 class="font-extralight">What Is a {typeF()}?</h2>
	<p>
		In the realm of data visualization, {typeF()}s have emerged as a powerful tool to convey
		demographic information in a visually engaging manner. Unlike traditional pie charts, people
		graphs employ colored icons to represent percentages of different demographic groups, providing
		a clear and accessible way to understand complex demographic data.
	</p>

	<p>
		A {typeF()} is a graphical representation of data that uses human icons, each representing a specific
		percentage of a population. These icons are typically colored to distinguish between different demographic
		categories, allowing viewers to quickly grasp the composition of a given population. This form of
		data visualization is particularly effective in conveying information about diversity, inclusion,
		and various demographic characteristics.
	</p>

	<h3>Key Features of {typeF()}s:</h3>

	<ul>
		<li>
			<strong>Visual Appeal:</strong>
			{typeF()}s are visually appealing and easily capture attention.
		</li>
		<li>
			<strong>Demographic Breakdown:</strong>
			The primary function of a {typeF()} is to illustrate the distribution of a population across different
			demographic groups.
		</li>
		<li>
			<strong>Easy Interpretation:</strong>
			The human brain is naturally wired to recognize and process visual information quickly.
		</li>
		<li>
			<strong>Diversity and Inclusion Focus:</strong>
			{typeF()}s are particularly valuable in contexts where diversity and inclusion are emphasized.
		</li>
	</ul>

	<h3>Applications of Person Graphs:</h3>

	<ol>
		<li>
			<strong>Business and Marketing:</strong>
			Companies often use person graphs to understand their customer base, identify target demographics,
			and tailor marketing strategies to specific audiences.
		</li>
		<li>
			<strong>Human Resources:</strong>
			HR departments utilize person graphs to visualize workforce demographics, track diversity and inclusion
			initiatives, and identify areas for improvement in organizational culture.
		</li>
		<li>
			<strong>Education and Research:</strong>
			Person graphs are employed in educational settings to analyze student demographics, track enrollment
			trends, and guide educational policies.
		</li>
		<li>
			<strong>Public Policy and Governance:</strong>
			Governments and policymakers use person graphs to understand the composition of populations, make
			informed decisions, and address social and economic disparities.
		</li>
	</ol>
</section>
<section class="prose z-10 mx-5 flex flex-col gap-5 pt-20 lg:mx-52">
	<h2 class="font-extralight">Missing features?</h2>
	<p>
		If you are missing a feature, please let us know by clicking the button below and adding it to
		the Canny-Board
	</p>
	<Button href="https://peoplegraphmaker.canny.io/" target="_blank">Request a feature HERE</Button>
	or contribute yourself
	<Button href="https://github.com/Cayllen/peoplegraphmaker" target="_blank">on GitHub</Button>
</section>
