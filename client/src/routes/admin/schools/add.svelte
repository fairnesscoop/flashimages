<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let loading = false;
  let title = $_('schools.add.title');
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      const { data } = await post('schools', e.detail);
      goto(`/admin/schools/${data.id}`);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('schools.breadcrumb'), path: '/admin/schools' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
