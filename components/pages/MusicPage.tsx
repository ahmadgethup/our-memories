"use client";

import type { Song, SongComment, SongRating, UserName } from "../../types";
import { IconMusic, IconTrash } from "../icons";

type Props = {
  songs: Song[];
  currentUser: UserName | null;
  title: string;
  setTitle: (value: string) => void;
  spotifyUrl: string;
  setSpotifyUrl: (value: string) => void;
  provider: "spotify" | "youtube";
  setProvider: (provider: "spotify" | "youtube") => void;
  dedication: string;
  setDedication: (value: string) => void;
  loading: boolean;
  songSetupNeeded: boolean;
  youtubeSetupNeeded: boolean;
  feedbackSetupNeeded: boolean;
  ratings: SongRating[];
  comments: SongComment[];
  commentDraft: string;
  setCommentDraft: (value: string) => void;
  feedbackSaving: boolean;
  rateSelectedSong: (rating: number) => void;
  addSongComment: () => void;
  addSong: () => void;
  deleteSong: (id: string) => void;
  selectedSongId: string | null;
  songPickedBy: UserName | null;
  chooseSong: (id: string) => void;
};

export default function MusicPage({
  songs,
  currentUser,
  title,
  setTitle,
  spotifyUrl,
  setSpotifyUrl,
  provider,
  setProvider,
  dedication,
  setDedication,
  loading,
  songSetupNeeded,
  youtubeSetupNeeded,
  feedbackSetupNeeded,
  ratings,
  comments,
  commentDraft,
  setCommentDraft,
  feedbackSaving,
  rateSelectedSong,
  addSongComment,
  addSong,
  deleteSong,
  selectedSongId,
  songPickedBy,
  chooseSong,
}: Props) {
  const selectedSong =
    songs.find((song) => song.id === selectedSongId) ?? songs[0];
  const selectedRatings = selectedSong
    ? ratings.filter((rating) => rating.song_id === selectedSong.id)
    : [];
  const myRating =
    selectedRatings.find((rating) => rating.user_name === currentUser)
      ?.rating ?? 0;
  const combinedRating = selectedRatings.length
    ? (
        selectedRatings.reduce((sum, rating) => sum + rating.rating, 0) /
        selectedRatings.length
      ).toFixed(1)
    : null;
  const selectedComments = selectedSong
    ? comments.filter((comment) => comment.song_id === selectedSong.id)
    : [];

  return (
    <div className="soundtrack-page fade-up">
      <section className="soundtrack-hero">
        <div className="soundtrack-orbit soundtrack-orbit-one" />
        <div className="soundtrack-orbit soundtrack-orbit-two" />
        <div className="soundtrack-hero-copy">
          <span className="soundtrack-kicker">A LITTLE MUSIC BOX FOR TWO</span>
          <h2>Songs</h2>
          <p>.</p>
        </div>
        <div className="soundtrack-disc" aria-hidden="true">
          <span className="soundtrack-disc-groove" />
          <span className="soundtrack-disc-label">
            <IconMusic size={25} />
          </span>
        </div>
        <div className="soundtrack-hero-note">
          Made of our songs <span>♡</span>
        </div>
      </section>

      {songSetupNeeded && (
        <div className="soundtrack-setup-notice" role="status">
          <strong>One little setup step before we can save songs</strong>
          <span>
            In Supabase, open SQL Editor and run{" "}
            <code>supabase/migrations/20261031000000_create_songs.sql</code>.
            Then refresh this page.
          </span>
        </div>
      )}
      {!songSetupNeeded && youtubeSetupNeeded && (
        <div className="soundtrack-setup-notice" role="status">
          <strong>One quick update to enable YouTube songs</strong>
          <span>
            In Supabase, open SQL Editor and run{" "}
            <code>
              supabase/migrations/20261031000100_add_youtube_links.sql
            </code>
            . Then refresh this page.
          </span>
        </div>
      )}
      {!songSetupNeeded && feedbackSetupNeeded && (
        <div className="soundtrack-setup-notice" role="status">
          <strong>One more tiny setup for ratings and comments</strong>
          <span>
            In Supabase SQL Editor, run{" "}
            <code>
              supabase/migrations/20261031000200_song_ratings_and_comments.sql
            </code>
            , then refresh this page.
          </span>
        </div>
      )}

      <div className="soundtrack-layout">
        <section className="soundtrack-player-card">
          <div className="soundtrack-section-heading">
            <div>
              <span className="soundtrack-kicker">THE SONG WE PICKED</span>
              <h3>Stay here a little</h3>
            </div>
            <span
              className="soundtrack-live-dot"
              title="Your shared song choice updates live"
            />
          </div>

          {selectedSong ? (
            <>
              <div className="soundtrack-now-title">{selectedSong.title}</div>
              <p className="soundtrack-picked-by">
                {songPickedBy
                  ? `${
                      songPickedBy === currentUser ? "You" : songPickedBy
                    } picked this song for us ♡`
                  : "Choose a song from your collection to share it with each other ♡"}
              </p>
              {selectedSong.provider === "youtube" &&
              selectedSong.youtube_id ? (
                <iframe
                  key={`youtube-${selectedSong.youtube_id}`}
                  className="soundtrack-spotify-player soundtrack-youtube-player"
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                    selectedSong.youtube_id
                  )}?rel=0`}
                  width="100%"
                  height="225"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  title={`Watch ${selectedSong.title} on YouTube`}
                />
              ) : selectedSong.spotify_id ? (
                <iframe
                  key={`spotify-${selectedSong.spotify_id}`}
                  className="soundtrack-spotify-player"
                  src={`https://open.spotify.com/embed/track/${encodeURIComponent(
                    selectedSong.spotify_id
                  )}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Listen to ${selectedSong.title} on Spotify`}
                />
              ) : null}
              <p className="soundtrack-together-hint">
                When one of you picks a song, it appears here for the other.
                Press play on both devices to listen together.
              </p>
            </>
          ) : (
            <div className="soundtrack-empty-player">
              <div className="soundtrack-empty-note">♫</div>
              <h4>Your first song is waiting</h4>
              <p>
                Add a Spotify track or YouTube video and leave a tiny
                dedication.
              </p>
            </div>
          )}
        </section>

        <section className="soundtrack-add-card">
          <div className="soundtrack-section-heading">
            <div>
              <span className="soundtrack-kicker">
                ADD TO OUR LITTLE COLLECTION
              </span>
              <h3>Save us a song</h3>
            </div>
            <span className="soundtrack-add-heart">♡</span>
          </div>
          <label className="soundtrack-label" htmlFor="song-title">
            Song title
          </label>
          <input
            id="song-title"
            className="field"
            type="text"
            maxLength={100}
            placeholder="The song that feels like us…"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label className="soundtrack-label">Choose where to listen</label>
          <div
            className="soundtrack-provider-switch"
            role="group"
            aria-label="Choose a music service"
          >
            <button
              type="button"
              className={
                provider === "spotify" ? "soundtrack-provider-active" : ""
              }
              onClick={() => setProvider("spotify")}
            >
              ♫ Spotify
            </button>
            <button
              type="button"
              className={
                provider === "youtube" ? "soundtrack-provider-active" : ""
              }
              onClick={() => setProvider("youtube")}
            >
              ▶ YouTube
            </button>
          </div>
          <label className="soundtrack-label" htmlFor="song-spotify">
            {provider === "spotify"
              ? "Spotify track link"
              : "YouTube video link"}
          </label>
          <input
            id="song-spotify"
            className="field"
            type="url"
            placeholder={
              provider === "spotify"
                ? "https://open.spotify.com/track/…"
                : "https://youtu.be/… or youtube.com/watch?v=…"
            }
            value={spotifyUrl}
            onChange={(event) => setSpotifyUrl(event.target.value)}
          />
          <label className="soundtrack-label" htmlFor="song-dedication">
            A little note (optional)
          </label>
          <textarea
            id="song-dedication"
            className="field field-ta soundtrack-dedication"
            maxLength={180}
            placeholder="This reminds me of our rainy-night drive…"
            value={dedication}
            onChange={(event) => setDedication(event.target.value)}
          />
          <button
            className="submit-btn"
            onClick={addSong}
            disabled={loading || songSetupNeeded || youtubeSetupNeeded}
          >
            {loading ? (
              <span className="spinner" />
            ) : songSetupNeeded || youtubeSetupNeeded ? (
              "Set up songs first"
            ) : (
              <>
                <IconMusic size={18} /> Add our song
              </>
            )}
          </button>
          <p className="soundtrack-added-as">
            Adding as {currentUser ?? "yourself"} · Spotify tracks or YouTube
            videos
          </p>
        </section>
      </div>

      <section className="soundtrack-feedback-card">
        <div className="soundtrack-section-heading">
          <div>
            <span className="soundtrack-kicker">
              A LITTLE MEMORY IN THE MUSIC
            </span>
            <h3>What does this song feel like?</h3>
          </div>
          {combinedRating && (
            <div className="soundtrack-combined-rating">
              <span>OUR RATING</span>
              <strong>
                ★ {combinedRating}
                <small> / 5</small>
              </strong>
            </div>
          )}
        </div>
        {selectedSong ? (
          <>
            <div className="soundtrack-rating-pair">
              {(["Tara", "Ahmad"] as const).map((name) => {
                const value =
                  selectedRatings.find((rating) => rating.user_name === name)
                    ?.rating ?? 0;
                return (
                  <div className="soundtrack-person-rating" key={name}>
                    <span>{name === currentUser ? `${name} · you` : name}</span>
                    <span
                      className="soundtrack-rating-stars"
                      aria-label={
                        value ? `${value} out of 5 stars` : "Not rated yet"
                      }
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          className={
                            star <= value ? "soundtrack-star-filled" : ""
                          }
                          key={star}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <small>{value ? `${value} / 5` : "Not rated yet"}</small>
                  </div>
                );
              })}
            </div>

            <div className="soundtrack-your-rating">
              <span>{myRating ? "Change your rating" : "Your rating"}</span>
              <div
                className="soundtrack-rating-picker"
                role="group"
                aria-label="Rate this song from one to five stars"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => rateSelectedSong(star)}
                    disabled={feedbackSaving || feedbackSetupNeeded}
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={myRating === star}
                    className={star <= myRating ? "soundtrack-star-filled" : ""}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="soundtrack-comments-area">
              <label className="soundtrack-label" htmlFor="song-comment">
                Leave a little comment about “{selectedSong.title}”
              </label>
              <div className="soundtrack-comment-compose">
                <textarea
                  id="song-comment"
                  className="field field-ta"
                  maxLength={240}
                  placeholder="This song makes me remember…"
                  value={commentDraft}
                  onChange={(event) => setCommentDraft(event.target.value)}
                  disabled={feedbackSetupNeeded}
                />
                <button
                  className="submit-btn"
                  onClick={addSongComment}
                  disabled={
                    feedbackSaving ||
                    feedbackSetupNeeded ||
                    !commentDraft.trim()
                  }
                >
                  {feedbackSaving ? (
                    <span className="spinner" />
                  ) : (
                    "Save "
                  )}
                </button>
              </div>
              <div className="soundtrack-comment-list">
                {selectedComments.length ? (
                  selectedComments.map((comment) => (
                    <article className="soundtrack-comment" key={comment.id}>
                      <div className="soundtrack-comment-meta">
                        <strong>{comment.created_by ?? "One of us"}</strong>
                        <time>
                          {new Date(comment.created_at).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </time>
                      </div>
                      <p>{comment.content}</p>
                    </article>
                  ))
                ) : (
                  <p className="soundtrack-no-comments">
                    No notes on this song yet. Leave the first one ♡
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="soundtrack-no-comments">
            Add or choose a song first, then you can rate it and leave a note.
          </p>
        )}
      </section>

      <section className="soundtrack-collection">
        <div className="soundtrack-section-heading soundtrack-collection-heading">
          <div>
            <span className="soundtrack-kicker">OUR SHARED PLAYLIST</span>
            <h3>
              playlist <span>({songs.length})</span>
            </h3>
          </div>
          <span className="soundtrack-collection-caption">..</span>
        </div>
        {songs.length ? (
          <div className="soundtrack-song-list">
            {songs.map((song, index) => (
              <article
                key={song.id}
                className={`soundtrack-song-row ${
                  selectedSong?.id === song.id ? "soundtrack-song-selected" : ""
                }`}
              >
                <button
                  className="soundtrack-song-main"
                  onClick={() => chooseSong(song.id)}
                  aria-label={`Choose ${song.title} as your shared song`}
                >
                  <span className="soundtrack-song-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="soundtrack-song-play">
                    {selectedSong?.id === song.id ? "♫" : "▶"}
                  </span>
                  <span className="soundtrack-song-text">
                    <strong>{song.title}</strong>
                    <span>
                      {song.dedication || "A song saved for the two of us"}
                    </span>
                  </span>
                  <span
                    className={`soundtrack-provider-pill ${
                      song.provider === "youtube"
                        ? "soundtrack-provider-youtube"
                        : ""
                    }`}
                  >
                    {song.provider === "youtube" ? "YouTube" : "Spotify"}
                  </span>
                  <span className="soundtrack-song-by">
                    {song.created_by
                      ? `Saved by ${song.created_by}`
                      : "Saved for us"}
                  </span>
                </button>
                <button
                  className="delete-btn soundtrack-delete"
                  onClick={() => deleteSong(song.id)}
                  aria-label={`Remove ${song.title}`}
                >
                  <IconTrash size={12} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="soundtrack-empty-list">
            Your shared collection begins with one song. Add the first one
            above, then let it become a little tradition.
          </div>
        )}
      </section>
    </div>
  );
}
