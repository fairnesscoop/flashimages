<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get, del } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Table from './_Table.svelte';

  const title = $_('shipping_costs.breadcrumb');
  let errors = [];
  let items = [];

  const fetchShippingCosts = async () => {
    try {
      items = (await get('shipping-costs')).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const handleDelete = async ({detail}) => {
    try {
      await del(`shipping-costs/${detail}`);
      items = items.filter((item) => item.id !== detail);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  onMount(fetchShippingCosts);
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/admin/shipping-costs/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table {items} on:delete={handleDelete} />
  </div>
</div>
