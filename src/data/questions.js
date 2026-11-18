export const QUESTIONS = [
  // ================= VOCABULARY (5 Questions) =================
  {
    id: 'v1',
    skill: 'Vocabulary',
    microTopic: 'Separable Verbs & Travel',
    whyItMatters: 'Goethe/ÖSD Reading & Listening heavily test train announcements and travel verbs.',
    actionDrill: 'Spend 20 mins writing 10 sentences using separable travel verbs: abfahren, ankommen, einsteigen, umsteigen.',
    question: 'Der Zug nach München fährt um 14:30 Uhr ___. Wir müssen pünktlich am Gleis 4 sein.',
    options: ['ab', 'an', 'ein', 'auf'],
    correctIndex: 0,
    explanation: '"abfahren" means to depart. Since the train leaves at 14:30, "fährt ... ab" is required.'
  },
  {
    id: 'v2',
    skill: 'Vocabulary',
    microTopic: 'Time, Dates & Schedules',
    whyItMatters: 'Misreading time expressions (halb vs. Viertel) is a top trap in Goethe Hören & Lesen.',
    actionDrill: 'Practice 15 clock-reading flashcards focusing on "halb vier" (3:30) vs. "Viertel vor/nach".',
    question: 'Der Deutschkurs beginnt um 9:00 Uhr. Jetzt ist es 8:45 Uhr. Der Kurs beginnt in ___ Stunde.',
    options: ['einer Viertel', 'einer halben', 'einem Viertel', 'dreiviertel'],
    correctIndex: 0,
    explanation: '8:45 to 9:00 is 15 minutes = "eine Viertelstunde" (in dative: "in einer Viertelstunde").'
  },
  {
    id: 'v3',
    skill: 'Vocabulary',
    microTopic: 'Workplace & Daily Actions',
    whyItMatters: 'Core verbs around work, forms, and appointments appear in almost every A1 writing prompt.',
    actionDrill: 'Review 15 high-frequency A1 office/admin nouns & verbs (Formular ausfüllen, unterschreiben, Termin vereinbaren).',
    question: 'Bitte ___ Sie dieses Formular aus und unterschreiben Sie hier unten.',
    options: ['füllen', 'machen', 'schreiben', 'geben'],
    correctIndex: 0,
    explanation: '"ein Formular ausfüllen" is the fixed German collocation for filling out a form.'
  },
  {
    id: 'v4',
    skill: 'Vocabulary',
    microTopic: 'Numbers, Prices & Shopping',
    whyItMatters: 'Essential for Reading Teil 2 (ads/menus) and Listening Teil 1 (prices/phone numbers).',
    actionDrill: 'Do 10 price & quantity listening/reading drills (Stück, Packung, Angebot, kosten, bezahlen).',
    question: 'Entschuldigung, wie viel ___ die Äpfel? – Zwei Euro fünfzig pro Kilo.',
    options: ['kosten', 'bezahlen', 'kaufen', 'nehmen'],
    correctIndex: 0,
    explanation: '"Wie viel kosten...?" asks for the price of plural items ("die Äpfel").'
  },
  {
    id: 'v5',
    skill: 'Vocabulary',
    microTopic: 'Adjectives & Opposites',
    whyItMatters: 'Apartment ads and signs test whether you know basic opposites (alt/neu, hell/dunkel, geschlossen/geöffnet).',
    actionDrill: 'Create a 2-column table of 20 A1 adjective pairs (teuer/billig, ruhig/laut, frei/besetzt) and test yourself.',
    question: 'Die Wohnung ist sehr ___. Sie hat große Fenster und viel Sonne.',
    options: ['hell', 'dunkel', 'leise', 'schmal'],
    correctIndex: 0,
    explanation: 'Large windows and lots of sun describe a bright ("hell") apartment.'
  },

  // ================= GRAMMAR (5 Questions) =================
  {
    id: 'g1',
    skill: 'Grammar',
    microTopic: 'Negation (kein vs. nicht) & Accusative',
    whyItMatters: 'Masculine accusative endings (einen/keinen) are tested directly in Schreiben & Sprachbausteine.',
    actionDrill: 'Complete 15 fill-in-the-blank drills contrasting "nicht" (verbs/adjectives) vs. "kein/keinen" (nouns).',
    question: 'Ich habe ___ Bruder, aber ich habe zwei Schwestern.',
    options: ['keinen', 'nicht', 'kein', 'keine'],
    correctIndex: 0,
    explanation: '"der Bruder" is masculine singular and takes the Accusative case after "haben" → "keinen Bruder".'
  },
  {
    id: 'g2',
    skill: 'Grammar',
    microTopic: 'Verb-Second (V2) Word Order',
    whyItMatters: 'Starting a sentence with time/place requires inverting subject and verb—a classic A1 error.',
    actionDrill: 'Rewrite 10 standard sentences starting with "Morgen...", "Am Wochenende...", or "In Berlin..." keeping the verb in position 2.',
    question: 'Am Wochenende ___ meine Familie nach Hamburg.',
    options: ['fährt', 'fahren', 'fahre', 'gefahren'],
    correctIndex: 0,
    explanation: '"Am Wochenende" occupies Position 1, so the conjugated verb ("fährt" for singular "meine Familie") must stay in Position 2.'
  },
  {
    id: 'g3',
    skill: 'Grammar',
    microTopic: 'Modal Verbs & Sentence Bracket',
    whyItMatters: 'Modal verbs (können, müssen, möchten) are essential for Speaking Teil 3 (making requests).',
    actionDrill: 'Practice 12 request sentences using "Können Sie bitte...?" and "Ich möchte gerne..." with the infinitive at the end.',
    question: 'Wir ___ heute leider nicht kommen, weil wir arbeiten müssen.',
    options: ['können', 'kann', 'könnt', 'muss'],
    correctIndex: 0,
    explanation: 'With "Wir", the modal verb conjugates to "können" (and the infinitive "kommen" goes to the end).'
  },
  {
    id: 'g4',
    skill: 'Grammar',
    microTopic: 'Prepositions of Time (am, im, um)',
    whyItMatters: 'Dates, days, months, and times appear on every Goethe/ÖSD form and email.',
    actionDrill: 'Memorize the rule: "um" + clock time, "am" + days/dates, "im" + months/seasons—then drill 15 mixed examples.',
    question: 'Mein Deutschkurs findet immer ___ Montag und Mittwoch ___ 18:00 Uhr statt.',
    options: ['am / um', 'im / am', 'um / am', 'am / im'],
    correctIndex: 0,
    explanation: 'Days of the week take "am" (am Montag) and exact clock times take "um" (um 18:00 Uhr).'
  },
  {
    id: 'g5',
    skill: 'Grammar',
    microTopic: 'Imperative (Polite Requests)',
    whyItMatters: 'Exam instructions and polite requests rely on the "Sie" imperative form.',
    actionDrill: 'Convert 10 polite statements into "Sie" imperatives (e.g., "Sprechen Sie bitte langsam!", "Warten Sie kurz!").',
    question: 'Ich verstehe das nicht. Bitte ___ Sie etwas langsamer!',
    options: ['sprechen', 'sprich', 'sprecht', 'spricht'],
    correctIndex: 0,
    explanation: 'The polite imperative uses the infinitive + "Sie": "Sprechen Sie bitte langsamer!"'
  },

  // ================= READING / LESEN (5 Questions) =================
  {
    id: 'r1',
    skill: 'Reading',
    microTopic: 'Public Signs & Clinic Notices (Lesen Teil 3)',
    whyItMatters: 'Goethe Lesen Teil 3 tests whether you catch exceptions like "nur telefonisch" or closed days.',
    actionDrill: 'Practice 5 Goethe Lesen Teil 3 notice-board passages—always underline days, times, and exception words (nur, außer, geschlossen).',
    passage: 'Praxis Dr. Weber: Montag bis Donnerstag 8:00–16:00 Uhr geöffnet. Freitag geschlossen. Termine bitte nur telefonisch unter 030-44512 vereinbaren.',
    question: 'Kann man am Freitagnachmittag ohne Termin in die Praxis kommen?',
    options: [
      'Nein, am Freitag ist die Praxis geschlossen.',
      'Ja, bis 16:00 Uhr.',
      'Ja, aber nur mit telefonischem Termin.',
      'Nur am Vormittag.'
    ],
    correctIndex: 0,
    explanation: 'The notice explicitly says "Freitag geschlossen" (closed on Friday).'
  },
  {
    id: 'r2',
    skill: 'Reading',
    microTopic: 'Short Emails & Messages (Lesen Teil 1)',
    whyItMatters: 'Lesen Teil 1 tests main intent and time/location changes in everyday emails.',
    actionDrill: 'Read 5 short A1 emails/SMS messages and summarize in 1 line: Who is writing, what changed, and what is needed?',
    passage: 'Hallo Lukas, ich bin noch im Büro und komme heute 30 Minuten später. Wir treffen uns nicht um 18:00 Uhr am Bahnhof, sondern um 18:30 Uhr direkt vor dem Kino. Liebe Grüße, Sara',
    question: 'Wo treffen sich Sara und Lukas heute?',
    options: [
      'Vor dem Kino um 18:30 Uhr.',
      'Am Bahnhof um 18:30 Uhr.',
      'Im Büro um 18:00 Uhr.',
      'Vor dem Kino um 18:00 Uhr.'
    ],
    correctIndex: 0,
    explanation: 'Sara changes both the time (18:30) and place ("direkt vor dem Kino").'
  },
  {
    id: 'r3',
    skill: 'Reading',
    microTopic: 'Classified Ads & Housing (Lesen Teil 2)',
    whyItMatters: 'Lesen Teil 2 asks you to pick the right website/ad based on constraints like pets, rent, or location.',
    actionDrill: 'Practice 5 Goethe Lesen Teil 2 comparison tasks—eliminate options that violate even one constraint (e.g., "keine Haustiere").',
    passage: '2-Zimmer-Wohnung im Zentrum, 3. Stock (ohne Aufzug), 650 € warm. Ruhige Lage, Balkon. Leider keine Haustiere erlaubt. Frei ab 1. Mai.',
    question: 'Für wen passt diese Wohnung?',
    options: [
      'Für jemanden ohne Hund oder Katze, der im Zentrum wohnen möchte.',
      'Für eine Person mit einem kleinen Hund.',
      'Für jemanden, der einen Aufzug braucht.',
      'Für jemanden, der sofort im April einziehen möchte.'
    ],
    correctIndex: 0,
    explanation: '"Keine Haustiere erlaubt" rules out pets, "ohne Aufzug" rules out elevator needs, and "ab 1. Mai" rules out April.'
  },
  {
    id: 'r4',
    skill: 'Reading',
    microTopic: 'Transport & Ticket Rules (Lesen Teil 3)',
    whyItMatters: 'Transport rules test conditional words like "nur gültig" (only valid) and "außer" (except).',
    actionDrill: 'Review 10 transport & event signs focusing on validity rules (gültig ab/bis, Kinder frei, nur mit Ausweis).',
    passage: 'Stadtbus-Ticket: Gültig Montag bis Freitag ab 9:00 Uhr und am Wochenende den ganzen Tag. Kinder unter 6 Jahren fahren kostenlos.',
    question: 'Darf man mit diesem Ticket am Dienstag um 8:15 Uhr Bus fahren?',
    options: [
      'Nein, unter der Woche gilt das Ticket erst ab 9:00 Uhr.',
      'Ja, es gilt den ganzen Tag.',
      'Ja, aber nur mit Kindern.',
      'Nur am Wochenende.'
    ],
    correctIndex: 0,
    explanation: 'Monday to Friday, the ticket is only valid starting at 9:00 AM ("ab 9:00 Uhr").'
  },
  {
    id: 'r5',
    skill: 'Reading',
    microTopic: 'Workplace & Course Announcements (Lesen Teil 1)',
    whyItMatters: 'Understanding registration deadlines and payment rules prevents real-world admin mistakes.',
    actionDrill: 'Practice 5 course/event announcements identifying deadlines ("bis zum...") and payment methods ("bar" vs. "Karte").',
    passage: 'Sprachschule Globio: Der neue A1-Abendkurs startet am 15. Oktober. Anmeldung bis spätestens 10. Oktober im Sekretariat. Bitte bringen Sie Ihren Ausweis mit.',
    question: 'Bis wann muss man sich für den Kurs anmelden?',
    options: [
      'Bis zum 10. Oktober.',
      'Am 15. Oktober.',
      'Nach dem Kursstart.',
      'Nur telefonisch.'
    ],
    correctIndex: 0,
    explanation: '"Anmeldung bis spätestens 10. Oktober" states the registration deadline is October 10.'
  }
];