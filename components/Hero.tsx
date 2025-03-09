export default function Hero({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) {
  return (
    <section
      id="hero"
      className="py-24 px-4 md:px-8 max-h-[80vh] lg:px-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1661851193078-9e6f0409c9f9?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/60 to-green-400/40 dark:from-green-800/70 dark:to-green-600/50 backdrop-blur-sm"></div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="inline-block px-5 py-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md shadow-lg rounded-full text-white font-medium text-sm mb-3 border border-white/20 dark:border-white/10 transform hover:scale-105 transition-all duration-300">
            Empowering the next generation
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins-extrabold text-white leading-tight">
            Connecting Youth with Nature
          </h1>
          <p className="text-xl text-white/90 dark:text-white/80 leading-relaxed max-w-2xl mx-auto">
            The Green Life is dedicated to supporting mental health and
            environmental conservation by connecting children and young people
            with the natural world through immersive experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center">
            <button
              onClick={() => scrollToSection("campaigns")}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-poppins-bold text-center transform hover:-translate-y-1 border border-white/30"
            >
              Volunteer with Us
            </button>
            <button
              onClick={() => scrollToSection("mission")}
              className="px-8 py-4 bg-green-600/80 backdrop-blur-md border border-green-500/50 text-white rounded-xl hover:bg-green-600/90 transition-all duration-300 font-poppins-bold text-center transform hover:-translate-y-1"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
