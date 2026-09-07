export type VideoMedia =
  | { kind: "file"; src: string; poster?: string }
  | { kind: "embed"; provider: "youtube" | "vimeo"; embedId: string };

interface ProjectVideoProps {
  video: VideoMedia;
  className?: string;
}

const EMBED_URL: Record<"youtube" | "vimeo", (id: string) => string> = {
  youtube: (id) => `https://www.youtube.com/embed/${id}`,
  vimeo: (id) => `https://player.vimeo.com/video/${id}`,
};

export default function ProjectVideo({ video, className = "" }: ProjectVideoProps) {
  if (video.kind === "embed") {
    return (
      <div className={`aspect-video rounded-sm overflow-hidden forge-panel ${className}`}>
        <iframe
          src={EMBED_URL[video.provider](video.embedId)}
          title="Project demo"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster={video.poster}
      className={`w-full rounded-sm forge-panel ${className}`}
      src={video.src}
    />
  );
}
