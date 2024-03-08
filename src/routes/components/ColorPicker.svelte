<script>
	export let colorInputs;
	export let maxPpl;
	export let barChartMode = false;
	import { Input } from '$lib/components/ui/input';

	import { Button } from '$lib/components/ui/button';
	import { Trash, Trash2 } from 'lucide-svelte';

	function handleAddColor() {
		colorInputs = [
			...colorInputs,
			{
				id: `color${colorInputs.length + 1}`,
				label: `Color ${colorInputs.length + 1}`,
				value: `#${Math.floor(Math.random() * 0xffffff)
					.toString(16)
					.padStart(6, '0')}`,
				colorUntil: colorInputs.length + 1
			}
		];
	}

	function handleRemoveColor(idx) {
		colorInputs = colorInputs.filter((_, ele) => ele !== idx);
	}
	function getColorPositionOutput(lower, upper) {
		if (lower < upper) {
			return 'Person ' + lower + ' - ' + upper;
		} else if (lower === upper) {
			return 'Only Person ' + lower;
		} else {
			return 'Not Shown';
		}
	}
</script>

<div class="flex max-w-4xl flex-col gap-2">
	<h3 class="font-semibold">Colors</h3>
	{#each colorInputs as { id, label, value, colorUntil }, ii}
		<div class="flex flex-row gap-2 pt-2">
			<div class="flex flex-1 flex-col gap-1 self-center">
				<div>
					<input class="w-1/4" type="color" bind:value {id} />
					{#if !barChartMode}
						<input
							hidden={ii === colorInputs.length - 1}
							type="range"
							step="0.5"
							bind:value={colorUntil}
							min={colorInputs[ii - 1]?.colorUntil + 1 || 1}
							max={colorInputs[ii + 1]?.colorUntil || maxPpl}
						/>
						<input
							type="number"
							hidden={ii === colorInputs.length - 1}
							bind:value={colorUntil}
							class="w-20 bg-slate-300 text-center"
							min={colorInputs[ii - 1]?.colorUntil + 1 || 1}
							max={colorInputs[ii + 1]?.colorUntil || maxPpl}
							id=""
						/>
					{/if}
				</div>

				<div class="flex flex-row gap-2">
					<!-- {colorInputs[ii - 1]?.colorUntil + 1 || 1} -->
					<!-- <label for={id}>{label}</label> -->
					{#if !barChartMode}
						<p class="basis-1/2">
							{getColorPositionOutput(
								colorInputs[ii - 1]?.colorUntil + 1 || 1,
								colorUntil > maxPpl ? maxPpl : colorUntil
							)}
						</p>
						<p class="">
							{(colorUntil > maxPpl ? maxPpl : colorUntil) - (colorInputs[ii - 1]?.colorUntil || 0)}
							Total
							<!-- <input
					type="number"
					min={colorInputs[ii - 1]?.colorUntil + 1 || 1}
					max={colorInputs[ii + 1]?.colorUntil || maxPpl}
					name="Amount ppl"
					bind:value={colorUntil}
					id=""
				/>
				PPL -->
						</p>
					{:else}
						{ii === 0 ? 'Full Icons' : 'Half Icons'}
					{/if}
				</div>
			</div>
			{#if !barChartMode}
				<Button
					variant="destructive"
					class="w-fit px-2 {colorInputs.length > 1 ? 'visible' : 'invisible'}"
					on:click={() => handleRemoveColor(ii)}
				>
					<Trash2 strokeWidth="1" size="20" />
				</Button>
			{/if}
		</div>
		<hr class={colorInputs.length - 1 === ii ? 'hidden' : 'mx-5 h-[2px] bg-black/20'} />
	{/each}
	{#if !barChartMode}
		<Button on:click={handleAddColor} variant="" class="w-32 opacity-70 ">Add Color</Button>
	{/if}
</div>
