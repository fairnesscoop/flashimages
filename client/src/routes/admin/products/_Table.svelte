<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'normalizer/money';
  import { createEventDispatcher } from 'svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';
  import EditLink from 'components/links/EditLink.svelte';

  const dispatch = createEventDispatcher();

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('products.list.title')}</th>
      <th class="px-4 py-3">{$_('products.list.description')}</th>
      <th class="px-4 py-3">{$_('products.list.unit_price')}</th>
      <th class="px-4 py-3">{$_('products.list.weight')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, title, description, unitPrice, weight } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{title}</td>
        <td class="px-4 py-3 text-sm">{description}</td>
        <td class="px-4 py-3 text-sm">{format(unitPrice)}</td>
        <td class="px-4 py-3 text-sm">{$_('products.list.grams', { values: { weight } })}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <EditLink href={`/admin/products/${id}/edit`} />
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage={"products.delete.confirm"} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
