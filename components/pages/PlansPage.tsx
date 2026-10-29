"use client";
import type { Plan } from "../../types";
import { IconTrash } from "../icons";

type Props = { plans: Plan[]; planTitle: string; setPlanTitle: (s: string) => void; planDate: string; setPlanDate: (s: string) => void; addPlan: () => void; deletePlan: (id: string) => void; };
export default function PlansPage({ plans, planTitle, setPlanTitle, planDate, setPlanDate, addPlan, deletePlan }: Props) {
  return (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Add a Plan</h2>
              <input
                type="text"
                placeholder="What are we planning?…"
                className="field"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
              />
              <input
                type="date"
                className="field"
                value={planDate}
                onChange={(e) => setPlanDate(e.target.value)}
              />
              <button onClick={addPlan} className="submit-btn">
                Save Plan
              </button>
            </div>

            <div className="plans-list">
              {plans.map((p, i) => (
                <div
                  key={p.id}
                  className="plan-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <p style={{color:"#ffb3c7",fontSize:"0.78rem",marginBottom:"0.4rem"}}>{p.created_by ? `Added by ${p.created_by}` : "Added before names were tracked"}</p>
                  <div className="plan-left">
                    <div className="plan-dot">
                      <div className="plan-dot-inner" />
                    </div>
                    <div>
                      <h3 className="plan-title">{p.title}</h3>
                      <p className="plan-date">
                        {p.plan_date
                          ? new Date(p.plan_date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "No date set"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePlan(p.id)}
                    className="delete-btn"
                  >
                    <IconTrash size={12} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
  );
}
