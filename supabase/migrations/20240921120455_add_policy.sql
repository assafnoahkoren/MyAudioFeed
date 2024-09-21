alter table "public"."jobs" add column "owner_id" uuid;

alter table "public"."jobs" add constraint "jobs_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) not valid;

alter table "public"."jobs" validate constraint "jobs_owner_id_fkey";

create policy "Enable all for users based on owner_id"
on "public"."jobs"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = owner_id))
with check ((( SELECT auth.uid() AS uid) = owner_id));



