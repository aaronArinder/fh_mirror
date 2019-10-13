-- questions created in this file:
--   - first_name
--   - last_name
--   - dob
--   - sex
--   - email
--   - confirm_email
--   - username
--   - confirm_username
--   - new_password
--   - confirm_new_password

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'first_name',
    'First Name',
    'text',
    'given-name',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'last_name',
    'Last Name',
    'text',
    'family-name',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'dob',
    'Date of Birth',
    'date',
    'bday',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'sex',
    'Sex',
    'text',
    'sex',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'email',
    'Email',
    'text',
    'email',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'confirm_email',
    'Confirm Email',
    'text',
    'email',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'username',
    'Username',
    'text',
    'username',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'confirm_username',
    'Confirm Username',
    'text',
    'username',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'new_password',
    'Password',
    'text',
    'new-password', -- prevents auto-populating with current pass
    true
  );

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'confirm_new_password',
    'Confirm Password',
    'text',
    'new-password',
    true
  );

