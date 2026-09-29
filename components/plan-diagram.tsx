import type { Project } from "@/content/projects";

export function PlanDiagram({ project }: { project: Project }) {
  return (
    <figure className="plan-figure">
      <div className="plan-paper">
        <svg role="img" aria-label={`Concept layout of ${project.title}; diagram not to scale`} viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 342H564" className="plan-guide" />
          {project.plan.map((room) => (
            <g key={`${room.label}-${room.x}`}>
              <rect x={room.x} y={room.y} width={room.w} height={room.h} className="plan-room" />
              <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 3} textAnchor="middle" className="plan-label">{room.label}</text>
            </g>
          ))}
          <path d="M32 19h26M45 6v26" className="plan-guide" />
          <text x="68" y="23" className="plan-label">N</text>
          <path d="M32 360h65" className="plan-rule" />
          <text x="105" y="363" className="plan-label">SPATIAL STUDY</text>
        </svg>
      </div>
      <figcaption className="image-caption mono">Concept layout — not to scale / {project.title}</figcaption>
    </figure>
  );
}
