[![](logo.png)](/)
[gimmick:theme](flatly)

[Forside](index.md)

[Om oss](om.md)
[Bli medlem](bli.md)
[Wiki]()

  * # Intro
  * [Husregler](wiki/regler.md)
  * [Redigere wiki](wiki/edit.md)
  - - - -
  * # Utstyr
  * [3D Printer](wiki/3dprint.md)
  * [Laserkutter](wiki/laser.md)
  * [Andre Verktøy](wiki/tools.md)
  * [Komponenter](wiki/komponenter.md)
  - - - -
  * # Guides
  * [Sourcing](wiki/sourcing.md)

[Sponsors](sponsors.md)
[Kontakt oss](kontakt.md)
<script>
setTimeout(function() {
  fetch("http://activity.hackheim.industries/api/all")
  .then(res => res.json())
  .then((out) => {
      let p = document.createElement("li");
      a = document.createElement("a");
      a.href = "http://activity.hackheim.industries/"
      p.appendChild(a)
      a.innerHTML = (out.lights>0 ? "☀️" : "🌙") + " " + (out.movements>0 ? "🟢" : "🔴")
      document.getElementById("md-main-navbar").getElementsByClassName("navbar-nav")[0].appendChild(p)
  })
}, 200);
</script>