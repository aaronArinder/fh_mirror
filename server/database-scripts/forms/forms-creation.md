#### Overview
There can't be a script for form creation because we don't know what question IDs to put in the `questions` field. So, you'll want to get those IDs, and then run:

```
  insert into forms  (name, questions)
  values ('new_user_registration', '{ordered_q_ids_go_here}');
```

Note that the question IDs are to be ordered. Whatever order you want them to show up in the form, make it so that they're ordered that way in the `questions` field.

