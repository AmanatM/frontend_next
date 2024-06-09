create extension if not exists "moddatetime" with schema "extensions";


create type "public"."question_difficulty" as enum ('Easy', 'Medium', 'Hard');

create type "public"."question_type" as enum ('user_interface', 'javascript');

create type "public"."sandpackTemplates" as enum ('static', 'vite-react', 'vanilla', 'react');

create type "public"."user_roles" as enum ('admin');

create table "public"."coding_question_files_code" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "question_id" uuid,
    "code" text,
    "tests" text,
    "language" text default 'javascript'::text
);


alter table "public"."coding_question_files_code" enable row level security;

create table "public"."coding_question_files_ui" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "question_id" uuid,
    "language" text,
    "content" text,
    "path" text not null,
    "solution_code" text,
    "name" text not null default ''::text
);


alter table "public"."coding_question_files_ui" enable row level security;

create table "public"."coding_questions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "title" text not null,
    "description" text not null,
    "solution" text,
    "difficulty" question_difficulty not null default 'Easy'::question_difficulty,
    "sandpack_template" "sandpackTemplates" not null default 'static'::"sandpackTemplates",
    "question_type" question_type not null default 'user_interface'::question_type,
    "short_description" text
);


alter table "public"."coding_questions" enable row level security;

create table "public"."user_completed_code_question" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "question_id" uuid not null
);


alter table "public"."user_completed_code_question" enable row level security;

create table "public"."user_saved_question_files" (
    "created_at" timestamp with time zone not null default now(),
    "content" text,
    "user_id" uuid not null,
    "updated_at" timestamp with time zone,
    "path" text,
    "file_id" uuid not null,
    "question_id" uuid
);


alter table "public"."user_saved_question_files" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "role" user_roles
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX coding_question_files_code_pkey ON public.coding_question_files_code USING btree (id);

CREATE UNIQUE INDEX coding_question_files_pkey ON public.coding_question_files_ui USING btree (id);

CREATE UNIQUE INDEX coding_questions_pkey ON public.coding_questions USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX user_completed_code_question_pkey ON public.user_completed_code_question USING btree (user_id, question_id);

CREATE UNIQUE INDEX user_saved_coding_question_files_pkey ON public.user_saved_question_files USING btree (user_id, file_id);

alter table "public"."coding_question_files_code" add constraint "coding_question_files_code_pkey" PRIMARY KEY using index "coding_question_files_code_pkey";

alter table "public"."coding_question_files_ui" add constraint "coding_question_files_pkey" PRIMARY KEY using index "coding_question_files_pkey";

alter table "public"."coding_questions" add constraint "coding_questions_pkey" PRIMARY KEY using index "coding_questions_pkey";

alter table "public"."user_completed_code_question" add constraint "user_completed_code_question_pkey" PRIMARY KEY using index "user_completed_code_question_pkey";

alter table "public"."user_saved_question_files" add constraint "user_saved_coding_question_files_pkey" PRIMARY KEY using index "user_saved_coding_question_files_pkey";

alter table "public"."users" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."coding_question_files_code" add constraint "coding_question_files_code_question_id_fkey" FOREIGN KEY (question_id) REFERENCES coding_questions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."coding_question_files_code" validate constraint "coding_question_files_code_question_id_fkey";

alter table "public"."coding_question_files_ui" add constraint "coding_question_files_question_id_fkey" FOREIGN KEY (question_id) REFERENCES coding_questions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."coding_question_files_ui" validate constraint "coding_question_files_question_id_fkey";

alter table "public"."user_completed_code_question" add constraint "user_completed_code_question_question_id_fkey" FOREIGN KEY (question_id) REFERENCES coding_questions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_completed_code_question" validate constraint "user_completed_code_question_question_id_fkey";

alter table "public"."user_completed_code_question" add constraint "user_completed_code_question_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_completed_code_question" validate constraint "user_completed_code_question_user_id_fkey";

