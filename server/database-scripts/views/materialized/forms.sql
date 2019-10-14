-- new user form: used at sign up
drop materialized view if exists "new_user_form";
create materialized view new_user_form
as
  with ordered_data
  as (
    select *
    from questions q
    join unnest((select questions from forms where name = 'new_user_registration'))
      with ordinality arr(id, ord)
      using (id)
    order by arr.ord
  )

  select json_agg(od) "new_user_form" from ordered_data od
;

-- intake form: initial questions for profile
drop materialized view if exists "intake_form";
create materialized view intake_form
as
  with ordered_data
  as (
    select *
    from questions q
    join unnest((select questions from forms where name = 'intake'))
      with ordinality arr(id, ord)
      using (id)
    order by arr.ord
  )

  select json_agg(od) "intake_form" from ordered_data od
;
