<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import PhotoIcon from 'components/icons/PhotoIcon.svelte';
  import { get } from 'utils/axios';
  
  export let id;

  let total = 0;

  onMount(async () => {
    try {
      total = (await get(`schools/${id}/count-shootings`)).data.total;
    } catch (e) {
      total = 0;
    }
  });
</script>

<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
  <a href={`/admin/schools/${id}/shootings`}>
    <div class="p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
      <PhotoIcon className={'w-5 h-5'}/>
    </div>
  </a>
  <div>
    <a href={`/admin/schools/${id}/shootings`}>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.shooting')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {total}
      </p>
    </a>
  </div>
</div>
