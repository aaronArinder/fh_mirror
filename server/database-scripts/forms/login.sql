-- questions created in this file
--   - password
--
-- username question created in new_user_registration.sql

insert into questions
  (
    name,
    body,
    type,
    autocomplete,
    required
  ) values (
    'password',
    'Password',
    'text',
    'current-password',
    true
  );

