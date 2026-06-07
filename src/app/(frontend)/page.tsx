import { Button, Card, Container, Grid, Heading, Section, Stack } from '@/design-system/components'

const projectCards = [
  {
    badge: 'LEARN',
    title: 'FASTER Education',
    description: 'Programs that inspire the next generation of Filipinx American STEAM leaders.',
    href: '/join#education',
  },
  {
    badge: 'JOIN COALITION',
    title: 'FASTER PROS',
    description: 'A professional coalition for connection, mentorship, and shared opportunity.',
    href: '/join#pros',
  },
  {
    badge: 'COMING SOON',
    title: 'FASTER Archive Directory and Collection',
    description: 'A living directory and archive for creators, founders, speakers, and community work.',
    href: '/discover',
  },
]

const bodySections = [
  {
    cta: 'CONNECT',
    href: '/join#pros',
    title: 'FASTER PROS',
    body: 'Build coalition across STEAM professionals, operators, artists, engineers, and community leaders.',
  },
  {
    cta: 'INNOVATE',
    href: '/join#fresh',
    title: 'FASTER FRESH Entrepreneurship',
    body: 'Support founders, investors, and builders shaping the next wave of innovation.',
  },
  {
    cta: 'INSPIRE',
    href: '/join#education',
    title: 'FASTER Education',
    body: 'Create pathways for students and emerging leaders through education, mentorship, and visibility.',
  },
]

export default function HomePage() {
  return (
    <main className="bg-faster-offWhite text-faster-body">
      <section className="bg-faster-card">
        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <Stack className="gap-7">
            <p className="font-ui text-sm font-medium uppercase text-faster-dark-text">
              Filipinx Americans in STEAM
            </p>
            <Heading as="h1" size="hero">
              Welcome to FASTER
            </Heading>
            <p className="max-w-3xl font-body text-xl leading-relaxed text-faster-dark-text md:text-2xl">
              We create, connect, and cultivate a movement of Filipinx Americans in science,
              technology, engineering, arts, and mathematics.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/join">JOIN</Button>
              <Button href="/about" variant="secondary">
                ABOUT
              </Button>
            </div>
          </Stack>
          <div className="flex aspect-square items-center justify-center rounded-lg bg-faster-dark-ui p-8 text-center font-heading text-5xl font-black text-white">
            FASTER
          </div>
        </Container>
      </section>

      <Section>
        <Stack className="gap-8">
          <Heading>Our FASTER PROJECTS</Heading>
          <Grid>
            {projectCards.map((card) => (
              <Card key={card.title} className="flex min-h-72 flex-col justify-between gap-8">
                <Stack>
                  <span className="w-fit rounded-full bg-faster-button-primary px-3 py-1 font-ui text-xs font-medium uppercase text-white">
                    {card.badge}
                  </span>
                  <div className="min-h-28 rounded bg-faster-gray-light" aria-hidden />
                  <h3 className="font-heading text-2xl font-black leading-tight text-faster-heading">
                    {card.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-faster-dark-text">
                    {card.description}
                  </p>
                </Stack>
                <Button href={card.href} variant="secondary">
                  Learn more
                </Button>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      {bodySections.map((section, index) => (
        <Section
          key={section.title}
          className={index % 2 === 0 ? 'bg-faster-gray-light' : 'bg-faster-offWhite'}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className={index % 2 === 1 ? 'md:order-2' : ''}>
              <Stack className="gap-5">
                <p className="font-ui text-sm font-medium uppercase text-faster-muted">
                  OUR FASTER COMPONENTS
                </p>
                <Heading>{section.title}</Heading>
                <p className="font-body text-lg leading-relaxed text-faster-dark-text md:text-xl">
                  {section.body}
                </p>
                <Button href={section.href} variant="secondary">
                  {section.cta}
                </Button>
              </Stack>
            </div>
            <div className="aspect-[4/3] rounded-lg bg-faster-gray-mid" aria-hidden />
          </div>
        </Section>
      ))}

      <section className="bg-faster-subscribe">
        <Container className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
          <Heading as="h2" className="font-ui text-2xl font-bold">
            Subscribe to our Newsletter
          </Heading>
          <Button href="/blog">Subscribe</Button>
        </Container>
      </section>
    </main>
  )
}

