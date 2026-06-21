// Erweiterung der Wissensdatenbank — Abitur Informationstechnik komplett
// Hängt weitere Themen & Glossareinträge an die globalen Arrays TOPICS und GLOSS an.

const MORE_TOPICS = [
{
  id:"bool", num:"09", icon:"⊕", title:"Boolesche Algebra & KV-Diagramme",
  desc:"Gesetze der Schaltalgebra, Minimierung mit Karnaugh-Veitch-Diagrammen.",
  tags:["Boolesche Algebra","KV","Minimierung","Schaltnetz"],
  body:`
<p>Die <b>Boolesche Algebra</b> ist die Mathematik der Wahrheitswerte 0 und 1. Sie ist die theoretische Grundlage aller digitalen Schaltungen.</p>

<h3>Wichtige Gesetze</h3>
<ul>
<li><b>Kommutativ:</b> A·B = B·A &nbsp; A+B = B+A</li>
<li><b>Assoziativ:</b> (A·B)·C = A·(B·C)</li>
<li><b>Distributiv:</b> A·(B+C) = A·B + A·C</li>
<li><b>Idempotenz:</b> A+A = A &nbsp; A·A = A</li>
<li><b>Absorption:</b> A + A·B = A</li>
<li><b>De Morgan:</b> <code>¬(A·B) = ¬A + ¬B</code>, <code>¬(A+B) = ¬A · ¬B</code></li>
<li><b>Komplement:</b> A + ¬A = 1, A · ¬A = 0</li>
</ul>

<h3>Normalformen</h3>
<ul>
<li><b>DNF (Disjunktive Normalform)</b> — ODER-Verknüpfung der Minterme (Zeilen mit Ausgang 1).</li>
<li><b>KNF (Konjunktive Normalform)</b> — UND-Verknüpfung der Maxterme (Zeilen mit Ausgang 0).</li>
</ul>

<h3>KV-Diagramm (Karnaugh-Veitch)</h3>
<p>Grafische Methode zur Minimierung Boolescher Funktionen mit bis zu 4 Variablen. Nachbarfelder unterscheiden sich nur in einer Variable (Gray-Code-Anordnung).</p>

<svg class="diag" viewBox="0 0 320 200">
<g font-family="JetBrains Mono" font-size="14" fill="#e6f1ff">
<text x="20" y="20">CD\\AB</text>
<text x="90" y="20">00</text><text x="140" y="20">01</text><text x="190" y="20">11</text><text x="240" y="20">10</text>
<text x="40" y="60">00</text><text x="40" y="100">01</text><text x="40" y="140">11</text><text x="40" y="180">10</text>
</g>
<g stroke="#00f0ff" fill="none" stroke-width="1.5">
<rect x="80" y="40" width="200" height="40"/><rect x="80" y="80" width="200" height="40"/>
<rect x="80" y="120" width="200" height="40"/><rect x="80" y="160" width="200" height="40"/>
<line x1="130" y1="40" x2="130" y2="200"/><line x1="180" y1="40" x2="180" y2="200"/><line x1="230" y1="40" x2="230" y2="200"/>
</g>
<g font-family="JetBrains Mono" font-size="16" fill="#9bff5b" text-anchor="middle">
<text x="105" y="65">0</text><text x="155" y="65">1</text><text x="205" y="65">1</text><text x="255" y="65">0</text>
<text x="105" y="105">1</text><text x="155" y="105">1</text><text x="205" y="105">1</text><text x="255" y="105">1</text>
<text x="105" y="145">0</text><text x="155" y="145">0</text><text x="205" y="145">1</text><text x="255" y="145">0</text>
<text x="105" y="185">0</text><text x="155" y="185">1</text><text x="205" y="185">1</text><text x="255" y="185">0</text>
</g>
<rect x="135" y="50" width="100" height="80" fill="none" stroke="#ff4dff" stroke-width="2"/>
</svg>

<div class="callout">💡 <b>Regeln:</b> Größtmögliche Blöcke aus 1, 2, 4, 8 oder 16 Einsen bilden — nur Zweierpotenzen, immer rechteckig, dürfen über Ränder „herumlaufen".</div>
`
},

{
  id:"zahlen", num:"10", icon:"0x", title:"Zahlensysteme & Codes",
  desc:"Binär, Dezimal, Hexadezimal, BCD, Gray, ASCII, Unicode, 2er-Komplement, Gleitkomma.",
  tags:["Binär","Hex","BCD","ASCII","2er-Komplement","IEEE 754"],
  body:`
<h3>Stellenwertsysteme</h3>
<p>Eine Zahl <code>z</code> zur Basis <code>b</code>: <code>z = Σ aᵢ·bⁱ</code></p>
<ul>
<li><b>Binär (Basis 2):</b> Ziffern 0,1. <code>1011₂ = 8+0+2+1 = 11</code></li>
<li><b>Oktal (8):</b> 0–7</li>
<li><b>Dezimal (10):</b> 0–9</li>
<li><b>Hexadezimal (16):</b> 0–9, A–F. <code>2A₁₆ = 32+10 = 42</code></li>
</ul>

<h3>2er-Komplement (negative Zahlen)</h3>
<ol>
<li>Bits invertieren (1er-Komplement)</li>
<li>+1 addieren</li>
</ol>
<p>Beispiel 8 Bit: <code>+5 = 0000 0101</code> → invertiert <code>1111 1010</code> → +1 = <code>1111 1011 = -5</code>.</p>
<p>Wertebereich n Bit: <code>−2ⁿ⁻¹ … +2ⁿ⁻¹−1</code> (also für 8 Bit: −128…+127).</p>

<h3>BCD &amp; Gray-Code</h3>
<ul>
<li><b>BCD</b>: jede Dezimalziffer als 4-Bit-Block. <code>27 = 0010 0111</code>.</li>
<li><b>Gray-Code</b>: benachbarte Codewörter unterscheiden sich nur in 1 Bit (Drehgeber, KV-Diagramm).</li>
</ul>

<h3>ASCII &amp; Unicode</h3>
<p><b>ASCII</b> nutzt 7 Bit für 128 Zeichen. <code>'A'=65, 'a'=97, '0'=48</code>. <b>Unicode (UTF-8)</b> kodiert &gt;1 Mio. Zeichen variabel mit 1–4 Bytes.</p>

<h3>IEEE 754 Gleitkomma (32 Bit)</h3>
<p><code>Wert = (−1)ˢ · 1,M · 2^(E−127)</code> mit 1 Vorzeichenbit, 8 Exponentenbits, 23 Mantissenbits.</p>

<div class="callout">⚡ Mit dem <b>Tool „Zahlen & 2er-Komplement"</b> unten kannst du sofort umrechnen.</div>
`
},

{
  id:"cpu", num:"11", icon:"⌬", title:"Von-Neumann-Architektur & CPU",
  desc:"Aufbau eines Rechners: Steuerwerk, Rechenwerk, Speicher, Bus, Maschinenzyklus.",
  tags:["CPU","Von Neumann","ALU","Register","Bus"],
  body:`
<p>Die <b>Von-Neumann-Architektur</b> (1945) ist das Grundmodell fast aller Computer. Programm und Daten liegen im selben Speicher.</p>

<svg class="diag" viewBox="0 0 600 240">
<g stroke="#00f0ff" fill="none" stroke-width="2">
<rect x="20" y="40" width="140" height="60" rx="8"/>
<rect x="20" y="140" width="140" height="60" rx="8"/>
<rect x="220" y="40" width="160" height="160" rx="8"/>
<rect x="440" y="40" width="140" height="60" rx="8"/>
<rect x="440" y="140" width="140" height="60" rx="8"/>
<line x1="160" y1="70"  x2="220" y2="70"/>
<line x1="160" y1="170" x2="220" y2="170"/>
<line x1="380" y1="70"  x2="440" y2="70"/>
<line x1="380" y1="170" x2="440" y2="170"/>
</g>
<g font-family="Orbitron" font-size="13" fill="#e6f1ff" text-anchor="middle">
<text x="90" y="75">Steuerwerk</text><text x="90" y="92">(CU)</text>
<text x="90" y="175">Rechenwerk</text><text x="90" y="192">(ALU)</text>
<text x="300" y="115">BUS</text><text x="300" y="135">(Adr/Daten/Steuer)</text>
<text x="510" y="75">Speicher</text><text x="510" y="92">(RAM/ROM)</text>
<text x="510" y="175">E/A</text><text x="510" y="192">(I/O)</text>
</g>
</svg>

<h3>Maschinenzyklus (Fetch–Decode–Execute)</h3>
<ol>
<li><b>FETCH</b>: Befehl aus Speicher in das Befehlsregister (IR) laden, Adresse aus Programmzähler (PC).</li>
<li><b>DECODE</b>: Steuerwerk entschlüsselt den Opcode.</li>
<li><b>EXECUTE</b>: Operanden in ALU, Ergebnis in Register/Speicher schreiben.</li>
<li>PC inkrementieren → nächster Zyklus.</li>
</ol>

<h3>Wichtige Register</h3>
<ul>
<li><b>PC</b> – Program Counter</li>
<li><b>IR</b> – Instruction Register</li>
<li><b>ACC</b> – Akkumulator</li>
<li><b>SP</b> – Stack Pointer</li>
<li><b>Flags</b> – Zero, Carry, Overflow, Sign</li>
</ul>

<h3>Speicherhierarchie</h3>
<p>Register &lt; L1-Cache &lt; L2/L3-Cache &lt; RAM &lt; SSD/HDD &lt; Cloud — schneller, kleiner, teurer oben.</p>
`
},

{
  id:"os", num:"12", icon:"◈", title:"Betriebssysteme: Prozesse & Threads",
  desc:"Scheduling, Multitasking, Synchronisation, Deadlocks.",
  tags:["OS","Prozess","Thread","Scheduling","Deadlock"],
  body:`
<h3>Aufgaben eines Betriebssystems</h3>
<ul>
<li>Prozess- & Speicherverwaltung</li>
<li>Dateisystem &amp; Geräte (Treiber)</li>
<li>Benutzerverwaltung &amp; Sicherheit</li>
<li>Netzwerkstack</li>
</ul>

<h3>Prozess vs. Thread</h3>
<p>Ein <b>Prozess</b> besitzt eigenen Adressraum, ein <b>Thread</b> teilt sich Speicher mit anderen Threads desselben Prozesses (leichter Wechsel).</p>

<h3>Prozesszustände</h3>
<svg class="diag" viewBox="0 0 500 160">
<defs><marker id="arr2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 z" fill="#00f0ff"/></marker></defs>
<g stroke="#00f0ff" fill="none" stroke-width="2">
<rect x="20"  y="60" width="100" height="40" rx="14"/>
<rect x="200" y="20" width="100" height="40" rx="14"/>
<rect x="200" y="100" width="100" height="40" rx="14"/>
<rect x="380" y="60" width="100" height="40" rx="14"/>
<line x1="120" y1="80" x2="200" y2="40" marker-end="url(#arr2)"/>
<line x1="300" y1="40" x2="380" y2="80" marker-end="url(#arr2)"/>
<line x1="380" y1="80" x2="300" y2="120" marker-end="url(#arr2)"/>
<line x1="200" y1="120" x2="120" y2="80" marker-end="url(#arr2)"/>
</g>
<g font-family="Orbitron" font-size="12" fill="#e6f1ff" text-anchor="middle">
<text x="70" y="84">neu</text>
<text x="250" y="44">bereit</text>
<text x="250" y="124">blockiert</text>
<text x="430" y="84">laufend</text>
</g>
</svg>

<h3>Scheduling-Verfahren</h3>
<ul>
<li><b>FCFS</b> – First Come First Served</li>
<li><b>SJF</b> – Shortest Job First</li>
<li><b>Round Robin</b> – Zeitscheibe (Quantum)</li>
<li><b>Priority Scheduling</b></li>
<li><b>Multilevel Feedback Queue</b> (z. B. Linux CFS)</li>
</ul>

<h3>Synchronisation</h3>
<p><b>Race Condition</b>: zwei Threads schreiben unsynchronisiert. Lösung: <b>Mutex</b>, <b>Semaphore</b>, <b>Monitor</b>.</p>
<p><b>Deadlock-Bedingungen (Coffman):</b> (1) gegenseitiger Ausschluss, (2) Halten und Warten, (3) keine Verdrängung, (4) zirkuläres Warten.</p>
`
},

{
  id:"algo", num:"13", icon:"Σ", title:"Algorithmen & O-Notation",
  desc:"Komplexität, Sortierverfahren, Rekursion, Divide & Conquer, Dynamische Programmierung.",
  tags:["Algorithmus","Komplexität","O-Notation","Sortieren","Rekursion"],
  body:`
<h3>Landau-Notation</h3>
<table class="t"><tr><th>O()</th><th>Bedeutung</th><th>Beispiel</th></tr>
<tr><td>O(1)</td><td>konstant</td><td>Array-Zugriff</td></tr>
<tr><td>O(log n)</td><td>logarithmisch</td><td>Binäre Suche</td></tr>
<tr><td>O(n)</td><td>linear</td><td>Lineare Suche</td></tr>
<tr><td>O(n log n)</td><td>quasi-linear</td><td>Mergesort, Quicksort ⌀</td></tr>
<tr><td>O(n²)</td><td>quadratisch</td><td>Bubble-, Insertion-, Selectionsort</td></tr>
<tr><td>O(2ⁿ)</td><td>exponentiell</td><td>Naive Fibonacci</td></tr>
<tr><td>O(n!)</td><td>faktoriell</td><td>TSP brute force</td></tr></table>

<h3>Sortieralgorithmen im Vergleich</h3>
<ul>
<li><b>Bubblesort</b> – einfach, O(n²), stabil.</li>
<li><b>Selectionsort</b> – Minimum suchen, O(n²), nicht stabil.</li>
<li><b>Insertionsort</b> – wie Karten sortieren, O(n²), schnell bei fast sortierten Daten.</li>
<li><b>Mergesort</b> – teilen &amp; verschmelzen, O(n log n), stabil, O(n) Speicher.</li>
<li><b>Quicksort</b> – Pivot &amp; Partition, ⌀ O(n log n), worst O(n²).</li>
<li><b>Heapsort</b> – Heap-Struktur, O(n log n), in-place.</li>
</ul>

<h3>Divide and Conquer</h3>
<p>Problem rekursiv in Teilprobleme zerlegen → lösen → zusammenführen. Beispiele: Mergesort, Quicksort, binäre Suche, FFT.</p>

<h3>Dynamische Programmierung</h3>
<p>Überlappende Teilprobleme einmal lösen und speichern (Memoisation). Klassiker:</p>
<pre>int fib(int n){
  static int memo[100];
  if(n &lt; 2) return n;
  if(memo[n]) return memo[n];
  return memo[n] = fib(n-1) + fib(n-2);
}</pre>
`
},

{
  id:"graph", num:"14", icon:"◊", title:"Graphen, Bäume & Suche",
  desc:"BFS, DFS, Dijkstra, A*, Binärbäume, Heap, AVL.",
  tags:["Graph","Baum","BFS","DFS","Dijkstra"],
  body:`
<h3>Graphen-Grundlagen</h3>
<ul>
<li><b>Gerichtet/ungerichtet</b>, <b>gewichtet/ungewichtet</b>, <b>zyklisch/azyklisch</b>.</li>
<li>Darstellung: <b>Adjazenzmatrix</b> (n²) oder <b>Adjazenzliste</b> (n+m).</li>
</ul>

<h3>Breitensuche (BFS)</h3>
<p>Verwendet eine <b>Warteschlange (FIFO)</b>. Findet kürzeste Pfade in ungewichteten Graphen. O(V+E).</p>
<pre>queue.push(start);
while(!queue.empty()){
  v = queue.pop();
  for(u : nachbarn(v)) if(!besucht[u]){
    besucht[u]=true; queue.push(u);
  }
}</pre>

<h3>Tiefensuche (DFS)</h3>
<p>Verwendet einen <b>Stack (LIFO)</b> oder Rekursion. Erkennt Zyklen, topologische Sortierung.</p>

<h3>Dijkstra (kürzester Pfad)</h3>
<p>Greedy mit Min-Heap. Funktioniert nur bei <b>nicht-negativen Kanten</b>. O((V+E) log V).</p>

<h3>A* (A-Stern)</h3>
<p>f(n) = g(n) + h(n) — g: bisheriger Pfad, h: heuristische Restschätzung. Optimal, wenn h zulässig (unterschätzt nie).</p>

<h3>Bäume</h3>
<ul>
<li><b>Binärbaum</b>: jeder Knoten ≤ 2 Kinder. Traversierungen: <i>preorder</i>, <i>inorder</i>, <i>postorder</i>.</li>
<li><b>BST</b> (Binary Search Tree): links &lt; Knoten &lt; rechts.</li>
<li><b>AVL</b> / <b>Rot-Schwarz</b>: selbst-balancierend, O(log n).</li>
<li><b>Heap</b>: Eltern ≥ (Max-Heap) bzw. ≤ (Min-Heap) Kinder.</li>
</ul>
`
},

{
  id:"crypto", num:"15", icon:"🔐", title:"Kryptographie & IT-Sicherheit",
  desc:"Cäsar, AES, RSA, Hash, Signatur, TLS, DSGVO.",
  tags:["Krypto","RSA","AES","Hash","TLS"],
  body:`
<h3>Symmetrische Verfahren</h3>
<p>Ein gemeinsamer Schlüssel ver- und entschlüsselt. Schnell, aber Schlüsselaustausch ist das Problem.</p>
<ul>
<li><b>Cäsar-Chiffre</b> – Verschiebung um k: <code>c = (m + k) mod 26</code>.</li>
<li><b>Vigenère</b> – Cäsar mit Schlüsselwort.</li>
<li><b>AES</b> – Industriestandard, 128/192/256 Bit, Blockchiffre.</li>
</ul>

<h3>Asymmetrische Verfahren (RSA)</h3>
<ol>
<li>Zwei große Primzahlen p, q wählen → n = p·q</li>
<li>φ(n) = (p−1)(q−1); öffentliches e mit ggT(e,φ)=1</li>
<li>d ≡ e⁻¹ (mod φ)</li>
<li><b>Verschlüsseln:</b> c = mᵉ mod n &nbsp; <b>Entschlüsseln:</b> m = cᵈ mod n</li>
</ol>
<p>Sicherheit beruht auf der Schwierigkeit, n in p·q zu zerlegen.</p>

<h3>Hashfunktionen</h3>
<p>Einwegfunktion mit fester Länge. <b>SHA-256</b>, <b>SHA-3</b>. Eigenschaften: deterministisch, kollisionsresistent, Lawineneffekt.</p>

<h3>Digitale Signatur</h3>
<p>Hash der Nachricht mit <b>privatem</b> Schlüssel verschlüsseln → Empfänger prüft mit <b>öffentlichem</b> Schlüssel.</p>

<h3>TLS / HTTPS</h3>
<ol>
<li>Client Hello (unterstützte Cipher, Random)</li>
<li>Server Hello + Zertifikat (öffentlicher Schlüssel)</li>
<li>Schlüsselaustausch (z. B. ECDHE) → Sitzungsschlüssel</li>
<li>Verschlüsselte Anwendungsdaten (AES-GCM)</li>
</ol>

<h3>DSGVO-Grundsätze</h3>
<p>Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität &amp; Vertraulichkeit, Rechenschaftspflicht.</p>
`
},

{
  id:"automat", num:"16", icon:"∞", title:"Automaten, Sprachen & Berechenbarkeit",
  desc:"DEA, NEA, reguläre Ausdrücke, kontextfreie Grammatiken, Turingmaschine.",
  tags:["DEA","NEA","Regex","Grammatik","Turing"],
  body:`
<h3>Deterministischer endlicher Automat (DEA)</h3>
<p>Tupel <code>(Q, Σ, δ, q₀, F)</code> – Zustände, Alphabet, Übergangsfunktion, Startzustand, Endzustände.</p>

<svg class="diag" viewBox="0 0 420 140">
<defs><marker id="arr3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 z" fill="#00f0ff"/></marker></defs>
<g stroke="#00f0ff" fill="none" stroke-width="2">
<circle cx="80" cy="70" r="30"/>
<circle cx="230" cy="70" r="30"/>
<circle cx="380" cy="70" r="30"/>
<circle cx="380" cy="70" r="24"/>
<line x1="10" y1="70" x2="48" y2="70" marker-end="url(#arr3)"/>
<line x1="112" y1="70" x2="198" y2="70" marker-end="url(#arr3)"/>
<line x1="262" y1="70" x2="346" y2="70" marker-end="url(#arr3)"/>
</g>
<g font-family="Orbitron" font-size="14" fill="#e6f1ff" text-anchor="middle">
<text x="80" y="75">q0</text><text x="230" y="75">q1</text><text x="380" y="75">q2</text>
<text x="155" y="60" fill="#9bff5b">a</text><text x="305" y="60" fill="#9bff5b">b</text>
</g>
</svg>
<p>Akzeptiert die Sprache <code>{ab}</code>.</p>

<h3>Reguläre Ausdrücke</h3>
<table class="t"><tr><th>Regex</th><th>Bedeutung</th></tr>
<tr><td><code>.</code></td><td>beliebiges Zeichen</td></tr>
<tr><td><code>a*</code></td><td>0 oder mehr a</td></tr>
<tr><td><code>a+</code></td><td>1 oder mehr a</td></tr>
<tr><td><code>a?</code></td><td>0 oder 1 a</td></tr>
<tr><td><code>[a-z]</code></td><td>Zeichenklasse</td></tr>
<tr><td><code>^abc$</code></td><td>Anfang/Ende</td></tr>
<tr><td><code>\\d \\w \\s</code></td><td>Ziffer/Wort/Whitespace</td></tr></table>

<h3>Chomsky-Hierarchie</h3>
<ol>
<li>Typ 3 – regulär (endlicher Automat)</li>
<li>Typ 2 – kontextfrei (Kellerautomat)</li>
<li>Typ 1 – kontextsensitiv (linear beschränkter Automat)</li>
<li>Typ 0 – rekursiv aufzählbar (Turingmaschine)</li>
</ol>

<h3>Turingmaschine</h3>
<p>Modell der Berechenbarkeit: unendliches Band, Lese-/Schreibkopf, Zustandsregister. Definiert die Klasse aller berechenbaren Funktionen (Church-Turing-These).</p>
<p><b>Halteproblem</b> ist <i>unentscheidbar</i>.</p>
`
},

{
  id:"se", num:"17", icon:"⌥", title:"Software-Engineering & Vorgehensmodelle",
  desc:"Wasserfall, V-Modell, Scrum, Test, Versionierung.",
  tags:["SE","Scrum","Wasserfall","Test","Git"],
  body:`
<h3>Vorgehensmodelle</h3>
<ul>
<li><b>Wasserfall</b>: Analyse → Entwurf → Implementierung → Test → Betrieb. Linear, viel Doku.</li>
<li><b>V-Modell</b>: jede Entwicklungsphase hat eine Testphase.</li>
<li><b>Spiralmodell</b>: iterative Risikobewertung.</li>
<li><b>Scrum</b>: agil, 2–4 Wochen Sprints, Rollen <i>Product Owner</i>, <i>Scrum Master</i>, <i>Dev-Team</i>; Artefakte <i>Product Backlog</i>, <i>Sprint Backlog</i>, <i>Increment</i>.</li>
<li><b>Kanban</b>: kontinuierlicher Fluss, WIP-Limits.</li>
</ul>

<h3>Test-Pyramide</h3>
<ol>
<li><b>Unit-Tests</b> (viele, schnell)</li>
<li><b>Integrationstests</b></li>
<li><b>System-/End-to-End-Tests</b> (wenige, langsam)</li>
</ol>
<p>Methoden: <b>Black-Box</b> (Äquivalenzklassen, Grenzwertanalyse), <b>White-Box</b> (Pfadüberdeckung).</p>

<h3>Versionierung mit Git</h3>
<pre>git init
git add .
git commit -m "init"
git branch feature
git checkout feature
git merge main
git push origin feature</pre>
`
},

{
  id:"uml2", num:"18", icon:"◆", title:"UML: Klassen-, Sequenz- & Aktivitätsdiagramm",
  desc:"Strukturelle und dynamische UML-Diagramme verstehen und zeichnen.",
  tags:["UML","Klasse","Sequenz","Aktivität","OOP"],
  body:`
<h3>Klassendiagramm</h3>
<p>Strukturelles Diagramm: Klassen mit <b>Attributen</b> und <b>Methoden</b>, verbunden durch Assoziationen.</p>

<svg class="diag" viewBox="0 0 520 180">
<g stroke="#00f0ff" fill="none" stroke-width="2">
<rect x="40" y="20" width="180" height="140"/>
<line x1="40" y1="50" x2="220" y2="50"/>
<line x1="40" y1="105" x2="220" y2="105"/>
<rect x="300" y="20" width="180" height="140"/>
<line x1="300" y1="50" x2="480" y2="50"/>
<line x1="300" y1="105" x2="480" y2="105"/>
<line x1="220" y1="90" x2="300" y2="90" marker-end="url(#arr)"/>
</g>
<g font-family="Orbitron" font-size="13" fill="#e6f1ff" text-anchor="middle">
<text x="130" y="42">Schueler</text>
<text x="390" y="42">Kurs</text>
</g>
<g font-family="JetBrains Mono" font-size="11" fill="#9bff5b">
<text x="50" y="70">- name: String</text>
<text x="50" y="86">- alter: int</text>
<text x="50" y="125">+ lernen(): void</text>
<text x="50" y="141">+ getName(): String</text>
<text x="310" y="70">- titel: String</text>
<text x="310" y="86">- raum: int</text>
<text x="310" y="125">+ starten(): void</text>
</g>
<text x="260" y="85" fill="#ffb845" font-family="JetBrains Mono" font-size="11" text-anchor="middle">besucht *</text>
</svg>

<h3>Sichtbarkeiten</h3>
<p><code>+</code> public, <code>−</code> private, <code>#</code> protected, <code>~</code> package.</p>

<h3>Beziehungen</h3>
<ul>
<li><b>Assoziation</b> — einfache Linie.</li>
<li><b>Aggregation</b> — leere Raute (Teil-Ganzes, lose).</li>
<li><b>Komposition</b> — gefüllte Raute (Teil stirbt mit dem Ganzen).</li>
<li><b>Vererbung</b> — leerer Dreieckspfeil zur Oberklasse.</li>
<li><b>Realisierung</b> — gestrichelte Linie mit Dreieckspfeil (Interface).</li>
</ul>

<h3>Sequenzdiagramm</h3>
<p>Zeitachse von oben nach unten. Lebenslinien als gestrichelte Vertikalen, Botschaften als Pfeile. <b>synchron</b> = gefüllter Pfeil, <b>asynchron</b> = offener.</p>

<h3>Aktivitätsdiagramm</h3>
<p>Wie ein Flussdiagramm mit <i>Verzweigungen</i> (Raute), <i>Parallelisierung</i> (Synchronisationsbalken), Start (●) und Ende (◉).</p>
`
},

{
  id:"web", num:"19", icon:"⟨/⟩", title:"Webtechnologien: HTML, CSS, JS & REST",
  desc:"Client/Server-Modell, HTML-Struktur, CSS-Layout, JS-DOM, HTTP-Methoden, REST, JSON.",
  tags:["HTML","CSS","JavaScript","HTTP","REST","JSON"],
  body:`
<h3>Client-Server-Modell</h3>
<p>Der <b>Browser</b> sendet HTTP-Requests, der <b>Server</b> antwortet mit Ressourcen (HTML, CSS, JS, Bilder, JSON).</p>

<h3>HTTP-Methoden</h3>
<ul>
<li><b>GET</b> – Ressource lesen (idempotent, cachebar)</li>
<li><b>POST</b> – Ressource anlegen / Aktion auslösen</li>
<li><b>PUT</b> – komplett ersetzen (idempotent)</li>
<li><b>PATCH</b> – teilweise ändern</li>
<li><b>DELETE</b> – löschen (idempotent)</li>
</ul>

<h3>Statuscodes</h3>
<p><b>2xx</b> Erfolg · <b>3xx</b> Weiterleitung · <b>4xx</b> Client-Fehler (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found) · <b>5xx</b> Server-Fehler (500, 503).</p>

<h3>REST-Prinzipien</h3>
<ul>
<li>Ressourcen über eindeutige URIs (<code>/api/schueler/3</code>).</li>
<li>Zustandslos.</li>
<li>Standard-HTTP-Methoden.</li>
<li>Repräsentationen meist JSON.</li>
</ul>

<h3>Beispiel: JSON-Antwort</h3>
<pre>GET /api/schueler/3 HTTP/1.1
Accept: application/json

200 OK
{
  "id": 3,
  "name": "Cara",
  "klasse": "J2"
}</pre>

<h3>HTML-Mini-Anatomie</h3>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="de"&gt;
  &lt;head&gt;&lt;title&gt;Hallo&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;&lt;h1&gt;Hi&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;</pre>

<h3>CSS-Boxmodell</h3>
<p><i>content → padding → border → margin</i>. Layouts mit <b>Flexbox</b> oder <b>Grid</b>.</p>

<h3>JavaScript &amp; DOM</h3>
<pre>document.querySelector("#btn")
  .addEventListener("click", () =&gt; {
    fetch("/api/data")
      .then(r =&gt; r.json())
      .then(d =&gt; console.log(d));
  });</pre>
`
},

{
  id:"db2", num:"20", icon:"⛁", title:"Datenbanken: Normalisierung & SQL erweitert",
  desc:"1NF, 2NF, 3NF, JOIN-Typen, GROUP BY, Aggregatfunktionen, Transaktionen (ACID).",
  tags:["Normalisierung","JOIN","GROUP BY","ACID","Transaktion"],
  body:`
<h3>Normalformen</h3>
<ul>
<li><b>1NF</b> – atomare Werte, keine Wiederholungsgruppen.</li>
<li><b>2NF</b> – 1NF + jedes Nicht-Schlüssel-Attribut hängt vom <i>vollständigen</i> Schlüssel ab.</li>
<li><b>3NF</b> – 2NF + keine transitiven Abhängigkeiten.</li>
<li><b>BCNF</b> – verschärfte 3NF.</li>
</ul>

<h3>JOIN-Typen</h3>
<svg class="diag" viewBox="0 0 480 120">
<g fill="none" stroke="#00f0ff" stroke-width="2">
<circle cx="80" cy="60" r="35"/><circle cx="120" cy="60" r="35"/>
<circle cx="230" cy="60" r="35"/><circle cx="270" cy="60" r="35"/>
<circle cx="380" cy="60" r="35"/><circle cx="420" cy="60" r="35"/>
</g>
<g fill="#b14bff" opacity="0.5">
<path d="M 95 30 A 35 35 0 0 1 95 90 A 35 35 0 0 1 95 30 Z"/>
</g>
<text x="100" y="115" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">INNER</text>
<text x="250" y="115" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">LEFT</text>
<text x="400" y="115" fill="#e6f1ff" text-anchor="middle" font-family="Orbitron" font-size="12">FULL OUTER</text>
</svg>

<pre>SELECT s.Name, l.Titel, t.Note
FROM Schueler s
INNER JOIN Teilnahme t ON s.SID = t.SID
INNER JOIN Labor    l ON l.LID = t.LID
WHERE t.Note &lt;= 2
ORDER BY t.Note;</pre>

<h3>Aggregatfunktionen &amp; GROUP BY</h3>
<pre>SELECT Klasse, COUNT(*) AS Anzahl, AVG(Alter) AS DurchschnittsAlter
FROM Schueler
GROUP BY Klasse
HAVING COUNT(*) &gt; 5;</pre>
<p>Funktionen: <code>COUNT, SUM, AVG, MIN, MAX</code>.</p>

<h3>ACID-Eigenschaften</h3>
<ul>
<li><b>A</b>tomarität – ganz oder gar nicht</li>
<li><b>C</b>onsistency – Integritätsbedingungen bleiben gewahrt</li>
<li><b>I</b>solation – Transaktionen beeinflussen sich nicht</li>
<li><b>D</b>urability – nach Commit dauerhaft gespeichert</li>
</ul>
`
},

{
  id:"ml", num:"21", icon:"🧠", title:"Maschinelles Lernen vertieft",
  desc:"Entscheidungsbaum (Gini/Entropie), k-NN, k-Means, Aktivierungsfunktionen, Loss.",
  tags:["ML","Entscheidungsbaum","k-NN","k-Means","Sigmoid","ReLU"],
  body:`
<h3>Lernarten</h3>
<ul>
<li><b>Überwacht</b> (Klassifikation, Regression)</li>
<li><b>Unüberwacht</b> (Clustering, Dimensionsreduktion)</li>
<li><b>Bestärkend</b> (Reinforcement Learning, Agent ↔ Umwelt)</li>
</ul>

<h3>Entscheidungsbaum</h3>
<p>Maße zur Splitwahl:</p>
<ul>
<li><b>Gini</b> = 1 − Σ pᵢ²</li>
<li><b>Entropie</b> H = −Σ pᵢ · log₂ pᵢ</li>
<li><b>Information Gain</b> = H(Eltern) − Σ (|Kind|/|Eltern|) · H(Kind)</li>
</ul>

<h3>k-Nearest-Neighbors</h3>
<ol>
<li>Distanz (z. B. euklidisch) zu allen Trainingspunkten.</li>
<li>k nächste auswählen.</li>
<li>Mehrheitsklasse → Vorhersage.</li>
</ol>

<h3>k-Means-Clustering</h3>
<ol>
<li>k zufällige Zentren wählen.</li>
<li>Punkte dem nächsten Zentrum zuordnen.</li>
<li>Zentren = Mittelwert der zugeordneten Punkte.</li>
<li>Wiederholen, bis stabil.</li>
</ol>

<h3>Aktivierungsfunktionen</h3>
<ul>
<li><b>Sigmoid</b> σ(x) = 1/(1+e⁻ˣ) → (0,1)</li>
<li><b>Tanh</b> → (−1,1)</li>
<li><b>ReLU</b> = max(0, x) – Standard in tiefen Netzen.</li>
<li><b>Softmax</b> – Wahrscheinlichkeitsverteilung über Klassen.</li>
</ul>

<h3>Loss-Funktionen</h3>
<p>Regression: <b>MSE</b> = 1/n · Σ(y−ŷ)². Klassifikation: <b>Cross-Entropy</b> = −Σ y·log(ŷ).</p>

<h3>Overfitting bekämpfen</h3>
<p>Mehr Daten, <b>Regularisierung</b> (L1, L2, Dropout), <b>Cross-Validation</b>, <b>Early Stopping</b>.</p>
`
},

{
  id:"bus", num:"22", icon:"⇌", title:"Bussysteme & Schnittstellen",
  desc:"I²C, SPI, UART, CAN, USB — wann nutzt man was?",
  tags:["I2C","SPI","UART","CAN","USB"],
  body:`
<h3>Vergleich</h3>
<table class="t">
<tr><th>Bus</th><th>Leitungen</th><th>Master</th><th>Speed (typ.)</th><th>Einsatz</th></tr>
<tr><td>UART</td><td>TX, RX (GND)</td><td>peer-to-peer</td><td>9600 Bd – 1 MBd</td><td>seriell debugging, GPS</td></tr>
<tr><td>I²C</td><td>SDA, SCL</td><td>multi-master</td><td>100 kHz / 400 kHz / 1 MHz</td><td>Sensoren, EEPROM</td></tr>
<tr><td>SPI</td><td>MOSI, MISO, SCK, CS</td><td>single master</td><td>10–50 MHz</td><td>SD-Karte, Display</td></tr>
<tr><td>CAN</td><td>CAN_H, CAN_L</td><td>multi-master, prioritätsbasiert</td><td>1 Mbit/s</td><td>KFZ-Steuergeräte</td></tr>
<tr><td>USB</td><td>D+, D−, V, GND</td><td>host/device</td><td>USB 2: 480 Mb/s</td><td>Peripherie</td></tr>
</table>

<h3>I²C-Adressierung</h3>
<p>7-Bit-Adresse + R/W-Bit. Adresse 0x68 → Byte = <code>1101 000 0</code> (Write).</p>

<h3>A/D-Wandlung</h3>
<p>Auflösung n Bit → 2ⁿ Stufen. Quantisierungsstufe Q = U<sub>ref</sub> / 2ⁿ.
Beispiel ATmega328 (10 Bit, 5 V): Q ≈ 4,88 mV.</p>

<h3>Abtasttheorem (Nyquist-Shannon)</h3>
<p>Abtastfrequenz <code>fₛ ≥ 2·f<sub>max</sub></code>, sonst Aliasing.</p>
`
},

{
  id:"funk", num:"23", icon:"📡", title:"Funktechnologien & IoT-Protokolle",
  desc:"WLAN, Bluetooth, BLE, Zigbee, LoRa, NB-IoT, NFC, RFID.",
  tags:["WLAN","Bluetooth","LoRa","Zigbee","NFC"],
  body:`
<h3>Vergleich</h3>
<table class="t">
<tr><th>Technik</th><th>Frequenz</th><th>Reichweite</th><th>Datenrate</th><th>Stromverbrauch</th></tr>
<tr><td>WLAN (Wi-Fi 6)</td><td>2,4 / 5 / 6 GHz</td><td>~50 m</td><td>bis ~Gbit/s</td><td>hoch</td></tr>
<tr><td>Bluetooth Classic</td><td>2,4 GHz</td><td>~10 m</td><td>3 Mbit/s</td><td>mittel</td></tr>
<tr><td>BLE</td><td>2,4 GHz</td><td>~30 m</td><td>1–2 Mbit/s</td><td>sehr niedrig</td></tr>
<tr><td>Zigbee</td><td>2,4 GHz</td><td>~30 m, Mesh</td><td>250 kbit/s</td><td>niedrig</td></tr>
<tr><td>LoRa</td><td>868 MHz (EU)</td><td>2–15 km</td><td>0,3–50 kbit/s</td><td>sehr niedrig</td></tr>
<tr><td>NB-IoT</td><td>LTE-Bänder</td><td>10 km</td><td>~250 kbit/s</td><td>niedrig</td></tr>
<tr><td>NFC</td><td>13,56 MHz</td><td>&lt; 10 cm</td><td>424 kbit/s</td><td>sehr niedrig</td></tr>
</table>

<h3>MQTT-Architektur</h3>
<p>Geräte (Publisher) publizieren <i>Topics</i> wie <code>sensor/temp/wohnzimmer</code>. Broker (z. B. Mosquitto) verteilt an Abonnenten. QoS-Stufen 0/1/2.</p>

<h3>OSI &amp; TCP/IP-Modell</h3>
<table class="t">
<tr><th>OSI-Schicht</th><th>TCP/IP</th><th>Beispiel</th></tr>
<tr><td>7 Anwendung</td><td>Anwendung</td><td>HTTP, MQTT, DNS</td></tr>
<tr><td>6 Darstellung</td><td>Anwendung</td><td>TLS, JSON</td></tr>
<tr><td>5 Sitzung</td><td>Anwendung</td><td>Sockets</td></tr>
<tr><td>4 Transport</td><td>Transport</td><td>TCP, UDP</td></tr>
<tr><td>3 Vermittlung</td><td>Internet</td><td>IP, ICMP</td></tr>
<tr><td>2 Sicherung</td><td>Netzzugang</td><td>Ethernet, WLAN-MAC</td></tr>
<tr><td>1 Bitübertragung</td><td>Netzzugang</td><td>Kabel, Funk</td></tr>
</table>
`
},

{
  id:"hash", num:"24", icon:"⌗", title:"Hashing, Kompression & Codierung",
  desc:"Hashtabellen, Kollisionsstrategien, Huffman, Lauflängen, Lempel-Ziv.",
  tags:["Hash","Huffman","RLE","LZ77","Kompression"],
  body:`
<h3>Hashtabelle</h3>
<p>Datenstruktur mit ⌀ O(1)-Zugriff. <b>Hashfunktion</b> bildet Schlüssel → Index ab. Kollisionen:</p>
<ul>
<li><b>Verkettung</b> (Chaining) – Liste pro Slot.</li>
<li><b>Offene Adressierung</b> – lineares/quadratisches Sondieren, Double Hashing.</li>
</ul>
<p><b>Load Factor</b> α = n/m. Bei α &gt; 0,7 sollte vergrößert werden.</p>

<h3>Huffman-Codierung</h3>
<ol>
<li>Häufigkeiten zählen.</li>
<li>Zwei Knoten mit kleinster Häufigkeit zu Elternknoten verschmelzen (Min-Heap).</li>
<li>Wiederholen, bis ein Baum entsteht.</li>
<li>0 = links, 1 = rechts → präfixfreier Code.</li>
</ol>

<h3>Lauflängenkodierung (RLE)</h3>
<p><code>AAAABBBCCDA</code> → <code>4A3B2C1D1A</code>. Gut bei wiederholten Mustern (z. B. Fax).</p>

<h3>Verlustbehaftet vs. verlustfrei</h3>
<ul>
<li><b>Verlustfrei</b>: ZIP, PNG, FLAC, Huffman.</li>
<li><b>Verlustbehaftet</b>: JPEG (DCT), MP3 (psychoakustisch), MP4/H.264.</li>
</ul>
`
},
];

