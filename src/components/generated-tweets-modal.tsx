// import { Card } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Copy } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface GenerationCardProps {
//   number: number;
//   text: string;
//   onTweet?: () => void;
// }

// const GenerationCard = ({ number, text, onTweet }: GenerationCardProps) => {
//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     toast.success("Copied to clipboard");
//   };

//   return (
//     <div className="space-y-3">
//       <h3 className="font-medium text-foreground">Generation {number}</h3>
//       <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
//       <div className="flex justify-end items-center gap-2">
//         <Button variant="ghost" size="icon" onClick={handleCopy} className="h-9 w-9">
//           <Copy className="h-4 w-4" />
//         </Button>
//         <Button onClick={onTweet} className="bg-foreground text-background hover:bg-foreground/90">
//           Tweet
//         </Button>
//       </div>
//     </div>
//   );
// };


// interface ProjectHeaderProps {
//   onBack?: () => void;
//   project?: { name: string; twitterUsername: string , banner: string | null, icon: string;};
// }

// const ProjectHeader = ({ onBack, project }: ProjectHeaderProps) => {
//   return (
//     <div className="space-y-2">
        
//       <Button variant="ghost" onClick={onBack}  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 text-muted-foreground hover:text-foreground bg-muted rounded-full hover:bg-muted/80 z-50"
//         >
//          <X className="h-5 w-5" />
//       </Button>
//       <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-4 rounded-lg border border-border p-3 sm:p-4"
//         style={{
//         backgroundImage: project?.banner
//           ? `url(${project?.banner})`
//           : 'linear-gradient(to right, #3C83F6)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundColor: project?.banner ? 'rgba(0,0,0,0.4)' : '#3C83F6',
//       }}>

//       <div className="flex items-start gap-4">
//           <div className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
//             <img src={project?.icon} alt={project?.name} className="h-full w-full object-cover" />
//           </div>
//         </div> 
         
//       </div>
//     </div>
//   );
// };

// interface GeneratedTweetsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tweets: string[];
//    project: { name: string; twitterUsername: string; banner: string | null; icon: string };
//   tweetType: string;
//   maxGeneration: string;
// }

// const GeneratedTweetsModal = ({
//   isOpen,
//   onClose,
//   tweets,
//   project,
//   tweetType,
//   maxGeneration,
// }: GeneratedTweetsModalProps) => {
//   if (!isOpen) return null;

//   const handleTweet = (number: number,  text: string) => {
// const tweetText = encodeURIComponent(text);
//   const twitterUrl = `https://x.com/intent/tweet?text=${tweetText}`;

//   window.open(twitterUrl, "_blank");
//     toast.success(`Redirecting to X to post Generation ${number}`);
//   };

//   return (

// <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto py-10">
//     <Card className="relative max-w-3xl w-[85vh] max-h-[85vh] overflow-y-auto scrollbar-hide bg-background p-6 md:p-8 rounded-2xl shadow-2xl border">
      
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition"
//       >
//       </button>

//      <ProjectHeader onBack={onClose} project={project} />


//         <div className="mt-1 space-y-6">
//           <div>
//             <h2 className="text-lg font-semibold text-foreground mb-1">Generated Result</h2>
//             <div className="flex items-center gap-6 text-sm">
//               <div className="flex items-center gap-2">
//                 <span className="text-muted-foreground">Tweet Type:</span>
//                 <span className="font-medium text-foreground capitalize">{tweetType}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-muted-foreground">No of Generation:</span>
//                 <span className="font-medium text-foreground">{maxGeneration}</span>
//               </div>
//             </div>
//           </div>
// <div className="pt-0 divide-y divide-border">
//   {tweets.map((tweet, idx) => (
//     <div key={idx} className="py-4 first:pt-0 last:pb-0">
//       <GenerationCard
//         number={idx + 1}
//         text={tweet}
//         onTweet={() => handleTweet(idx + 1, tweet)}
//       />
//     </div>
//   ))}
// </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default GeneratedTweetsModal;



import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GenerationCardProps {
  number: number;
  text: string;
  onTweet?: () => void;
}

const GenerationCard = ({ number, text, onTweet }: GenerationCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied successfully!");
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-foreground">Generation {number}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      <div className="flex justify-end items-center gap-2">
        <Button variant="default" size="icon" onClick={handleCopy} className="h-9 w-9 hover:bg-foreground/60">
          <Copy className="h-4 w-4" />
        </Button>
        <Button onClick={onTweet} className="bg-foreground text-background hover:bg-foreground/60">
          Tweet
        </Button>
      </div>
    </div>
  );
};

interface ProjectHeaderProps {
  onBack?: () => void;
  project?: { name: string; twitterUsername: string; banner: string | null; icon: string };
}

const ProjectHeader = ({ onBack, project }: ProjectHeaderProps) => {
  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 text-muted-foreground hover:text-foreground bg-muted rounded-full hover:bg-muted/80 z-50"
      >
        <X className="h-5 w-5" />
      </Button>

      <div
        className="flex gap-3 sm:gap-4 mb-4 sm:mb-4 rounded-lg border border-border p-3 sm:p-4"
        style={{
          backgroundImage: project?.banner
            ? `url(${project?.banner})`
            : "linear-gradient(to right, #3C83F6)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: project?.banner ? "rgba(0,0,0,0.4)" : "#3C83F6",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={project?.icon} alt={project?.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface GeneratedTweetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tweets: string[];
  project: { name: string; twitterUsername: string; banner: string | null; icon: string };
  tweetType: string;
  maxGeneration: string;
}

const GeneratedTweetsModal = ({
  isOpen,
  onClose,
  tweets,
  project,
  tweetType,
  maxGeneration,
}: GeneratedTweetsModalProps) => {

    const handleTweet = (number: number,  text: string) => {
const tweetText = encodeURIComponent(text);
  const twitterUrl = `https://x.com/intent/post?text=${tweetText}`;

  window.open(twitterUrl, "_blank");
    toast.success(`Redirecting to X to post Generation ${number}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative max-w-3xl w-[85vh] max-h-[85vh] overflow-y-auto scrollbar-hide bg-background p-6 md:p-8 rounded-2xl shadow-2xl border"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <ProjectHeader onBack={onClose} project={project} />

            <div className="mt-1 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Generated Result</h2>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tweet Type:</span>
                    <span className="font-medium text-foreground capitalize">{tweetType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">No of Generation:</span>
                    <span className="font-medium text-foreground">{maxGeneration}</span>
                  </div>
                </div>
              </div>

              <div className="pt-0 divide-y divide-border">
                {tweets.map((tweet, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <GenerationCard
                      number={idx + 1}
                      text={tweet}
                      onTweet={() => handleTweet(idx + 1, tweet)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeneratedTweetsModal;
