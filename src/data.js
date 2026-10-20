const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  name: 'Kene John',
  short: 'KJ',
  role: 'Junior software developer',
  age: 19,
  education: 'MBO 4 Software Development · 2e jaar',
  email: 'kenechijohn10@gmail.com',
  github: 'https://github.com/John07-Coder',
}

export const nav = [
  { href: '#over', label: 'Over' },
  { href: '#projecten', label: 'Projecten' },
  { href: '#stack', label: 'Stack' },
  { href: '#richting', label: 'Richting' },
]

export const projects = [
  {
    title: 'Kapsalon De Knip',
    summary:
      'Website voor een kapsalon. Een klant kiest een vrije dag en een tijdslot van 30 minuten, tot 30 dagen vooruit. Na het boeken volgt een bevestiging op het scherm en per e-mail. De kapper ziet de agenda, openstaande aanvragen en de verwachte omzet, en kan een afspraak bevestigen, annuleren of herstellen.',
    github: 'https://github.com/John07-Coder/kapper-app',
    tags: ['Laravel', 'Livewire', 'Tailwind CSS'],
    shots: [
      {
        src: asset('projects/kapper/home.png'),
        alt: 'Homepage van Kapsalon De Knip met tarief, openingstijden en een knop om een afspraak te maken',
        label: 'Homepage',
      },
      {
        src: asset('projects/kapper/afspraak.png'),
        alt: 'Boekingspagina waarop een klant een datum, een tijdslot en contactgegevens kiest',
        label: 'Afspraak maken',
      },
      {
        src: asset('projects/kapper/over-ons.png'),
        alt: 'Over-ons-pagina van de salon met duur van 30 minuten en een tarief van 25 euro',
        label: 'Over ons',
      },
    ],
  },
  {
    title: 'Ticket-Systeem',
    summary:
      'Helpdesk voor IT-meldingen. Medewerkers maken een ticket, agents en admins werken de wachtrij af. Een medewerker ziet alleen eigen tickets. Een agent kan een niet-toegewezen ticket overnemen en een interne notitie plaatsen. Een admin wijst tickets toe en mag alles bewerken of verwijderen.',
    github: 'https://github.com/John07-Coder/Ticket-Systeem',
    tags: ['Laravel', 'PHP', 'Rollen'],
    shots: [
      {
        src: asset('projects/tickets/dashboard.png'),
        alt: 'Dashboard met aantallen open, in behandeling, gesloten en niet-toegewezen tickets',
        label: 'Dashboard',
      },
      {
        src: asset('projects/tickets/tickets.png'),
        alt: 'Ticketbord met eigen tickets links en tickets van anderen rechts, gefilterd op status',
        label: 'Overzicht',
      },
      {
        src: asset('projects/tickets/ticket.png'),
        alt: 'Ticketpagina met beschrijving, details, reacties en een veld voor een interne notitie',
        label: 'Ticket',
      },
      {
        src: asset('projects/tickets/aanmaken.png'),
        alt: 'Formulier om een nieuw ticket aan te maken met titel, categorie, prioriteit en status',
        label: 'Nieuw ticket',
      },
    ],
  },
]

export const skills = [
  {
    name: 'PHP / Laravel',
    tag: 'Backend',
    note: 'Webapps, routes, databases en API’s bouwen.',
  },
  {
    name: 'React',
    tag: 'Frontend',
    note: 'Componenten, state en moderne interfaces.',
  },
  {
    name: 'HTML / CSS',
    tag: 'Fundament',
    note: 'Strakke, toegankelijke layouts vanaf nul.',
  },
  {
    name: '.NET',
    tag: 'Aan het leren',
    note: 'C# en het Microsoft-ecosysteem in de praktijk.',
  },
]

export const directions = [
  {
    kicker: '01',
    title: 'Cybersecurity',
    text: 'Ik wil begrijpen hoe software écht veilig blijft: authenticatie, rechten, logging en hoe je gaten voorkomt in plaats van ze later te dichten.',
  },
  {
    kicker: '02',
    title: 'Cloud',
    text: 'Hoe je apps host, schaalt en onderhoudt. Van deploy tot monitoring — software die niet alleen lokaal werkt, maar ook in productie.',
  },
]