// Append to globals
TOPICS.push(...MORE_TOPICS);

const MORE_GLOSS = [
  ["ACID","Atomarität, Consistency, Isolation, Durability — Eigenschaften von Transaktionen."],
  ["Adjazenzliste","Effiziente Graph-Darstellung mit Nachbarn-Liste pro Knoten."],
  ["AES","Advanced Encryption Standard, symmetrische Blockchiffre 128/192/256 Bit."],
  ["Algorithmus","Endliche, eindeutige Schrittfolge zur Lösung eines Problems."],
  ["Aliasing","Fehler durch zu niedrige Abtastrate (siehe Nyquist)."],
  ["A*","Heuristische Wegfindung: f(n) = g(n) + h(n)."],
  ["AVL-Baum","Selbstbalancierender Binärbaum mit Höhenunterschied ≤ 1."],
  ["BCD","Binary Coded Decimal — jede Ziffer als 4 Bit."],
  ["BFS","Breitensuche, Queue-basiert, kürzeste Pfade in ungewichteten Graphen."],
  ["BLE","Bluetooth Low Energy — stromsparendes Funkprotokoll."],
  ["Boxmodell","CSS-Modell aus content, padding, border, margin."],
  ["BST","Binary Search Tree — links < Knoten < rechts."],
  ["Bus","Gemeinsame Leitung mehrerer Geräte (Adresse, Daten, Steuer)."],
  ["Cache","Schneller Pufferspeicher zwischen CPU und RAM."],
  ["CAN-Bus","Robustes Bussystem im Automobilbereich."],
  ["Cäsar-Chiffre","Verschiebechiffre c = (m + k) mod 26."],
  ["Chomsky-Hierarchie","Klassifikation formaler Sprachen Typ 0–3."],
  ["Compiler","Übersetzt Quellcode in Maschinencode."],
  ["Cross-Validation","Wechselseitiges Aufteilen von Trainings-/Testdaten."],
  ["DEA","Deterministischer endlicher Automat."],
  ["Deadlock","Zirkuläre Sperrabhängigkeit zwischen Prozessen."],
  ["DFS","Tiefensuche, Stack/Rekursion."],
  ["Dijkstra","Kürzester-Pfad-Algorithmus für nicht-negative Kanten."],
  ["DNF","Disjunktive Normalform — ODER von Mintermen."],
  ["DOM","Document Object Model — Baumstruktur einer HTML-Seite."],
  ["DSGVO","Datenschutz-Grundverordnung der EU."],
  ["Dynamische Programmierung","Speicherung von Teilergebnissen zur Vermeidung doppelter Arbeit."],
  ["Encapsulation","OOP-Prinzip: Daten + Methoden in einer Klasse kapseln."],
  ["Entropie","Maß für Informationsgehalt: H = −Σ p·log₂ p."],
  ["Ereignistransition","UML-Übergang ausgelöst durch Ereignis."],
  ["Flexbox","Eindimensionales CSS-Layoutsystem."],
  ["Flussdiagramm","Grafische Darstellung von Programmabläufen."],
  ["Gateway","Verbindet Netze unterschiedlicher Protokolle."],
  ["Gleitkomma","IEEE 754: Vorzeichen, Exponent, Mantisse."],
  ["Gray-Code","Code, bei dem benachbarte Werte sich in nur 1 Bit unterscheiden."],
  ["Greedy","Strategie: in jedem Schritt das lokal Beste wählen."],
  ["Halbaddierer","Schaltnetz für Summe und Übertrag zweier Bits."],
  ["Halteproblem","Unentscheidbar: Hält ein gegebenes Programm an?"],
  ["Hashfunktion","Bildet beliebige Daten auf festen Wert ab."],
  ["Heap","Binärbaum mit Heap-Eigenschaft (Max- oder Min-)."],
  ["Heuristik","Vereinfachte Schätzung zur Suchbeschleunigung (z. B. A*)."],
  ["Huffman","Verlustfreie Kompression mit präfixfreiem Code."],
  ["I²C","Zwei-Draht-Bus (SDA, SCL) mit Adressierung."],
  ["IEEE 754","Standard zur Gleitkommadarstellung."],
  ["Inheritance","Vererbung in der OOP."],
  ["Interpreter","Führt Quellcode direkt aus, ohne ihn vorher zu übersetzen."],
  ["JSON","JavaScript Object Notation, leichtgewichtiges Datenformat."],
  ["KNF","Konjunktive Normalform — UND von Maxtermen."],
  ["k-NN","k-Nearest-Neighbor-Klassifikator."],
  ["k-Means","Clustering-Algorithmus mit k Schwerpunkten."],
  ["KV-Diagramm","Karnaugh-Veitch — grafische Minimierung."],
  ["Latch","Pegelgesteuertes Speicherelement."],
  ["Loss-Funktion","Maß für Vorhersagefehler beim ML."],
  ["LoRa","Funktechnologie für IoT mit großer Reichweite."],
  ["MAC-Adresse","48-Bit-Hardwareadresse einer Netzwerkkarte."],
  ["Memoisation","Zwischenspeichern bereits berechneter Werte."],
  ["Mergesort","Divide-and-Conquer-Sortierung O(n log n)."],
  ["Minterm","Konjunktion aller Variablen für eine 1-Zeile."],
  ["Multiplexer","Wählt aus mehreren Eingängen einen aus."],
  ["Mutex","Mutual Exclusion — Lock zum Schutz kritischer Abschnitte."],
  ["Normalform","Strukturkriterium für relationale Datenbanken."],
  ["Nyquist","Abtastfrequenz ≥ 2·f_max."],
  ["Opcode","Operationscode eines Maschinenbefehls."],
  ["OSI-Modell","7-Schichten-Referenzmodell für Netzwerke."],
  ["Overfitting","Modell lernt Rauschen statt Muster."],
  ["Pipeline","Parallele Bearbeitung mehrerer Befehle in CPU-Stufen."],
  ["Polymorphismus","OOP: gleiche Methode, unterschiedliches Verhalten."],
  ["PrimaryKey","Eindeutiger Schlüssel einer DB-Tabelle."],
  ["Prozess","Programm in Ausführung mit eigenem Adressraum."],
  ["Quicksort","Sortieralgorithmus mit Pivot, ⌀ O(n log n)."],
  ["Race Condition","Fehler durch unkoordinierte Parallelzugriffe."],
  ["Regex","Reguläre Ausdrücke zur Mustererkennung."],
  ["ReLU","f(x) = max(0,x), häufige Aktivierungsfunktion."],
  ["REST","Architekturstil für Webservices."],
  ["RSA","Asymmetrisches Krypto-Verfahren basierend auf Primfaktorzerlegung."],
  ["Scrum","Agiles Vorgehensmodell mit Sprints."],
  ["SHA-256","Kryptographische Hashfunktion mit 256 Bit Ausgabe."],
  ["Sigmoid","σ(x) = 1/(1+e⁻ˣ)."],
  ["SPI","Serielles Bussystem mit MOSI/MISO/SCK/CS."],
  ["Sprint","Zeitlich begrenzte Iteration in Scrum (2–4 Wochen)."],
  ["StateMachine","Zustandsautomat."],
  ["Switch","Vermittlungsgerät auf OSI-Schicht 2."],
  ["TLS","Transport Layer Security — verschlüsselt HTTPS."],
  ["Turingmaschine","Theoretisches Berechnungsmodell."],
  ["UART","Asynchrone serielle Schnittstelle."],
  ["Unicode","Universeller Zeichenkodierungsstandard."],
  ["Volladdierer","Addiert zwei Bits + Übertrag."],
  ["Von Neumann","Rechnerarchitektur mit gemeinsamen Daten-/Programmspeicher."],
  ["Wasserfallmodell","Linear-sequenzielles Vorgehen."],
  ["WLAN","Wireless LAN nach IEEE 802.11."],
  ["Zigbee","Funkprotokoll für Smart-Home-Mesh-Netze."],
  ["Zweierkomplement","Darstellung negativer Binärzahlen."],
];

GLOSS.push(...MORE_GLOSS);
