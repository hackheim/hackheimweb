import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Wrench,
  Zap,
  Cpu,
  Scissors,
  MapPin,
} from "lucide-react";

export default function HackheimLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-[family-name:var(--font-space-grotesk)]">
              Hackheim
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#om-oss"
              className="text-foreground hover:text-primary transition-colors"
            >
              Om oss
            </a>
            <a
              href="#utstyr"
              className="text-foreground hover:text-primary transition-colors"
            >
              Utstyr
            </a>
            <a
              href="#apne-dager"
              className="text-foreground hover:text-primary transition-colors"
            >
              Åpne dager
            </a>
            <a
              href="#kontakt"
              className="text-foreground hover:text-primary transition-colors"
            >
              Kontakt
            </a>
          </nav>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Bli medlem
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-card to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <img
              src="/hackerspace-workshop-with-people-using-3d-printers.png"
              alt="Hackheim workshop med medlemmer som jobber med prosjekter"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-[family-name:var(--font-space-grotesk)] text-balance">
            Velkommen til Hackheim
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
            Et makerspace i Trondheim for alle teknologiinteresserte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Users className="w-5 h-5 mr-2" />
              Kom på besøk
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Se åpne dager
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om-oss" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-space-grotesk)]">
              Hva er Hackheim?
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Hackheim er et makerspace i Trondheim, stiftet i 2012 av kreative
              ildsjeler som ønsket en samlingsplass for likesinnede.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                    For alle teknologiinteresserte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-card-foreground">
                    Vi er åpne for alle uansett hva slags bakgrunn du kommer
                    fra. Kom innom om du er interessert i 3D-printing,
                    elektronikk, laserskjæring, programmering eller lignende.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">3D-printing</Badge>
                    <Badge variant="secondary">Elektronikk</Badge>
                    <Badge variant="secondary">Laserskjæring</Badge>
                    <Badge variant="secondary">Programmering</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                    Åpne dager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-card-foreground">
                      Onsdag og søndag
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-card-foreground">Fra 18:00</span>
                  </div>
                  <p className="text-card-foreground">
                    Kom innom og si hei! Det er bare å dukke opp på våre åpne
                    dager.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="utstyr" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-space-grotesk)]">
              Vårt utstyr
            </h3>
            <p className="text-lg text-muted-foreground text-pretty">
              I våre lokaler har vi tilgang til profesjonelt utstyr for alle
              typer prosjekter
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Cpu className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                  3D-printere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flere 3D-printere for prototyping og produksjon
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Scissors className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                  Laserkutter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Presis kutting og gravering i ulike materialer
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                  Loddestasjoner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profesjonelt utstyr for elektronikkprosjekter
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Wrench className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                  Verksted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Komplett verksted med håndverktøy og maskiner
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-space-grotesk)]">
              Et hackerspace - hva er det?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/people-collaborating-on-electronics-and-laser-cutt.png"
                alt="Medlemmer som samarbeider om prosjekter"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <p className="text-foreground">
                Et hackerspace kjennetegnes av medlemmer som kommer sammen for å
                arbeide med hobbyprosjekter, både hardware- og softwarebasert.
                Motivasjonen for arbeidet er lysten til å lære noe nytt, lage
                noe nyttig, eller rett og slett fordi det er tøft!
              </p>
              <p className="text-foreground">
                Det sentrale i denne typen forening er det å skape noe sammen
                andre, sosialisere og utveksle kunnskap. Vi ønsker å samle alle
                teknologiinteresserte under et tak for å utveksle kunnskap og
                inspirasjon på tvers av fagområder.
              </p>
              <div className="pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Users className="w-5 h-5 mr-2" />
                  Bli en del av fellesskapet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Days Section */}
      <section id="apne-dager" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-[family-name:var(--font-space-grotesk)]">
            Kom på besøk!
          </h3>

          <Card className="bg-card border-border max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground font-[family-name:var(--font-space-grotesk)]">
                Åpne dager
              </CardTitle>
              <CardDescription>
                Vi har åpne dager hver uke - kom innom og si hei!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-center space-x-2 p-4 bg-accent/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      Onsdag
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fra 18:00
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 p-4 bg-accent/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      Søndag
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fra 18:00
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-card-foreground">
                Det er bare å komme innom og si hei! Vi er her for å være en
                samleplass for alle teknologiinteresserte.
              </p>

              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Finn veien til oss
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="kontakt"
        className="py-12 px-4 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-accent-foreground" />
                </div>
                <h4 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                  Hackheim
                </h4>
              </div>
              <p className="text-primary-foreground/80">
                Makerspace i Trondheim for alle teknologiinteresserte siden
                2012.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">
                Kontakt
              </h5>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Trondheim, Norge</p>
                <p>Åpne dager: Onsdag og søndag fra 18:00</p>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">
                Fellesskap
              </h5>
              <p className="text-primary-foreground/80 mb-4">
                Bli en del av vårt kreative fellesskap av makere og
                teknologientusiaster.
              </p>
              <Button
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Happy hacking!
              </Button>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2024 Hackheim. Stiftet i 2012 av kreative ildsjeler.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
