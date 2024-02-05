export const routes = {
  public: {
    landing: { label: 'Home', path: '/' },
    about: { label: 'About', path: '/about' },
    articles: { label: 'Articles', path: '/articles' },
    article: {
      blockchainsStay: '/articles/blockhains-stay',
      aiGreatestWorst: '/articles/ai-greatest-worst',
      rustEverywhere: '/articles/rust-everywhere',
      biotechNextNextBigThing: '/articles/biotech-next-next-big-thing',
      midlifeCrisis: '/articles/midlife-crisis',
    },
    uses: { label: 'Uses', path: '/uses' },
    projects: { label: 'Projects', path: '/projects' },
    flashCards: { label: 'Flashcards', path: '/flashcards' },
    dashboard: { label: 'Dashboard', path: '/dashboard' },
    guestbook: { label: 'Guestbook', path: '/guestbook' },
    // both paths for signin signup are just there for the middleware
    signIn: { label: 'Sign In', path: '/sign-in/*' },
    signUp: { label: 'Sign Up', path: '/sign-up/*' },
    thankYou: { label: 'Thank You', path: '/thank-you' },
  },
  protected: {
    dashboard: { add: { label: 'Add habit', path: '/dashboard/add' } },
    flashcard: { add: { label: 'Add flashcard', path: '/flashcards/add' } },
    profile: { add: { label: 'Profile', path: '/profile' } },
  },
  external: {
    work: {
      CeMM: { label: 'CeMM', url: 'https://cemm.at/' },
      Resolute: { label: 'Resolute', url: 'https://re-solute.eu/' },
      AllAboutApps: { label: 'allaboutapps', url: 'https://allaboutapps.at/' },
      Xbionic: { label: 'X-Bionic', url: 'https://x-bionic.com/' },
    },
    projects: {
      Labio: { label: 'Labio', url: 'http://labio.vercel.app' },
      Resolute: { label: 'RESOLUTE', url: 'https://re-solute.eu/' },
    },
    socials: {
      github: { label: 'Github', url: 'https://github.com/Manubi' },
      twitter: { label: 'Twitter', url: 'https://twitter.com/manuelbichler' },
    },
  },
  contacts: {
    email: 'bichler@gmail.com',
    ens: 'bichler.eth',
    CV: '/CV_manuel.pdf',
  },
}
