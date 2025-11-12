import { motion } from "framer-motion"

interface ProjectCardProps {
  name: string,
  icon:string,
  banner:string | null,
  twitterUsername:string,
  onClick?: () => void
}


export default function ProjectCard({ name, icon, banner,  onClick }: ProjectCardProps) {
  return (
    <motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  transition={{ type: "spring", stiffness: 200 }}

      onClick={onClick}
      className="relative flex items-center gap-3 rounded-xl border border-gray-200 p-3 sm:p-4 
                 cursor-pointer overflow-hidden transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-blue-500"
     style={{
        backgroundImage: banner
          ? `url(${banner})`
          : 'linear-gradient(to right, #3C83F6)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: banner ?'#3C83F6' : '#3C83F6', 
      }}
    >
       <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
      

      {/* Blue neon ring animation */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 opacity-0 hover:opacity-20 blur-lg transition-all duration-700 animate-pulse"></div>
      </div>
      <div className=" relative flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
        <img src={icon} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
         {/* <h3 className="font-semibold text-primary-foreground text-sm sm:text-base truncate">{name}</h3>  */}
         {/* <p className="text-xs sm:text-sm text-primary-foreground/70 truncate">@{twitterUsername}</p> */}
      </div>
    {/* </div> */}
    </motion.div>
  )
}
