<script>
  import Button from '../Button.svelte';
  import {Form, Field} from '../Form'
</script>

<Form on:submit={() => {}}>
  <Field label="Username" name="username" type="text" validate={() => {}} />
  <Field label="Email" name="email" type="email" validate={() => {}} />
  <Field label="Password" name="password" type="password" validate={() => {}} />
  <Button type="submit">Submit</Button>
</Form>