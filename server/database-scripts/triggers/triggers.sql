-- refresh mat_new_user_reg after change to forms table
create trigger refresh_new_user_form
after insert or update or delete or truncate
on forms for each statement
execute procedure refresh_new_user_form();