alter table "public"."user_saved_question_files" add constraint "user_saved_coding_question_files_file_id_fkey" FOREIGN KEY (file_id) REFERENCES coding_question_files_ui(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_saved_question_files" validate constraint "user_saved_coding_question_files_file_id_fkey";

alter table "public"."user_saved_question_files" add constraint "user_saved_coding_question_files_question_id_fkey" FOREIGN KEY (question_id) REFERENCES coding_questions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_saved_question_files" validate constraint "user_saved_coding_question_files_question_id_fkey";

alter table "public"."user_saved_question_files" add constraint "user_saved_question_files_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_saved_question_files" validate constraint "user_saved_question_files_user_id_fkey";

alter table "public"."users" add constraint "public_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "public_profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users (id)
  values (new.id);
  return new;
end;$function$
;

grant delete on table "public"."coding_question_files_code" to "anon";

grant insert on table "public"."coding_question_files_code" to "anon";

grant references on table "public"."coding_question_files_code" to "anon";

grant select on table "public"."coding_question_files_code" to "anon";

grant trigger on table "public"."coding_question_files_code" to "anon";

grant truncate on table "public"."coding_question_files_code" to "anon";

grant update on table "public"."coding_question_files_code" to "anon";

grant delete on table "public"."coding_question_files_code" to "authenticated";

grant insert on table "public"."coding_question_files_code" to "authenticated";

grant references on table "public"."coding_question_files_code" to "authenticated";

grant select on table "public"."coding_question_files_code" to "authenticated";

grant trigger on table "public"."coding_question_files_code" to "authenticated";

grant truncate on table "public"."coding_question_files_code" to "authenticated";

grant update on table "public"."coding_question_files_code" to "authenticated";

grant delete on table "public"."coding_question_files_code" to "service_role";

grant insert on table "public"."coding_question_files_code" to "service_role";

grant references on table "public"."coding_question_files_code" to "service_role";

grant select on table "public"."coding_question_files_code" to "service_role";

grant trigger on table "public"."coding_question_files_code" to "service_role";

grant truncate on table "public"."coding_question_files_code" to "service_role";

grant update on table "public"."coding_question_files_code" to "service_role";

grant delete on table "public"."coding_question_files_ui" to "anon";

grant insert on table "public"."coding_question_files_ui" to "anon";

grant references on table "public"."coding_question_files_ui" to "anon";

grant select on table "public"."coding_question_files_ui" to "anon";

grant trigger on table "public"."coding_question_files_ui" to "anon";

grant truncate on table "public"."coding_question_files_ui" to "anon";

grant update on table "public"."coding_question_files_ui" to "anon";

grant delete on table "public"."coding_question_files_ui" to "authenticated";

grant insert on table "public"."coding_question_files_ui" to "authenticated";

grant references on table "public"."coding_question_files_ui" to "authenticated";

grant select on table "public"."coding_question_files_ui" to "authenticated";

grant trigger on table "public"."coding_question_files_ui" to "authenticated";

grant truncate on table "public"."coding_question_files_ui" to "authenticated";

grant update on table "public"."coding_question_files_ui" to "authenticated";

grant delete on table "public"."coding_question_files_ui" to "service_role";

grant insert on table "public"."coding_question_files_ui" to "service_role";

grant references on table "public"."coding_question_files_ui" to "service_role";

grant select on table "public"."coding_question_files_ui" to "service_role";

grant trigger on table "public"."coding_question_files_ui" to "service_role";

grant truncate on table "public"."coding_question_files_ui" to "service_role";

grant update on table "public"."coding_question_files_ui" to "service_role";

grant delete on table "public"."coding_questions" to "anon";

grant insert on table "public"."coding_questions" to "anon";

grant references on table "public"."coding_questions" to "anon";

grant select on table "public"."coding_questions" to "anon";

grant trigger on table "public"."coding_questions" to "anon";

grant truncate on table "public"."coding_questions" to "anon";

grant update on table "public"."coding_questions" to "anon";

grant delete on table "public"."coding_questions" to "authenticated";

grant insert on table "public"."coding_questions" to "authenticated";

grant references on table "public"."coding_questions" to "authenticated";

grant select on table "public"."coding_questions" to "authenticated";

grant trigger on table "public"."coding_questions" to "authenticated";

grant truncate on table "public"."coding_questions" to "authenticated";

grant update on table "public"."coding_questions" to "authenticated";

grant delete on table "public"."coding_questions" to "service_role";

grant insert on table "public"."coding_questions" to "service_role";

grant references on table "public"."coding_questions" to "service_role";

grant select on table "public"."coding_questions" to "service_role";

grant trigger on table "public"."coding_questions" to "service_role";

grant truncate on table "public"."coding_questions" to "service_role";

grant update on table "public"."coding_questions" to "service_role";

grant delete on table "public"."user_completed_code_question" to "anon";

grant insert on table "public"."user_completed_code_question" to "anon";

grant references on table "public"."user_completed_code_question" to "anon";

grant select on table "public"."user_completed_code_question" to "anon";

grant trigger on table "public"."user_completed_code_question" to "anon";

grant truncate on table "public"."user_completed_code_question" to "anon";

grant update on table "public"."user_completed_code_question" to "anon";

grant delete on table "public"."user_completed_code_question" to "authenticated";

grant insert on table "public"."user_completed_code_question" to "authenticated";

grant references on table "public"."user_completed_code_question" to "authenticated";

grant select on table "public"."user_completed_code_question" to "authenticated";

grant trigger on table "public"."user_completed_code_question" to "authenticated";

grant truncate on table "public"."user_completed_code_question" to "authenticated";

grant update on table "public"."user_completed_code_question" to "authenticated";

grant delete on table "public"."user_completed_code_question" to "service_role";

grant insert on table "public"."user_completed_code_question" to "service_role";

grant references on table "public"."user_completed_code_question" to "service_role";

grant select on table "public"."user_completed_code_question" to "service_role";

grant trigger on table "public"."user_completed_code_question" to "service_role";

grant truncate on table "public"."user_completed_code_question" to "service_role";

grant update on table "public"."user_completed_code_question" to "service_role";

grant delete on table "public"."user_saved_question_files" to "anon";

grant insert on table "public"."user_saved_question_files" to "anon";

grant references on table "public"."user_saved_question_files" to "anon";

grant select on table "public"."user_saved_question_files" to "anon";

grant trigger on table "public"."user_saved_question_files" to "anon";

grant truncate on table "public"."user_saved_question_files" to "anon";

grant update on table "public"."user_saved_question_files" to "anon";

grant delete on table "public"."user_saved_question_files" to "authenticated";

grant insert on table "public"."user_saved_question_files" to "authenticated";

grant references on table "public"."user_saved_question_files" to "authenticated";

grant select on table "public"."user_saved_question_files" to "authenticated";

grant trigger on table "public"."user_saved_question_files" to "authenticated";

grant truncate on table "public"."user_saved_question_files" to "authenticated";

grant update on table "public"."user_saved_question_files" to "authenticated";

grant delete on table "public"."user_saved_question_files" to "service_role";

grant insert on table "public"."user_saved_question_files" to "service_role";

grant references on table "public"."user_saved_question_files" to "service_role";

grant select on table "public"."user_saved_question_files" to "service_role";

grant trigger on table "public"."user_saved_question_files" to "service_role";

grant truncate on table "public"."user_saved_question_files" to "service_role";

grant update on table "public"."user_saved_question_files" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Enable read access for all users"
on "public"."coding_question_files_code"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."coding_question_files_ui"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."coding_questions"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."user_completed_code_question"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."user_completed_code_question"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable select for users based on user_id"
on "public"."user_completed_code_question"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable delete for users based on user_id"
on "public"."user_saved_question_files"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."user_saved_question_files"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable select for users based on user_id"
on "public"."user_saved_question_files"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for users based on user_id"
on "public"."user_saved_question_files"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable select for users based on id"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_saved_question_files FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


