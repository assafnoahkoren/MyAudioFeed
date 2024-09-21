## How to Create a Migration with Supabase

1. Edit the local db schema.

2. Generate the migration:
   ```
   supabase db diff -f <migration_name>
   ```

3. Review the migration file in `supabase/migrations`.

4. Deploy the migration:
   ```
   supabase db push
   ```

5. Verify the changes in Supabase dashboard.
