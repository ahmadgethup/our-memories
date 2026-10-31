create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  provider text not null default 'spotify' check (provider in ('spotify', 'youtube')),
  spotify_url text,
  spotify_id text,
  youtube_url text,
  youtube_id text,
  dedication text check (dedication is null or char_length(dedication) <= 180),
  created_at timestamptz not null default now(),
  created_by text check (created_by is null or created_by in ('Tara', 'Ahmad'))
);

alter table public.songs enable row level security;

drop policy if exists "Songs are visible to the couple" on public.songs;
create policy "Songs are visible to the couple"
  on public.songs for select to anon, authenticated using (true);

drop policy if exists "The couple can add songs" on public.songs;
create policy "The couple can add songs"
  on public.songs for insert to anon, authenticated with check (true);

drop policy if exists "The couple can remove songs" on public.songs;
create policy "The couple can remove songs"
  on public.songs for delete to anon, authenticated using (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'songs'
  ) then
    alter publication supabase_realtime add table public.songs;
  end if;
end
$$;
