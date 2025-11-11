import { useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import GeneratedTweetsModal from "./generated-tweets-modal";
import { motion } from "framer-motion";

interface Project {
  id: number;
  name: string;
  icon: string;
  twitterUsername: string;
  banner: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [tweetType, setTweetType] = useState("short");
  const [maxGeneration, setMaxGeneration] = useState("1");
  const [generatedTweets, setGeneratedTweets] = useState<string[]>([]);
  const [showGeneratedModal, setShowGeneratedModal] = useState(false);

  if (!project) return null;

 
  const mutation = useMutation({
    mutationFn: async (data: { name: string; tweetType: string; maxGeneration: string; twitterHandle: string }) => {
      const response = await fetch("https://suinami-yubp.vercel.app/api/generate/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate tweet");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.tweets?.length) {
        setGeneratedTweets(data.tweets);
        setShowGeneratedModal(true);
      }
      toast.success("Tweet generated successfully!");
    
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate tweet");
    },
  });

  if (!project) return null;

  const handleGenerate = () => {
  mutation.mutate({
    name: project.name,
    tweetType,
    maxGeneration,
    twitterHandle: `@${project.twitterUsername}`,
  });
};

  return (
    <>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-lg mx-4"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 text-muted-foreground hover:text-foreground bg-muted rounded-full hover:bg-muted/80 z-50"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 rounded-lg border border-border p-3 sm:p-4"
        style={{
        backgroundImage: project.banner
          ? `url(${project.banner})`
          : 'linear-gradient(to right, #3C83F6)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: project.banner ? '#3C83F6' : '#3C83F6', 
      }}>
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={project.icon} alt={project.name} className="h-full w-full object-cover" />
          </div>
         
        </div>
                  <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold  text-black">{project.name}</h3>
            <p className="text-xs sm:text-sm text-primary-foreground">@{project.twitterUsername}</p>
          </div>

        <div className="mb-4 sm:mb-6">
         
          <label className="block text-sm font-medium  text-muted-foreground mb-2 sm:mb-3">Tweet Type</label>
          <div className="flex gap-3 sm:gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tweetType === "short"}
                onChange={() => setTweetType("short")}
                className="w-4 h-4 accent-[#3C83F6]"
              />
              <span className="text-sm font-medium text-foreground">Short</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tweetType === "long"}
                onChange={() => setTweetType("long")}
                className="w-4 h-4 accent-[#3C83F6]"
              />
              <span className="text-sm font-medium text-foreground">Long</span>
            </label>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-sm font-medium text-foreground mb-2 sm:mb-3">Max No of Generation</label>
          <div className="flex gap-3 sm:gap-4">
            {["1", "2"].map((num) => (
              <label key={num} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maxGeneration === num}
                  onChange={() => setMaxGeneration(num)}
                  className="w-4 h-4 accent-[#3C83F6]"
                />
                <span className="text-sm font-medium text-foreground">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
           disabled={mutation.isPending}
          className="w-full rounded-lg bg-[#3C83F6] text-white py-3 font-semibold hover:bg-[#3C83F6]/90 transition-colors"
        > 
         {mutation.isPending ? (
  <span className="flex items-center justify-center gap-2">
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    Generating...
  </span>
) : (
  "Generate Tweet"
)}
        </button>
      </motion.div>
    </motion.div>
    <GeneratedTweetsModal
        isOpen={showGeneratedModal}
        onClose={() => setShowGeneratedModal(false)}
        tweets={generatedTweets}
        project={project}
        tweetType={tweetType}
        maxGeneration={maxGeneration}
      />
      </>
  );
}