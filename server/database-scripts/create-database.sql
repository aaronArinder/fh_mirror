create database family_hope;
\connect family_hope;

\i create-tables.sql;
commit; -- committing since crate-tables.sql is a transaction

BEGIN; -- NB: you'll need to `commit;` at the end

\i ./forms/new_user_registration.sql;

-- order matters on forms.questions. The order of the questions in the db
-- determines how they'll show up on the fe; so, it's crucial to get the
-- order right
insert into forms (name, questions)
values ('new_user_registration',
  -- I don't have time to figure out a better way to reverse the
  -- last N number of question; if you know a better way, open a PR
  -- and let me know!
  (
    select array(
      select id
      from questions
      join unnest((
        select array(
          select id
          from questions
          -- get last 10 created
          order by id desc limit 10
        )
      ))
      with ordinality arr(id, ord)
      using (id)
    )
  )
);


\i ./forms/intake-form.sql;

insert into forms (name, questions)
values ('intake',
  (
    select array(
      select id
      from questions
      join unnest((
        select array(
          select id
          from questions
          order by id desc limit 5
        )
      ))
      with ordinality arr(id, ord)
      using (id)
    )
  )
);

\i ./views/materialized/forms.sql;
\i ./functions/refresh_mat_views.sql;
\i ./triggers/triggers.sql;

