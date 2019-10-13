
-- begin transaction; you must enter "commit;" to accept the changes
-- below or "abort;" to end the transaction (especially important if the
-- commands below fail. Let me know if you have any questions

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

-- USERS
create table if not exists users (
  id serial primary key,
  first_name text not null,
  last_name text not null,
  dob date not null,
  sex text not null,
  addresses jsonb,
  phones jsonb,
  password_hash varchar,
  created date not null default now(),
  updated date not null default now()
);

-- QUESTIONS
create table if not exists questions (
  id serial primary key,
  name text not null,
  body text not null,
  type text not null,
  autocomplete text,
  required boolean default false,
  created date not null default now(),
  updated date not null default now(),
);

-- FORMS
create table if not exists forms (
  id serial primary key,
  name text not null,
  questions integer[] not null,
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

