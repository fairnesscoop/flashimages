<script context="module">
  export const preload = ({ query }) => {
    return {
      page: query.page || 1,
    };
  };
</script>

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
  import Pagination from 'components/Pagination.svelte';
  import { historyPushState } from 'utils/url';

  export let page;

  let title = $_('products.breadcrumb');
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('admin/products', { page });
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      response = (await get('products', { params: { page } })).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const handleDelete = async ({detail}) => {
    try {
      await del(`products/${detail}`);
      response.items = response.items.filter((item) => item.id !== detail);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  onMount(fetchProducts);
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/admin/products/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items={response.items} on:delete={handleDelete} />
  </div>
  <Pagination
    on:change={changePage}
    currentPage={page}
    totalItems={response.totalItems}
    pageCount={response.pageCount} />
</div>
