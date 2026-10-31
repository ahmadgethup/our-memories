alter table public.songs
  add column if not exists provider text not null default 'spotify',
  add column if not exists youtube_url text,
  add column if not exists youtube_id text;

alter table public.songs
  alter column spotify_url drop not null,
  alter column spotify_id drop not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'songs_provider_check'
      and conrelid = 'public.songs'::regclass
  ) then
    alter table public.songs
      add constraint songs_provider_check check (provider in ('spotify', 'youtube'));
  end if;
end
$$;
