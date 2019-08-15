
-- begin transaction; you must enter "commit;" to accept the changes
-- below or "abort;" to end the transaction (especially important if the
-- commands below fail

begin;

-- PROFILES
create table if not exists profiles (
  id serial primary key,
  first_name text not null,
  last_name text not null,
  dob date not null,
  sex text not null,
  addresses jsonb,
  phones jsonb,
  created date not null default now(),
  updated date not null default now()
);

create table if not exists users (
  id serial primary key,
  first_name text not null,
  last_name text not null,
  dob date not null,
  sex text not null,
  addresses jsonb,
  phones jsonb,
  created date not null default now(),
  updated date not null default now(),
  password_hash varchar
);

-- QUESTIONS
create table if not exists questions (
  id serial primary key,
  created date not null default now(),
  updated date not null default now()
);

-- ANSWERS
create table if not exists answers (
  id serial primary key,
  -- foreign key on question.id
  question_id integer references questions(id),
  created date not null default now(),
  updated date not null default now()
);

