<script context="module">
  export const preload = ({ params: { id, shootingId } }) => {
    return { id, shootingId };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Link from 'components/links/Link.svelte';

  export let id;
  export let shootingId;

  let title;
  let school;
  let shooting;
  let errors = [];

  onMount(async () => {
    try {
      const [ schoolResponse, shootingResponse ] = await Promise.all([
        get(`schools/${id}`),
        get(`schools/${id}/shootings/${shootingId}`)
      ]);
      school = schoolResponse.data;
      shooting = shootingResponse.data;
      title = shooting.name;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[
  { title: $_('schools.breadcrumb'), path: '/admin/schools' },
  { title: school?.name, path: `/admin/schools/${id}` },
  { title: $_('schools.shootings.title'), path: `/admin/schools/${id}/shootings` },
  { title }
]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  {#if shooting}
    <Link href={`/admin/schools/${id}/shootings/${shooting.id}/edit`} value={$_('common.form.edit')} />
  {/if}
</div>
<ServerErrors {errors} />
