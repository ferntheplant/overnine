<script type="typescript">
  import { computeFinalResults, testUser, UserProps, ResultsProps } from '$lib/calculator';

  let user = testUser;

  $: results = computeFinalResults(user);
</script>

<div class="pl-2">
  <h1 class="text-lg">Inputs</h1>
  <div class="grid grid-cols-2">
    {#each UserProps as prop}
      <div>{prop}:</div>
      {#if typeof user[prop] === 'boolean'}
        <input type="checkbox" bind:checked={user[prop]} />
      {:else}
        <input bind:value={user[prop]} />
      {/if}
    {/each}
  </div>
  <div class="text-center">--------- RESULTS -----------</div>
  {#each ResultsProps as prop}
    <div class="columns-2">
      <div class="w-full">{prop}:</div>
      <div class="w-full">{results[prop]}</div>
    </div>
  {/each}
</div>
