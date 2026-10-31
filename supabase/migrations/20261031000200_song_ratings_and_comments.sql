create table if not exists public.song_ratings (
  song_id uuid not null references public.songs(id) on delete cascade,
  user_name text not null check (user_name in ('Tara', 'Ahmad')),
  rating integer not null check (rating between 1 and 5),
  updated_at timestamptz not null default now(),
  primary key (song_id, user_name)
);

create table if not exists public.song_comments (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 240),
  created_at timestamptz not null default now(),
  created_by text check (created_by is null or created_by in ('Tara', 'Ahmad'))
);

alter table public.song_ratings enable row level security;
alter table public.song_comments enable row level security;

drop policy if exists "Couple can read song ratings" on public.song_ratings;
create policy "Couple can read song ratings"
  on public.song_ratings for select to anon, authenticated using (true);

drop policy if exists "Couple can add song ratings" on public.song_ratings;
create policy "Couple can add song ratings"
  on public.song_ratings for insert to anon, authenticated with check (true);

drop policy if exists "Couple can update song ratings" on public.song_ratings;
create policy "Couple can update song ratings"
  on public.song_ratings for update to anon, authenticated using (true) with check (true);

drop policy if exists "Couple can read song comments" on public.song_comments;
create policy "Couple can read song comments"
  on public.song_comments for select to anon, authenticated using (true);

drop policy if exists "Couple can add song comments" on public.song_comments;
create policy "Couple can add song comments"
  on public.song_comments for insert to anon, authenticated with check (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'song_ratings'
  ) then
    alter publication supabase_realtime add table public.song_ratings;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'song_comments'
  ) then
    alter publication supabase_realtime add table public.song_comments;
  end if;
end
$$;
