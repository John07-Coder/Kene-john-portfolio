import { useEffect, useState } from 'react'
import KineticName from './KineticName.jsx'
import { directions, nav, profile, projects, skills } from './data.js'

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function ProjectCard({ project, index }) {
  const [active, setActive] = useState(0)
  const shot = project.shots[active]

  return (
    <article className="project" data-reveal style={{ '--stagger': index }}>
      <div className="project__media">
        <div className="project__stage">
          <img src={shot.src} alt={shot.alt} decoding="async" />
        </div>
        <div className="project__thumbs">
          {project.shots.map((item, shotIndex) => (
            <button
              key={item.src}
              type="button"
              className={shotIndex === active ? 'is-active' : undefined}
              aria-pressed={shotIndex === active}
              aria-label={item.label}
              onClick={() => setActive(shotIndex)}
            >
              <img src={item.src} alt="" decoding="async" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <div className="project__body">
        <p className="project__index">0{index + 1}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="btn btn--ghost"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          Bekijk op GitHub
        </a>
      </div>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="glow" aria-hidden="true">
        <span className="glow__blob glow__blob--a" />
        <span className="glow__blob glow__blob--b" />
        <span className="glow__blob glow__blob--c" />
      </div>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a className="nav__mark" href="#top">
          {profile.short}
        </a>
        <nav className="nav__links" aria-label="Hoofdnavigatie">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav__cta" href="#contact">
          Contact
        </a>
        <button
          className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Menu sluiten' : 'Menu openen'}</span>
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>
      </header>

      {menuOpen && (
        <div className="drawer" id="mobile-menu">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--solid" href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero__meta hero-enter" style={{ '--d': '0ms' }}>
            <span className="pulse" />
            Beschikbaar voor stage & junior opdrachten
          </div>
          <p className="hero__kicker hero-enter" style={{ '--d': '90ms' }}>
            Junior software developer · {profile.age} jaar
          </p>
          <KineticName />
          <p className="hero__hint hero-enter" style={{ '--d': '320ms' }}>
            Beweeg door de letters
          </p>
          <p className="hero__lead hero-enter" style={{ '--d': '380ms' }}>
            Tweedejaars student Software Development. Ik bouw webapps met PHP,
            Laravel en React — van een kapsalon waar je online boekt tot een
            helpdesk met rollen — en leer daarnaast .NET, cybersecurity en cloud.
          </p>
          <div className="hero__actions hero-enter" style={{ '--d': '480ms' }}>
            <a className="btn btn--solid" href="#projecten">
              Bekijk mijn projecten
            </a>
            <a className="btn btn--ghost" href="#contact">
              Laten we praten
            </a>
          </div>
          <ul className="hero__chips">
            {['PHP / Laravel', 'React', 'HTML / CSS', '.NET'].map((chip, index) => (
              <li
                key={chip}
                className="hero-enter"
                style={{ '--d': `${560 + index * 70}ms` }}
              >
                {chip}
              </li>
            ))}
          </ul>
        </section>

        <section id="over" className="section">
          <div className="section__head" data-reveal>
            <p className="eyebrow">Over mij</p>
            <h2>Code die werkt, en daarna nóg beter wordt.</h2>
          </div>
          <div className="about">
            <p className="about__lead" data-reveal style={{ '--stagger': 1 }}>
              Ik ben Kene John. Negentien, tweedejaars student Software
              Development op MBO 4. Ik maak het liefst een applicatie die iemand
              écht kan openen: boeken, toewijzen, bevestigen — niet alleen een
              scherm dat er af is.
            </p>
            <div className="about__grid">
              <article data-reveal style={{ '--stagger': 1 }}>
                <h3>Wat ik nu doe</h3>
                <p>
                  Ik bouw met PHP en Laravel aan de backend, en met React, HTML
                  en CSS aan de voorkant. Twee van die apps staan op GitHub:
                  Kapsalon De Knip en een ticket-systeem met drie rollen.
                  Daarnaast leer ik .NET.
                </p>
              </article>
              <article data-reveal style={{ '--stagger': 2 }}>
                <h3>Waar ik naartoe wil</h3>
                <p>
                  Niet alleen features opleveren, maar software die veilig,
                  onderhoudbaar en schaalbaar is. Daarom trekken cybersecurity
                  en cloud me extra: authenticatie, rechten, deploy en de laag
                  achter de interface.
                </p>
              </article>
            </div>
            <dl className="facts" data-reveal>
              <div>
                <dt>Opleiding</dt>
                <dd>MBO 4 Software Development</dd>
              </div>
              <div>
                <dt>Jaar</dt>
                <dd>2e leerjaar</dd>
              </div>
              <div>
                <dt>Leeftijd</dt>
                <dd>{profile.age}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Security &amp; cloud</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="projecten" className="section">
          <div className="section__head" data-reveal>
            <p className="eyebrow">Projecten</p>
            <h2>Twee apps die ik zelf heb gebouwd.</h2>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="stack" className="section">
          <div className="section__head" data-reveal>
            <p className="eyebrow">Stack</p>
            <h2>Talen en tools waarmee ik bouw.</h2>
          </div>
          <div className="skills">
            {skills.map((skill, index) => (
              <article
                key={skill.name}
                className="skill"
                data-reveal
                style={{ '--stagger': index }}
              >
                <span className="skill__tag">{skill.tag}</span>
                <h3>{skill.name}</h3>
                <p>{skill.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="richting" className="section">
          <div className="section__head" data-reveal>
            <p className="eyebrow">Richting</p>
            <h2>Twee thema’s die ik verder wil trekken.</h2>
          </div>
          <div className="directions">
            {directions.map((item, index) => (
              <article
                key={item.title}
                className="direction"
                data-reveal
                style={{ '--stagger': index }}
              >
                <span className={index === 1 ? 'is-magenta' : undefined}>{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section section--contact">
          <div data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Zin om iets te bouwen?</h2>
            <p className="contact__text">
              Open voor stage, een bijbaan of een junior opdracht. Stuur een
              mail — ik reageer snel.
            </p>
            <a className="btn btn--solid btn--lg" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>{profile.name}</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
