// import { useState, useEffect } from "react"
// import { AnimatePresence ,motion } from "framer-motion"
// import { Search, Settings } from "lucide-react"
// import ProjectCarousel from "./project-carousel"
// import ProjectModal from "./project-modal"
// import projects from "../data/giverep_projects.json"

// export default function HomePage() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedProject, setSelectedProject] = useState<any>(null)
//   const [filteredProjects, setFilteredProjects] = useState(projects);

//    useEffect(() => {
//     const query = searchQuery.toLowerCase().trim()
//     if (query === "") {
//       setFilteredProjects(projects)
//     } else {
//       const results = projects.filter((p) =>
//         p.name.toLowerCase().includes(query)
//       )
//       setFilteredProjects(results)
//     }
//   }, [searchQuery])

//   return (
//     <main className="min-h-screen bg-white">

//        {/* border-b-4 border-blue-400  */}
//       <section className=" bg-gradient-to-b from-white to-blue-50 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:py-16 text-center">
//        <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8, ease: "easeOut" }}
//   > <a href="/">
//         <div className="mb-6 flex justify-center items-center space-x-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-white">
//             <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//             </svg>
//           </div>
//           <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">RepEasy</h1>
//         </div>
//         </a>

//         <p className="mx-auto mb-8 max-w-md text-sm sm:text-base text-gray-600">
//            A fast and seamless X (Twitter) post generator for all projects built on the{" "}
//             <span className="text-blue-600 font-semibold">SUI ecosystem</span>.

//         </p>

//         <div className="mx-auto flex max-w-md items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">

//           <Search className="h-5 w-5 text-gray-400" />

//           <input
//             type="text"
//             placeholder="Search for a sui project ..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm sm:text-base"
//           />
//           <Settings className="h-5 w-5 text-gray-400" />
//         </div>
//         </motion.div>
//       </section>

//       {/* border-b-4 border-blue-400 */}
//       <section className=" px-4 py-8 sm:px-6 md:px-8 md:py-12">

//         <ProjectCarousel  projects={filteredProjects} onProjectClick={setSelectedProject} />
//       </section>
//       <AnimatePresence>
//         {selectedProject && (
//           <ProjectModal
//             project={selectedProject}
//             onClose={() => setSelectedProject(null)}
//           />
//         )}
//       </AnimatePresence>
//       <h2 className="mb-4 text-center text-sm text-gray-200">
//       S13
//       </h2>
//     </main>
//   )
// }

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Settings } from "lucide-react";
import ProjectCarousel from "./project-carousel";
import ProjectModal from "./project-modal";
import projects from "../data/giverep_projects.json";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query === "") {
      setFilteredProjects(projects);
    } else {
      const results = projects.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
      setFilteredProjects(results);
    }
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1e34] to-[#030712] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:px-6 md:px-10 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15),transparent_70%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a href="/" className="inline-flex items-center space-x-3 mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]"
            >
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                  10-4.48 10-10S17.52 2 12 2zm0 18
                  c-4.41 0-8-3.59-8-8s3.59-8 8-8
                  8 3.59 8 8-3.59 8-8 8z"
                />
              </svg>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-400">
              RepEasy
            </h1>
          </a>

          <p className="mx-auto mb-8 max-w-lg text-gray-300 leading-relaxed text-sm sm:text-base">
            ⚡ A lightning-fast{" "}
            <span className="text-blue-400 font-semibold">
              AI-powered post generator
            </span>{" "}
            for all projects in the{" "}
            <span className="text-cyan-400 font-semibold">SUI ecosystem</span>.
          </p>

          {/* Search bar */}
          <div className="mx-auto max-w-md flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-lg px-5 py-3 border border-white/10 shadow-inner focus-within:ring-2 focus-within:ring-cyan-400">
            <Search className="h-5 w-5 text-gray-300" />
            <input
              type="text"
              placeholder="🔍 Search for a SUI project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.4 }}
            >
              <Settings className="h-5 w-5 text-gray-300 cursor-pointer" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="px-4 py-6 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-lg sm:text-xl md:text-3xl font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          // className="text-center text-2xl md:text-3xl font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          🚀 Explore Trending SUI Projects
        </motion.h2>

        <ProjectCarousel
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <footer className="text-center py-6 text-xs text-gray-500 border-t border-white/10">
        <h2 className="mb-4 text-center text-sm text-gray-800">S13</h2>
      </footer>
    </main>
  );
}
