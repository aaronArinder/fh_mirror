-- select all materialized views
-- useful if you're resetting triggers, updating mat views, etc.

select
  schemaname
  , matviewname
  , matviewowner
  , ispopulated
  , definition
from pg_matviews
order by schema_name, view_name;
