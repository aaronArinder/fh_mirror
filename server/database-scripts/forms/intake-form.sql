-- questions created in this file:
--   - judge_name
--   - attorny
--   - court_date
--   - separation_length
--   - children

insert into questions
  (
    name,
    body,
    type,
    required
  ) values (
    'judge_name',
    'Judge''s Name',
    'text',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    required
  ) values (
    'attorny',
    'Attorny''s Name',
    'text',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    required
  ) values (
    'court_date',
    'Court Date',
    'court_date',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    required
  ) values (
    'separation_length',
    'Length of Separation in Months',
    'number',
    true
  );

insert into questions
  (
    name,
    body,
    type,
    required
  ) values (
    'children',
    'Number of Children',
    'number',
    true
  );
