<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { goto, stores } from '@sapper/app';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import { get, put } from 'utils/axios';
  import Form from 'components/form/UserForm.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';

  const { session } = stores();

  let title = $_('profile.title');
  let errors = [];
  let loading = false;
  let data = {};

  onMount(async () => {
    ({ data } = await get('users/me'));
  });

  const onSave = async (e) => {
    try {
      loading = true;
      const {
        data: { firstName, lastName, email },
      } = await put('users/me', e.detail);
      $session.user = {
        ...$session.user,
        firstName,
        lastName,
        email,
      };
      goto('/admin');
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

<Breadcrumb items={[{ title }]} />
<H4Title title={title} />
<ServerErrors errors={errors} />
<Form {...data} loading={loading} on:save={onSave} />
