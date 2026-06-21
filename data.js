// Wissensdatenbank — basiert auf Formelsammlung 1.5.2 Informationstechnik & Abitur-Fundus 2027
const TOPICS = [
{
  id:"uml", num:"01", icon:"⚙", title:"UML-Zustandsdiagramme",
  desc:"Beschreibung von Systemzuständen, Transitionen und Mikrocontroller-Verhalten.",
  tags:["UML","Zustände","Mikrocontroller","C/C++"],
  body:`
<p>Ein <b>UML-Zustandsdiagramm</b> beschreibt, in welchen Zuständen sich ein System befinden kann und unter welchen Ereignissen es zwischen ihnen wechselt. In der Informationstechnik wird es besonders zur Modellierung von <b>Mikrocontroller-Programmen</b> (Arduino, ATmega, ESP) genutzt.</p>

<h3>Grundelemente</h3>
<ul>
<li><b>Start-Pseudozustand</b> (gefüllter Kreis ●) — Einstiegspunkt des Systems.</li>
<li><b>Zustand</b> (Rechteck mit abgerundeten Ecken) — z. B. <code>LED_AN</code>, <code>WARTEN</code>.</li>
<li><b>Transition</b> (Pfeil) — Übergang von Zustand A nach Zustand B.</li>
<li><b>Ereignis [Wächterbedingung] / Aktion</b> — die Beschriftung einer Transition.</li>
<li><b>End-Pseudozustand</b> (Kreis mit Punkt) — Endzustand des Systems.</li>
</ul>

<svg class="diag" viewBox="0 0 600 200">
<defs><marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 z" fill="#00f0ff"/></marker></defs>
<circle cx="40" cy="100" r="8" fill="#00f0ff"/>
<rect x="120" y="70" width="140" height="60" rx="14" fill="none" stroke="#00f0ff" stroke-width="2"/>
<text x="190" y="105" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron">LED_AUS</text>
<rect x="380" y="70" width="140" height="60" rx="14" fill="none" stroke="#b14bff" stroke-width="2"/>
<text x="450" y="105" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron">LED_AN</text>
<line x1="48" y1="100" x2="118" y2="100" stroke="#00f0ff" stroke-width="2" marker-end="url(#arr)"/>
<path d="M260,90 Q320,40 380,90" fill="none" stroke="#00f0ff" stroke-width="2" marker-end="url(#arr)"/>
<text x="320" y="40" fill="#9bff5b" text-anchor="middle" font-size="12" font-family="JetBrains Mono">tasterGedrückt</text>
<path d="M380,110 Q320,160 260,110" fill="none" stroke="#b14bff" stroke-width="2" marker-end="url(#arr)"/>
<text x="320" y="180" fill="#ffb845" text-anchor="middle" font-size="12" font-family="JetBrains Mono">[zeit > 2s]</text>
</svg>

<h3>Varianten von Transitionen</h3>
<ul>
<li><b>Ereignistransition</b>: nur Ereignis → <code>tasterGedrückt</code></li>
<li><b>Bedingungstransition</b>: nur Wächter → <code>[zaehler == 10]</code></li>
<li><b>Kombiniert</b>: <code>ereignis [bedingung] / aktion</code></li>
<li><b>Selbsttransition</b>: Zustand → derselbe Zustand (z. B. bei Reinit)</li>
</ul>

<h3>Umsetzung in C/C++ (Arduino)</h3>
<pre>enum Zustand { LED_AUS, LED_AN };
Zustand z = LED_AUS;   // Zustandsvariable
void loop() {
  switch(z) {
    case LED_AUS:
      digitalWrite(13, LOW);
      if (digitalRead(2) == HIGH) z = LED_AN;
      break;
    case LED_AN:
      digitalWrite(13, HIGH);
      if (millis() - t0 > 2000) z = LED_AUS;
      break;
  }
}</pre>

<div class="callout">💡 Faustregel: <b>Eine Zustandsvariable, ein switch-Block, klare Übergänge.</b> So bleibt das Verhalten deterministisch und testbar.</div>
`
},
{
  id:"digital", num:"02", icon:"⚡", title:"Digitaltechnik & Hardware",
  desc:"Logikgatter, Schaltnetze, Schaltwerke, Flip-Flops, RAM/ROM, Sensoren & Aktoren.",
  tags:["Gatter","Flip-Flop","RAM","Sensoren"],
  body:`
<h3>Logikgatter</h3>
<p>Ein <b>Logikgatter</b> verknüpft binäre Eingänge (0/1) zu einem Ausgang. Dargestellt nach IEC 60617-12.</p>
<table>
<tr><th>Gatter</th><th>Symbol</th><th>Funktion</th><th>Bsp. A=1, B=0</th></tr>
<tr><td>AND</td><td>&</td><td>Y = A ∧ B</td><td>0</td></tr>
<tr><td>OR</td><td>≥1</td><td>Y = A ∨ B</td><td>1</td></tr>
<tr><td>NOT</td><td>1</td><td>Y = ¬A</td><td>0</td></tr>
<tr><td>NAND</td><td>&</td><td>Y = ¬(A∧B)</td><td>1</td></tr>
<tr><td>NOR</td><td>≥1</td><td>Y = ¬(A∨B)</td><td>0</td></tr>
<tr><td>XOR</td><td>=1</td><td>Y = A ⊕ B</td><td>1</td></tr>
</table>

<svg class="diag" viewBox="0 0 400 120">
<rect x="120" y="30" width="80" height="60" fill="none" stroke="#00f0ff" stroke-width="2"/>
<text x="160" y="65" fill="#00f0ff" font-family="Orbitron" text-anchor="middle">&amp;</text>
<line x1="60" y1="50" x2="120" y2="50" stroke="#e6f1ff" stroke-width="2"/>
<line x1="60" y1="70" x2="120" y2="70" stroke="#e6f1ff" stroke-width="2"/>
<line x1="200" y1="60" x2="280" y2="60" stroke="#9bff5b" stroke-width="2"/>
<text x="50" y="54" fill="#e6f1ff" text-anchor="end" font-family="JetBrains Mono">A</text>
<text x="50" y="74" fill="#e6f1ff" text-anchor="end" font-family="JetBrains Mono">B</text>
<text x="295" y="64" fill="#9bff5b" font-family="JetBrains Mono">Y = A∧B</text>
</svg>

<h3>Schaltnetze vs. Schaltwerke</h3>
<ul>
<li><b>Schaltnetz</b>: Ausgang hängt NUR von aktuellen Eingängen ab (kein Speicher). Beispiel: Volladdierer.</li>
<li><b>Schaltwerk</b>: Ausgang hängt von Eingängen UND vom inneren Zustand ab (mit Speicher). Beispiel: Zähler, Schieberegister.</li>
</ul>

<h3>Flip-Flops (Speicherbaustein 1 Bit)</h3>
<ul>
<li><b>RS-Flip-Flop</b>: Set (S=1) → Q=1, Reset (R=1) → Q=0. Verbotener Zustand S=R=1.</li>
<li><b>D-Flip-Flop</b>: bei Taktflanke übernimmt Q den Wert von D.</li>
<li><b>JK-Flip-Flop</b>: kein verbotener Zustand; J=K=1 → Q wechselt.</li>
<li><b>T-Flip-Flop</b>: Toggle bei jeder Taktflanke.</li>
</ul>

<h3>RAM vs. ROM</h3>
<table><tr><th></th><th>RAM</th><th>ROM</th></tr>
<tr><td>Schreibbar</td><td>Ja</td><td>Nein (bzw. einmal)</td></tr>
<tr><td>Flüchtig</td><td>Ja</td><td>Nein</td></tr>
<tr><td>Einsatz</td><td>Arbeitsspeicher</td><td>BIOS, Firmware</td></tr></table>

<h3>Sensoren & Aktoren</h3>
<p><b>Sensor</b> wandelt physikalische Größe → elektrisches Signal (Temperatur, Licht, Abstand).
<b>Aktor</b> wandelt elektrisches Signal → physikalische Wirkung (Motor, LED, Lautsprecher). Typisches Beispiel: <b>BLDC-Motor</b> (bürstenlos, elektronisch kommutiert).</p>
`
},
{
  id:"prog", num:"03", icon:"</>", title:"Programmierung & OOP",
  desc:"Pseudocode, Kontrollstrukturen, Klassen, Vererbung, Sequenz- und Objektdiagramme.",
  tags:["OOP","UML","Pseudocode","Vererbung"],
  body:`
<h3>Kontrollstrukturen (Pseudocode)</h3>
<pre>WENN bedingung DANN
  anweisung1
SONST
  anweisung2
ENDE WENN

SOLANGE bedingung
  anweisung
ENDE SOLANGE

FÜR i VON 1 BIS n
  anweisung
ENDE FÜR</pre>

<h3>Klassen, Attribute, Operationen</h3>
<p>Eine <b>Klasse</b> ist ein Bauplan für Objekte. Sie hat <b>Attribute</b> (Daten) und <b>Operationen / Methoden</b> (Verhalten). UML-Notation:</p>
<pre>+ public      − private     # protected
attribut: Typ = Standardwert
operation(parameter: Typ): Rückgabetyp</pre>

<svg class="diag" viewBox="0 0 400 200">
<rect x="100" y="20" width="200" height="160" fill="none" stroke="#00f0ff" stroke-width="2"/>
<line x1="100" y1="55" x2="300" y2="55" stroke="#00f0ff"/>
<line x1="100" y1="120" x2="300" y2="120" stroke="#00f0ff"/>
<text x="200" y="42" fill="#00f0ff" font-family="Orbitron" text-anchor="middle">Fahrzeug</text>
<text x="115" y="75" fill="#e6f1ff" font-family="JetBrains Mono" font-size="12">− geschwindigkeit: int</text>
<text x="115" y="95" fill="#e6f1ff" font-family="JetBrains Mono" font-size="12">− farbe: String</text>
<text x="115" y="140" fill="#9bff5b" font-family="JetBrains Mono" font-size="12">+ beschleunigen(d: int)</text>
<text x="115" y="160" fill="#9bff5b" font-family="JetBrains Mono" font-size="12">+ bremsen(): void</text>
</svg>

<h3>Vererbung & abstrakte Klassen</h3>
<p>Eine Unterklasse erbt Attribute & Methoden ihrer Oberklasse und kann sie <b>überschreiben</b>. <b>Abstrakte Klassen</b> können nicht instanziiert werden; <b>Schnittstellen</b> (Interfaces) definieren nur Operationen ohne Implementierung.</p>

<h3>Assoziationen & Multiplizitäten</h3>
<table><tr><th>Notation</th><th>Bedeutung</th></tr>
<tr><td>1</td><td>genau eins</td></tr>
<tr><td>0..1</td><td>höchstens eins</td></tr>
<tr><td>*</td><td>beliebig viele</td></tr>
<tr><td>1..*</td><td>mindestens eins</td></tr></table>

<h3>Sequenzdiagramm</h3>
<p>Zeigt die zeitliche Abfolge von <b>Botschaften</b> zwischen Objekten (Lebenslinien). Pfeile von oben nach unten = Reihenfolge.</p>
`
},
{
  id:"ds", num:"04", icon:"≣", title:"Datenstrukturen",
  desc:"Verkettete Liste, Stapel, Warteschlange, Binärbaum — Aufbau & Operationen.",
  tags:["Liste","Stack","Queue","Baum"],
  body:`
<h3>Verkettete Liste</h3>
<p>Jeder <b>Knoten</b> enthält Daten und einen Verweis (<code>next</code>) auf den nächsten Knoten. Der letzte Knoten zeigt auf <code>NULL</code>.</p>
<svg class="diag" viewBox="0 0 520 80">
<defs><marker id="ar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 z" fill="#00f0ff"/></marker></defs>
${[0,1,2,3].map(i=>`<rect x="${20+i*120}" y="20" width="80" height="40" fill="none" stroke="#00f0ff" stroke-width="2"/><text x="${60+i*120}" y="45" fill="#e6f1ff" text-anchor="middle" font-family="JetBrains Mono">${[7,3,9,1][i]}</text>`).join("")}
${[0,1,2].map(i=>`<line x1="${100+i*120}" y1="40" x2="${140+i*120}" y2="40" stroke="#00f0ff" stroke-width="2" marker-end="url(#ar2)"/>`).join("")}
<text x="500" y="45" fill="#b14bff" font-family="JetBrains Mono">∅</text>
</svg>

<h3>Stapel (Stack) — LIFO</h3>
<p>Last-In-First-Out. Operationen: <code>push(x)</code>, <code>pop()</code>, <code>top()</code>, <code>istLeer()</code>. Beispiel: Funktionsaufrufe, Undo-Verlauf.</p>

<h3>Warteschlange (Queue) — FIFO</h3>
<p>First-In-First-Out. Operationen: <code>enqueue(x)</code>, <code>dequeue()</code>, <code>front()</code>. Beispiel: Druckerwarteschlange, Nachrichten.</p>

<h3>Binärbaum</h3>
<p>Jeder Knoten hat maximal 2 Kinder (links/rechts). In einem <b>binären Suchbaum</b> gilt: linker Teilbaum &lt; Knoten &lt; rechter Teilbaum.</p>
<svg class="diag" viewBox="0 0 400 200">
${[
  [200,40,"8"],[120,100,"3"],[280,100,"10"],[80,160,"1"],[160,160,"6"],[320,160,"14"]
].map(([x,y,v])=>`<circle cx="${x}" cy="${y}" r="22" fill="none" stroke="#00f0ff" stroke-width="2"/><text x="${x}" y="${y+5}" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron">${v}</text>`).join("")}
<line x1="200" y1="62" x2="120" y2="78" stroke="#00f0ff"/>
<line x1="200" y1="62" x2="280" y2="78" stroke="#00f0ff"/>
<line x1="120" y1="122" x2="80" y2="138" stroke="#00f0ff"/>
<line x1="120" y1="122" x2="160" y2="138" stroke="#00f0ff"/>
<line x1="280" y1="122" x2="320" y2="138" stroke="#00f0ff"/>
</svg>

<h3>Inorder-Traversierung (Pseudocode)</h3>
<pre>OPERATION ausgebenDatenInorder()
  WENN linkesKind != NULL DANN
    linkesKind.ausgebenDatenInorder()
  ENDE WENN
  AUSGABE daten
  WENN rechtesKind != NULL DANN
    rechtesKind.ausgebenDatenInorder()
  ENDE WENN
ENDE OPERATION</pre>
<div class="callout">Für den Suchbaum oben liefert Inorder: <b>1, 3, 6, 8, 10, 14</b> — sortiert!</div>
`
},
{
  id:"ki", num:"05", icon:"◉", title:"Künstliche Intelligenz",
  desc:"Klassifikation, Gini, Perzeptron, neuronale Netze, Minimax & Alpha-Beta-Pruning.",
  tags:["KI","Perzeptron","Minimax","Gini"],
  body:`
<h3>Klassifikation</h3>
<p>Daten werden anhand von Merkmalen in Klassen eingeteilt (z. B. Spam / Kein Spam). Algorithmen: <b>k-NN</b>, <b>Entscheidungsbaum</b>, <b>Perzeptron</b>.</p>

<h3>Gini-Unreinheit</h3>
<p>Misst, wie „gemischt" ein Datensatz ist. Bei <code>k</code> Klassen mit Anteilen p<sub>i</sub>:</p>
<pre>G = 1 − Σ p_i²</pre>
<p>G = 0 → reine Menge (alle gleiche Klasse). G groß → stark gemischt. Entscheidungsbäume wählen den Split mit der niedrigsten gewichteten Gini-Unreinheit.</p>

<h3>Das (einlagige) Perzeptron</h3>
<svg class="diag" viewBox="0 0 400 200">
${[[60,40,"x₁"],[60,100,"x₂"],[60,160,"x₃"]].map(([x,y,t])=>`<circle cx="${x}" cy="${y}" r="18" fill="none" stroke="#00f0ff"/><text x="${x}" y="${y+5}" fill="#e6f1ff" text-anchor="middle" font-family="JetBrains Mono">${t}</text>`).join("")}
<circle cx="240" cy="100" r="28" fill="none" stroke="#b14bff" stroke-width="2"/>
<text x="240" y="105" fill="#b14bff" text-anchor="middle" font-family="Orbitron">Σ</text>
<circle cx="340" cy="100" r="18" fill="none" stroke="#9bff5b"/>
<text x="340" y="105" fill="#9bff5b" text-anchor="middle" font-family="JetBrains Mono">y</text>
${[40,100,160].map(y=>`<line x1="78" y1="${y}" x2="212" y2="100" stroke="#00f0ff"/>`).join("")}
<line x1="268" y1="100" x2="322" y2="100" stroke="#b14bff"/>
<text x="150" y="30" fill="#ffb845" font-size="11" font-family="JetBrains Mono">w₁,w₂,w₃</text>
</svg>
<p>Berechnung: <code>y = φ(Σ wᵢ·xᵢ − θ)</code> mit Aktivierungsfunktion φ (z. B. Heaviside).</p>

<h3>Lernregel</h3>
<pre>w_i(neu) = w_i(alt) + α · (t − y) · x_i</pre>
<p>α = Lernrate (&gt; 0), t = Sollwert, y = Istwert. Nur bei falscher Klassifikation werden Gewichte verändert.</p>

<h3>Mehrlagiges Perzeptron (MLP)</h3>
<p>Mehrere Schichten (Input → Hidden → Output) mit nichtlinearen Aktivierungsfunktionen wie <b>Sigmoid</b>, <b>ReLU</b>, <b>tanh</b>. Trainiert via <b>Backpropagation</b>.</p>

<h3>Minimax & Alpha-Beta-Pruning</h3>
<p><b>Minimax</b>: bei Zwei-Spieler-Spielen wechselt sich Max- und Min-Spieler im Baum ab. Max wählt das Maximum der Kinder, Min das Minimum.
<b>Alpha-Beta-Pruning</b> schneidet Äste ab, die das Ergebnis nicht mehr beeinflussen können — drastisch schneller bei gleichem Ergebnis.</p>
`
},
{
  id:"db", num:"06", icon:"⛁", title:"Datenbanken & SQL",
  desc:"ER-Diagramm, Relationenmodell, SQL-Abfragen mit JOIN, GROUP BY, HAVING.",
  tags:["SQL","ER","Relationen","JOIN"],
  body:`
<h3>DBMS — Datenbankmanagementsystem</h3>
<p>Software-Schicht zwischen Anwendung und Speicher. Übernimmt: Mehrbenutzerbetrieb, Transaktionen, Zugriffsschutz, Konsistenz.</p>

<h3>ER-Diagramm</h3>
<p>Entitäten (Rechteck), Beziehungen (Raute), Attribute (Ellipse). Kardinalitäten: <b>1:1</b>, <b>1:n</b>, <b>n:m</b>.</p>
<svg class="diag" viewBox="0 0 500 160">
<rect x="40" y="50" width="120" height="60" fill="none" stroke="#00f0ff" stroke-width="2"/>
<text x="100" y="85" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron">Schüler</text>
<polygon points="220,80 270,50 320,80 270,110" fill="none" stroke="#b14bff" stroke-width="2"/>
<text x="270" y="85" fill="#b14bff" text-anchor="middle" font-family="JetBrains Mono">nimmt teil</text>
<rect x="380" y="50" width="120" height="60" fill="none" stroke="#00f0ff" stroke-width="2"/>
<text x="440" y="85" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron">Labor</text>
<line x1="160" y1="80" x2="220" y2="80" stroke="#e6f1ff"/>
<line x1="320" y1="80" x2="380" y2="80" stroke="#e6f1ff"/>
<text x="180" y="72" fill="#9bff5b" font-size="11" font-family="JetBrains Mono">n</text>
<text x="350" y="72" fill="#9bff5b" font-size="11" font-family="JetBrains Mono">m</text>
</svg>

<h3>SQL — Grundstruktur</h3>
<pre>SELECT  &lt;Spalten&gt;
FROM    &lt;Tabellen&gt;
WHERE   &lt;Bedingung&gt;
GROUP BY &lt;Spalten&gt;
HAVING  &lt;Gruppenbedingung&gt;
ORDER BY &lt;Spalte&gt; [ASC|DESC];</pre>

<h3>Projektion & Selektion</h3>
<pre>SELECT Name, Klasse
FROM   Schueler
WHERE  Klasse = 'J2'
ORDER BY Name ASC;</pre>

<h3>Verbund (JOIN)</h3>
<pre>SELECT S.Name, L.Titel, T.Note
FROM   Schueler S, Labor L, Teilnahme T
WHERE  S.SID = T.SID
  AND  L.LID = T.LID;</pre>

<h3>Aggregatfunktionen + GROUP BY</h3>
<pre>SELECT Klasse, COUNT(*) AS anzahl, AVG(Note) AS schnitt
FROM   Schueler
GROUP BY Klasse
HAVING COUNT(*) > 10;</pre>

<table><tr><th>Funktion</th><th>Bedeutung</th></tr>
<tr><td>COUNT(*)</td><td>Anzahl Zeilen</td></tr>
<tr><td>SUM(x)</td><td>Summe</td></tr>
<tr><td>AVG(x)</td><td>Mittelwert</td></tr>
<tr><td>MIN/MAX(x)</td><td>kleinster/größter Wert</td></tr></table>
`
},
{
  id:"net", num:"07", icon:"⌬", title:"Vernetzte Systeme",
  desc:"IP-Adressen, OSI- & TCP/IP-Modell, Header, Routing.",
  tags:["IPv4","IPv6","OSI","TCP","Routing"],
  body:`
<h3>IPv4-Adresse</h3>
<p>32 Bit, geschrieben in vier Oktetten (0–255), z. B. <code>192.168.1.42</code>. Die <b>Subnetzmaske</b> (z. B. <code>/24</code> = <code>255.255.255.0</code>) trennt <b>Netz-ID</b> von <b>Host-ID</b>.</p>
<table><tr><th>Adresse</th><th>Bedeutung</th></tr>
<tr><td>192.168.1.0</td><td>Netzadresse (alle Host-Bits 0)</td></tr>
<tr><td>192.168.1.255</td><td>Broadcast (alle Host-Bits 1)</td></tr>
<tr><td>192.168.1.1–254</td><td>nutzbare Hosts</td></tr></table>

<h3>IPv6</h3>
<p>128 Bit, hexadezimal in 8 Gruppen: <code>2001:0db8:85a3::8a2e:0370:7334</code>. Doppelter Doppelpunkt <code>::</code> ersetzt zusammenhängende Null-Gruppen.</p>

<h3>OSI-7-Schichten-Modell vs. TCP/IP</h3>
<table><tr><th>OSI</th><th>TCP/IP</th><th>Beispiele</th></tr>
<tr><td>7 Anwendung</td><td rowspan="3">Anwendung</td><td>HTTP, MQTT, DNS</td></tr>
<tr><td>6 Darstellung</td><td>TLS, JSON</td></tr>
<tr><td>5 Sitzung</td><td>NetBIOS</td></tr>
<tr><td>4 Transport</td><td>Transport</td><td>TCP, UDP</td></tr>
<tr><td>3 Vermittlung</td><td>Internet</td><td>IPv4, IPv6, ICMP</td></tr>
<tr><td>2 Sicherung</td><td rowspan="2">Netzzugang</td><td>Ethernet, VLAN</td></tr>
<tr><td>1 Bitübertragung</td><td>Kupfer, Glasfaser, WLAN</td></tr></table>

<h3>Header (Auszug)</h3>
<ul>
<li><b>Ethernet II</b>: Ziel-MAC | Quell-MAC | Typ | Daten | FCS</li>
<li><b>IPv4-Header</b>: Version | IHL | TTL | Protokoll | Quell-IP | Ziel-IP …</li>
<li><b>TCP-Header</b>: Quellport | Zielport | Sequenz | ACK | Flags (SYN, ACK, FIN, RST) …</li>
<li><b>UDP-Header</b>: Quellport | Zielport | Länge | Prüfsumme</li>
</ul>

<h3>Routing-Tabelle (IPv4)</h3>
<table><tr><th>Ziel-Netz</th><th>Maske</th><th>Next Hop</th><th>Interface</th></tr>
<tr><td>192.168.1.0</td><td>/24</td><td>direkt</td><td>Eth0</td></tr>
<tr><td>0.0.0.0</td><td>/0</td><td>192.168.1.1</td><td>Eth0</td></tr></table>
`
},
{
  id:"iot", num:"08", icon:"📡", title:"Internet der Dinge (IoT)",
  desc:"MQTT, HTTP, vernetzte Sensoren und Aktoren in der Praxis.",
  tags:["MQTT","HTTP","IoT","REST"],
  body:`
<h3>Was ist IoT?</h3>
<p>Das <b>Internet der Dinge</b> beschreibt die Vernetzung physischer Geräte (Sensoren, Aktoren, Mikrocontroller) über das Internet. Daten werden zentral gesammelt, ausgewertet und Steuerbefehle zurückgesendet.</p>

<h3>MQTT — Message Queuing Telemetry Transport</h3>
<p>Leichtgewichtiges <b>Publish/Subscribe</b>-Protokoll für ressourcenarme Geräte. Komponenten:</p>
<ul>
<li><b>Broker</b>: zentrale Vermittlungsstelle (z. B. Mosquitto)</li>
<li><b>Publisher</b>: veröffentlicht Nachrichten zu einem <b>Topic</b> (<code>haus/wohnzimmer/temp</code>)</li>
<li><b>Subscriber</b>: abonniert Topics und empfängt passende Nachrichten</li>
<li><b>QoS</b>: 0 (höchstens einmal), 1 (mindestens einmal), 2 (genau einmal)</li>
</ul>

<svg class="diag" viewBox="0 0 500 180">
<rect x="20" y="30" width="100" height="40" fill="none" stroke="#00f0ff" stroke-width="2" rx="6"/>
<text x="70" y="55" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">Sensor</text>
<rect x="200" y="70" width="100" height="40" fill="none" stroke="#b14bff" stroke-width="2" rx="6"/>
<text x="250" y="95" fill="#b14bff" text-anchor="middle" font-family="Orbitron" font-size="12">BROKER</text>
<rect x="380" y="30" width="100" height="40" fill="none" stroke="#9bff5b" stroke-width="2" rx="6"/>
<text x="430" y="55" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">App</text>
<rect x="380" y="110" width="100" height="40" fill="none" stroke="#9bff5b" stroke-width="2" rx="6"/>
<text x="430" y="135" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">Display</text>
<line x1="120" y1="50" x2="200" y2="85" stroke="#00f0ff" stroke-width="2"/>
<line x1="300" y1="85" x2="380" y2="50" stroke="#9bff5b" stroke-width="2"/>
<line x1="300" y1="95" x2="380" y2="130" stroke="#9bff5b" stroke-width="2"/>
<text x="150" y="40" fill="#ffb845" font-size="10" font-family="JetBrains Mono">publish</text>
<text x="330" y="40" fill="#ffb845" font-size="10" font-family="JetBrains Mono">subscribe</text>
</svg>

<h3>HTTP — Hypertext Transfer Protocol</h3>
<p>Klassisches Request/Response-Protokoll. Methoden: <b>GET</b> (lesen), <b>POST</b> (erstellen), <b>PUT</b> (aktualisieren), <b>DELETE</b> (löschen). Statuscodes: <code>200 OK</code>, <code>404 Not Found</code>, <code>500 Server Error</code>.</p>
<pre>GET /api/temp HTTP/1.1
Host: sensor.local
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{"temp": 21.4, "einheit": "°C"}</pre>
`
},
];

const GLOSS = [
  ["AND-Gatter","Logikgatter: Ausgang 1, wenn beide Eingänge 1."],
  ["Alpha-Beta-Pruning","Optimierung von Minimax durch Schneiden irrelevanter Äste."],
  ["Backpropagation","Lernalgorithmus für mehrlagige neuronale Netze."],
  ["Binärbaum","Baum, bei dem jeder Knoten höchstens 2 Kinder hat."],
  ["BLDC-Motor","Bürstenloser Gleichstrommotor; elektronisch kommutiert."],
  ["Broadcast","Adresse, die alle Hosts in einem Netz erreicht."],
  ["DBMS","Datenbankmanagementsystem."],
  ["D-Flip-Flop","Speichert Eingang D bei Taktflanke."],
  ["ER-Diagramm","Entity-Relationship-Diagramm für Datenmodellierung."],
  ["Ethernet","Kabelgebundenes LAN-Protokoll, OSI-Schichten 1–2."],
  ["FIFO","First-In-First-Out, Warteschlangenprinzip."],
  ["Gini","Maß für Unreinheit eines Datensatzes."],
  ["HTTP","Request/Response-Protokoll im Web."],
  ["IPv4","32-Bit-Internetadresse."],
  ["IPv6","128-Bit-Internetadresse."],
  ["JOIN","SQL-Verknüpfung mehrerer Tabellen."],
  ["LIFO","Last-In-First-Out, Stack-Prinzip."],
  ["MQTT","Publish/Subscribe-Protokoll für IoT."],
  ["NAND","Negiertes AND."],
  ["Perzeptron","Einfaches Modell eines künstlichen Neurons."],
  ["RAM","Flüchtiger Arbeitsspeicher."],
  ["ROM","Read-Only-Speicher (Firmware)."],
  ["Routing","Wegfindung von IP-Paketen im Netz."],
  ["Schaltnetz","Logik ohne Speicher."],
  ["Schaltwerk","Logik mit Speicher (Flip-Flops)."],
  ["Sequenzdiagramm","UML-Diagramm zeitlicher Botschaftsabfolgen."],
  ["SQL","Structured Query Language."],
  ["Stack","Stapelspeicher (LIFO)."],
  ["Subnetzmaske","Trennt Netz- von Host-ID einer IP."],
  ["TCP","Verbindungsorientiertes Transportprotokoll."],
  ["UDP","Verbindungsloses Transportprotokoll."],
  ["UML","Unified Modeling Language."],
  ["Vererbung","OOP-Mechanismus: Unterklasse erbt Eigenschaften."],
  ["XOR","Logikgatter: 1 wenn Eingänge ungleich."],
];
