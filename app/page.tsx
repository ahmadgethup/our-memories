"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Memory, Note, Plan, Tab } from "../types";
import {
  IconHome,
  IconMemories,
  IconNotes,
  IconPlans,
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

export default function Home() {
  const [access, setAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<"Tara" | "Ahmad" | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const [memories, setMemories] = useState<Memory[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [lightboxMemory, setLightboxMemory] = useState<Memory | null>(null);

  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memoryImage, setMemoryImage] = useState<File | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [{ data: memoriesData }, { data: notesData }, { data: plansData }] =
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
      ]);
    setMemories(memoriesData || []);
    setNotes(notesData || []);
    setPlans(plansData || []);
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
        const [m, n, p] = await Promise.all([
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
        ]);
        if (cancelled) return;
        if (m.error || n.error || p.error) {
          console.error("Supabase loading error:", m.error, n.error, p.error);
        }
        setMemories(m.data ?? []);
        setNotes(n.data ?? []);
        setPlans(p.data ?? []);
      } catch (error) {
        if (!cancelled) console.error("Failed to load content:", error);
      }
    };
    void load();
    return () => {
      cancelled = true;
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

  if (!mounted) return <div className="splash" />;
  if (!access) return <LockScreen onUnlock={handleUnlock} />;
  const tabs = [
    { id: "home", icon: <IconHome />, label: "Home" },
    { id: "memories", icon: <IconMemories />, label: "Memories" },
    { id: "notes", icon: <IconNotes />, label: "Notes" },
    { id: "plans", icon: <IconPlans />, label: "Plans" },
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
      </main>
    </div>
  );
}
