
-- fn for erfreshing mat_new_user_reg
create or replace function refresh_new_user_form()
returns trigger language plpgsql
as $$
begin
    refresh materialized view new_user_form;
    return null;
end $$;

