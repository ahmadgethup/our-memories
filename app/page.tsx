"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Memory, Note, Plan, Song, SongComment, SongRating, Tab } from "../types";
import {
  IconHome,
  IconMemories,
  IconNotes,
  IconPlans,
  IconWedding,
  IconMusic,
  IconLock,
} from "../components/icons";
import HeartPulse from "../components/HeartPulse";
import LockScreen from "../components/LockScreen";
import ParticleCanvas from "../components/ParticleCanvas";
import MemoryLightbox from "../components/MemoryLightbox";
import HomePage from "../components/pages/HomePage";
import MemoriesPage from "../components/pages/MemoriesPage";
import NotesPage from "../components/pages/NotesPage";
import PlansPage from "../components/pages/PlansPage";
import WeddingPage from "../components/pages/WeddingPage";
import MusicPage from "../components/pages/MusicPage";

export default function Home() {
  const [access, setAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<"Tara" | "Ahmad" | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const [memories, setMemories] = useState<Memory[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [songRatings, setSongRatings] = useState<SongRating[]>([]);
  const [songComments, setSongComments] = useState<SongComment[]>([]);
  const [commentDraft, setCommentDraft] = useState("");
  const [feedbackSetupNeeded, setFeedbackSetupNeeded] = useState(false);
  const [feedbackSaving, setFeedbackSaving] = useState(false);
  const [lightboxMemory, setLightboxMemory] = useState<Memory | null>(null);

  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memoryImage, setMemoryImage] = useState<File | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songSpotifyUrl, setSongSpotifyUrl] = useState("");
  const [songDedication, setSongDedication] = useState("");
  const [songProvider, setSongProvider] = useState<"spotify" | "youtube">("spotify");
  const [songLoading, setSongLoading] = useState(false);
  const [songSetupNeeded, setSongSetupNeeded] = useState(false);
  const [youtubeSetupNeeded, setYoutubeSetupNeeded] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [songPickedBy, setSongPickedBy] = useState<"Tara" | "Ahmad" | null>(null);
  const songChannel = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [memoriesResult, notesResult, plansResult, songsResult, songsSchemaResult, ratingsResult, commentsResult] =
      await Promise.all([
        supabase
          .from("memories")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("notes")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("plans")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("songs")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("songs").select("provider,youtube_id").limit(0),
        supabase.from("song_ratings").select("*").order("updated_at", { ascending: false }),
        supabase.from("song_comments").select("*").order("created_at", { ascending: false }),
      ]);
    setMemories(memoriesResult.data || []);
    setNotes(notesResult.data || []);
    setPlans(plansResult.data || []);
    setSongs(songsResult.data || []);
    setSongSetupNeeded(Boolean(songsResult.error));
    setYoutubeSetupNeeded(Boolean(songsSchemaResult.error));
    setSongRatings(ratingsResult.data || []);
    setSongComments(commentsResult.data || []);
    setFeedbackSetupNeeded(Boolean(ratingsResult.error || commentsResult.error));
    if (!selectedSongId && songsResult.data?.[0]) setSelectedSongId(songsResult.data[0].id);
  };

  // Restore the two-person device session after hydration.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem("our-memories-user");
      if (stored === "Tara" || stored === "Ahmad") {
        setCurrentUser(stored);
        setAccess(true);
      }
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Fetch independently from rendering; errors must not hide the homepage.
  useEffect(() => {
    if (!access) return;
    let cancelled = false;
    const load = async () => {
      try {
        const [m, n, p, s, songSchema, ratings, comments] = await Promise.all([
          supabase
            .from("memories")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("notes")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("plans")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("songs")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase.from("songs").select("provider,youtube_id").limit(0),
          supabase.from("song_ratings").select("*").order("updated_at", { ascending: false }),
          supabase.from("song_comments").select("*").order("created_at", { ascending: false }),
        ]);
        if (cancelled) return;
        if (m.error || n.error || p.error) {
          console.error("Supabase loading error:", m.error, n.error, p.error);
        }
        setMemories(m.data ?? []);
        setNotes(n.data ?? []);
        setPlans(p.data ?? []);
        setSongs(s.data ?? []);
        setSongSetupNeeded(Boolean(s.error));
        setYoutubeSetupNeeded(Boolean(songSchema.error));
        setSongRatings(ratings.data ?? []);
        setSongComments(comments.data ?? []);
        setFeedbackSetupNeeded(Boolean(ratings.error || comments.error));
        setSelectedSongId((current) => current ?? s.data?.[0]?.id ?? null);
      } catch (error) {
        if (!cancelled) console.error("Failed to load content:", error);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [access]);

  useEffect(() => {
    if (!access) return;
    const channel = supabase
      .channel("our-soundtrack-together")
      .on("broadcast", { event: "song-picked" }, ({ payload }) => {
        if (typeof payload?.songId !== "string") return;
        setSelectedSongId(payload.songId);
        setSongPickedBy(payload.pickedBy === "Tara" || payload.pickedBy === "Ahmad" ? payload.pickedBy : null);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "songs" }, (event) => {
        if (event.eventType === "INSERT") {
          const added = event.new as Song;
          setSongs((current) => current.some((song) => song.id === added.id) ? current : [added, ...current]);
        }
        if (event.eventType === "DELETE") {
          const removedId = (event.old as { id?: string }).id;
          if (removedId) {
            setSongs((current) => current.filter((song) => song.id !== removedId));
            setSelectedSongId((current) => current === removedId ? null : current);
            setSongPickedBy(null);
          }
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "song_ratings" }, (event) => {
        if (event.eventType === "INSERT" || event.eventType === "UPDATE") {
          const changed = event.new as SongRating;
          setSongRatings((current) => [
            ...current.filter((rating) => !(rating.song_id === changed.song_id && rating.user_name === changed.user_name)),
            changed,
          ]);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "song_comments" }, (event) => {
        if (event.eventType === "INSERT") {
          const added = event.new as SongComment;
          setSongComments((current) => current.some((comment) => comment.id === added.id) ? current : [added, ...current]);
        }
        if (event.eventType === "DELETE") {
          const removedId = (event.old as { id?: string }).id;
          if (removedId) setSongComments((current) => current.filter((comment) => comment.id !== removedId));
        }
      })
      .subscribe();
    songChannel.current = channel;
    return () => {
      songChannel.current = null;
      void supabase.removeChannel(channel);
    };
  }, [access]);

  const handleUnlock = (name: "Tara" | "Ahmad") => {
    localStorage.setItem("our-memories-user", name);
    setCurrentUser(name);
    setActiveTab("home");

    window.history.scrollRestoration = "manual";

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setAccess(true);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  };

  const addMemory = async () => {
    if (!memoryTitle || !memoryImage) {
      alert("Please add a title and image");
      return;
    }
    setLoading(true);
    const fileName = `${Date.now()}-${memoryImage.name}`;
    const { error: uploadError } = await supabase.storage
      .from("memories")
      .upload(fileName, memoryImage);
    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from("memories")
      .getPublicUrl(fileName);
    const { error: insertError } = await supabase.from("memories").insert({
      title: memoryTitle,
      description: memoryDescription,
      image_url: publicUrlData.publicUrl,
      created_by: currentUser,
    });
    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }
    setMemoryTitle("");
    setMemoryDescription("");
    setMemoryImage(null);
    await fetchData();
    setLoading(false);
  };

  const addNote = async () => {
    if (!noteContent) {
      alert("Please write a note");
      return;
    }
    const { error } = await supabase
      .from("notes")
      .insert({ content: noteContent, created_by: currentUser });
    if (error) {
      alert(error.message);
      return;
    }
    setNoteContent("");
    await fetchData();
  };

  const addPlan = async () => {
    if (!planTitle) {
      alert("Please write a plan title");
      return;
    }
    const { error } = await supabase
      .from("plans")
      .insert({
        title: planTitle,
        plan_date: planDate || null,
        created_by: currentUser,
      });
    if (error) {
      alert(error.message);
      return;
    }
    setPlanTitle("");
    setPlanDate("");
    await fetchData();
  };

  const addSong = async () => {
    if (!songTitle.trim() || !songSpotifyUrl.trim()) {
      alert("Add the song title and its Spotify link first.");
      return;
    }
    let songUrl: URL;
    try {
      songUrl = new URL(songSpotifyUrl.trim());
    } catch {
      alert(`Please paste a valid ${songProvider === "spotify" ? "Spotify track" : "YouTube video"} link.`);
      return;
    }
    let spotifyId: string | null = null;
    let youtubeId: string | null = null;
    if (songProvider === "spotify") {
      const trackMatch = songUrl.hostname === "open.spotify.com"
        ? songUrl.pathname.match(/^\/track\/([a-zA-Z0-9]+)\/?$/)
        : null;
      if (!trackMatch) {
        alert("Please use a Spotify song link that looks like open.spotify.com/track/…");
        return;
      }
      spotifyId = trackMatch[1];
    } else {
      const host = songUrl.hostname.toLowerCase().replace(/^www\./, "");
      const isYoutubeHost = ["youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be"].includes(host);
      const pathId = songUrl.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
      const candidateId = host === "youtu.be"
        ? songUrl.pathname.split("/").filter(Boolean)[0]
        : songUrl.searchParams.get("v") || pathId;
      if (!isYoutubeHost || !candidateId || !/^[a-zA-Z0-9_-]{11}$/.test(candidateId)) {
        alert("Please use a YouTube video link, such as youtube.com/watch?v=… or youtu.be/…");
        return;
      }
      youtubeId = candidateId;
    }
    if (songSetupNeeded || youtubeSetupNeeded) {
      alert("Run the songs database migration shown on this page before adding tracks.");
      return;
    }
    setSongLoading(true);
    const { data, error } = await supabase
      .from("songs")
      .insert({
        title: songTitle.trim(),
        provider: songProvider,
        spotify_url: spotifyId ? `https://open.spotify.com/track/${spotifyId}` : null,
        spotify_id: spotifyId,
        youtube_url: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null,
        youtube_id: youtubeId,
        dedication: songDedication.trim() || null,
        created_by: currentUser,
      })
      .select()
      .single();
    if (error) {
      if (error.message.toLowerCase().includes("song") || error.message.toLowerCase().includes("schema cache")) {
        setSongSetupNeeded(true);
      }
      alert(error.message.includes("songs")
        ? "The shared songs table is not set up yet. Run the migration in supabase/migrations/20261031000000_create_songs.sql in your Supabase SQL Editor, then try again."
        : error.message);
      setSongLoading(false);
      return;
    }
    setSongTitle("");
    setSongSpotifyUrl("");
    setSongDedication("");
    setSongProvider("spotify");
    if (data?.id) chooseSong(data.id);
    await fetchData();
    setSongLoading(false);
  };

  const chooseSong = (id: string) => {
    setSelectedSongId(id);
    setSongPickedBy(currentUser);
    void songChannel.current?.send({
      type: "broadcast",
      event: "song-picked",
      payload: { songId: id, pickedBy: currentUser },
    });
  };

  const rateSelectedSong = async (rating: number) => {
    if (!selectedSongId || !currentUser) return;
    setFeedbackSaving(true);
    const { data, error } = await supabase
      .from("song_ratings")
      .upsert({
        song_id: selectedSongId,
        user_name: currentUser,
        rating,
        updated_at: new Date().toISOString(),
      }, { onConflict: "song_id,user_name" })
      .select()
      .single();
    if (error) {
      if (error.message.toLowerCase().includes("song_ratings") || error.message.toLowerCase().includes("schema cache")) {
        setFeedbackSetupNeeded(true);
      }
      alert("Could not save your rating. Run the song feedback migration in Supabase, then refresh.");
      setFeedbackSaving(false);
      return;
    }
    setSongRatings((current) => [
      ...current.filter((item) => !(item.song_id === data.song_id && item.user_name === data.user_name)),
      data,
    ]);
    setFeedbackSaving(false);
  };

  const addSongComment = async () => {
    if (!selectedSongId || !currentUser || !commentDraft.trim()) return;
    setFeedbackSaving(true);
    const { data, error } = await supabase
      .from("song_comments")
      .insert({ song_id: selectedSongId, content: commentDraft.trim(), created_by: currentUser })
      .select()
      .single();
    if (error) {
      if (error.message.toLowerCase().includes("song_comments") || error.message.toLowerCase().includes("schema cache")) {
        setFeedbackSetupNeeded(true);
      }
      alert("Could not save your comment. Run the song feedback migration in Supabase, then refresh.");
      setFeedbackSaving(false);
      return;
    }
    setSongComments((current) => current.some((item) => item.id === data.id) ? current : [data, ...current]);
    setCommentDraft("");
    setFeedbackSaving(false);
  };

  const deleteMemory = async (id: string) => {
    await supabase.from("memories").delete().eq("id", id);
    await fetchData();
  };
  const deleteNote = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    await fetchData();
  };
  const deletePlan = async (id: string) => {
    await supabase.from("plans").delete().eq("id", id);
    await fetchData();
  };
  const deleteSong = async (id: string) => {
    await supabase.from("songs").delete().eq("id", id);
    if (selectedSongId === id) {
      setSelectedSongId(null);
      setSongPickedBy(null);
    }
    await fetchData();
  };

  if (!mounted) return <div className="splash" />;
  if (!access) return <LockScreen onUnlock={handleUnlock} />;
  const tabs = [
    { id: "home", icon: <IconHome />, label: "Home" },
    { id: "memories", icon: <IconMemories />, label: "Memories" },
    { id: "notes", icon: <IconNotes />, label: "Notes" },
    { id: "plans", icon: <IconPlans />, label: "Plans" },
    { id: "music", icon: <IconMusic />, label: "Our Soundtrack" },
    { id: "wedding", icon: <IconWedding />, label: "Our Wedding" },
  ];
  return (
    <div className="app-root app-visible">
      <ParticleCanvas count={70} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {lightboxMemory && (
        <MemoryLightbox
          memory={lightboxMemory}
          onClose={() => setLightboxMemory(null)}
        />
      )}
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="mini-heart">
              <HeartPulse />
            </div>
            <div>
              <p className="header-eyebrow">
                ✦ &nbsp; O U R &nbsp; P R I V A T E &nbsp; S P A C E &nbsp; ✦
              </p>
              <h1 className="header-title">Our Memories</h1>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("our-memories-user");
              localStorage.removeItem("access");
              setCurrentUser(null);
              setAccess(false);
            }}
            className="lock-back-btn"
          >
            <IconLock size={14} />
            <span>{currentUser} · Lock</span>
          </button>
        </div>

        <nav className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as Tab);
                window.scrollTo(0, 0);
              }}
              className={`tab-btn ${activeTab === tab.id ? "tab-active" : ""}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className="tab-pip" />}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {activeTab === "home" && (
          <HomePage
            memories={memories}
            notes={notes}
            plans={plans}
            currentUser={currentUser}
            setActiveTab={setActiveTab}
            setLightboxMemory={setLightboxMemory}
          />
        )}
        {activeTab === "memories" && (
          <MemoriesPage
            memories={memories}
            memoryTitle={memoryTitle}
            setMemoryTitle={setMemoryTitle}
            memoryDescription={memoryDescription}
            setMemoryDescription={setMemoryDescription}
            memoryImage={memoryImage}
            setMemoryImage={setMemoryImage}
            loading={loading}
            addMemory={addMemory}
            deleteMemory={deleteMemory}
            setLightboxMemory={setLightboxMemory}
          />
        )}
        {activeTab === "notes" && (
          <NotesPage
            notes={notes}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        )}
        {activeTab === "plans" && (
          <PlansPage
            plans={plans}
            planTitle={planTitle}
            setPlanTitle={setPlanTitle}
            planDate={planDate}
            setPlanDate={setPlanDate}
            addPlan={addPlan}
            deletePlan={deletePlan}
          />
        )}
        {activeTab === "music" && (
          <MusicPage
            songs={songs}
            currentUser={currentUser}
            title={songTitle}
            setTitle={setSongTitle}
            spotifyUrl={songSpotifyUrl}
            setSpotifyUrl={setSongSpotifyUrl}
            provider={songProvider}
            setProvider={setSongProvider}
            dedication={songDedication}
            setDedication={setSongDedication}
            loading={songLoading}
            songSetupNeeded={songSetupNeeded}
            youtubeSetupNeeded={youtubeSetupNeeded}
            feedbackSetupNeeded={feedbackSetupNeeded}
            ratings={songRatings}
            comments={songComments}
            commentDraft={commentDraft}
            setCommentDraft={setCommentDraft}
            feedbackSaving={feedbackSaving}
            rateSelectedSong={rateSelectedSong}
            addSongComment={addSongComment}
            addSong={addSong}
            deleteSong={deleteSong}
            selectedSongId={selectedSongId}
            songPickedBy={songPickedBy}
            chooseSong={chooseSong}
          />
        )}
        {activeTab === "wedding" && <WeddingPage />}
      </main>
    </div>
  );
}
