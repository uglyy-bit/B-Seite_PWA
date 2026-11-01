# B-Seite

**Deine Plattensammlung. Jede Platte an ihrem Platz.**

B-Seite katalogisiert eine private Schallplattensammlung. Kein Account, keine Werbung, kein Tracking: Sammlung und Wunschliste bleiben im Browser auf deinem Gerät.

**Zur App:** https://uglyy-bit.github.io/B-Seite_PWA/

Der Link läuft in jedem aktuellen Browser. Auf dem Handy über *Zum Home-Bildschirm hinzufügen* installieren, dann startet die App wie eine normale App und auch ohne Netz. Auf dem iPhone ist das wichtig: Safari räumt den Speicher normaler Websites nach etwa sieben Tagen ohne Besuch.

Zum Suchen braucht die App einen eigenen, kostenlosen Discogs-Schlüssel (Consumer Key und Secret von [discogs.com/settings/developers](https://www.discogs.com/settings/developers)). Er wird nur in der App eingetragen und nur an `api.discogs.com` geschickt.

Die Sammlung liegt nur in diesem Browser. Löscht du seine Website-Daten, ist sie weg, also ab und zu unter *Einstellungen → Sammlung exportieren* ein Backup sichern.

## Hosting

Dieses Repository enthält nur die fertig gebaute Flutter-Web-App im Ordner [`web/`](web/). Bei jedem Push auf `main` veröffentlicht der Workflow [`deploy.yml`](.github/workflows/deploy.yml) diesen Ordner auf GitHub Pages. Der Quellcode liegt in einem eigenen, privaten Projekt; dort aktualisiert `python3 tool/build_pwa.py ../B-Seite_PWA/web` den Ordner.

Discogs-Cover laufen über den freien Bilddienst [wsrv.nl](https://wsrv.nl), weil der Bildserver von Discogs Browsern das Lesen nicht erlaubt. Dorthin geht nur die öffentliche Bildadresse.
