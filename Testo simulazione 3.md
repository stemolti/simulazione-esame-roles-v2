

Gestione di un torneo di ping-pong tra i dipendenti di un’azienda
Obiettivo della prova

La prova è finalizzata a valutare la capacità dell’esaminando di progettare e sviluppare un’applicazione web full stack con autenticazione, gestione di dati relazionali, interazione tra frontend e backend tramite API REST.


L’applicazione dev’essere inizializzata con un set di dati realistici, sufficienti per testare tutti i casi d’uso previsti

Il codice deve essere strutturato e documentato


Architettura dell'applicazione


Descrizione del caso d’uso

Allo scopo di fare team building, un’azienda organizza un torneo aziendale di ping-pong aperto a tutti i dipendenti. I partecipanti si sfidano in una serie di incontri uno contro uno, in date stabilite. Uno o più organizzatori si occupano di registrare i risultati degli incontri tramite l’applicazione, che tiene automaticamente traccia del punteggio e aggiorna la classifica in tempo reale.

L’applicazione deve permettere:


di visualizzare l’elenco dei partecipanti e degli incontri previsti o già disputati;


di inserire e modificare i risultati delle partite (solo per gli utenti con ruolo di organizzatore);

di consultare la classifica aggiornata, calcolata in base alle vittorie ottenute da ciascun partecipante.


L’obiettivo è semplificare la gestione del torneo e promuovere un momento di aggregazione e svago all’interno dell’ambiente lavorativo.

Nota: anche gli organizzatori possono partecipare al torneo!

Un utente può essere partecipante, organizzatore, entrambi o nessuno dei due. 

Solo gli utenti partecipanti e/o organizzatori possono accedere alle funzionalità interne dell’applicazione.


Requisiti della UI
•
L’interfaccia deve essere chiara, responsive e coerente nello stile
•
Le pagine devono essere accessibili da un menu
•
L’interfaccia deve permettere agli utenti di interagire con il sistema in base al loro ruolo
•
Tutte le pagine devono essere facilmente navigabili
Pagine da sviluppare
-
Login / Registrazione
-
Dashboard per gli utenti:
o
Possibilità di iscriversi al torneo di ping-pong tramite un pulsante “Iscriviti”
o
Possibilità di diventare organizzatori del torneo tramite un pulsante “Sono un organizzatore”
-
Pagine riservate per gli utenti che sono iscritti al torneo:
o
Visualizzazione dell’elenco completo dei partecipanti
o
Visualizzazione dell’elenco degli incontri, ordinati per data, con l’indicazione, per ciascun incontro, della data, dei giocatori, dello stato (ancora da giocare oppure già disputato) e, se già disputato, del punteggio ottenuto da ciascuno dei due giocatori
-
Pagine riservate per gli utenti che sono organizzatori:
o
Gestione degli incontri: inserimento, modifica ed eliminazione degli incontri, registrazione dei risultati di ciascun incontro.


Regole di sicurezza


Solo gli utenti iscritti al torneo possono visualizzare l’elenco dei partecipanti e la lista degli incontri

Solo gli organizzatori possono inserire/modificare gli incontri ed inserire i punteggi.

Requisito avanzato 

Implementare una pagina che consente di visualizzare la classifica aggiornata dei partecipanti con l’indicazione del numero di partite giocate, del numero di partite vinte e della percentuale di vittorie. La posizione in classifica è data dalla percentuale di vittorie, con il vincolo di almeno 5 partite giocate. La pagina deve visualizzare i partecipanti ordinati in base alla posizione in classifica.
I partecipanti che non hanno ancora giocato almeno 5 partite devono essere visualizzati in fondo all’elenco. La pagina deve essere visualizzabile da tutti i partecipanti.


Chiamate API da sviluppare
Alcune API prevedono l'autenticazione, altre sono aperte.
Per ogni metodo, prevedere lato server la validazione dei dati ricevuti.
Le regole di sicurezza possono essere descritte nella sezione dedicata oppure all'interno della descrizione delle singole API.
API di registrazione e autenticazione
•
POST /api/utenti/register Registrazione di un nuovo utente
•
POST /api/utenti/login Autenticazione di un utente
API con autenticazione
•
POST /api/torneo/iscriviti iscrive l’utente corrente al torneo
•
POST /api/torneo/sono-un-organizzatore imposta l’utente corrente come organizzatore
•
GET /api/partecipanti restituisce la lista completa dei partecipanti al torneo
•
GET /api/incontri restituisce la lista degli incontri
•
POST /api/incontri Creazione di un incontro (solo organizzatori)
•
PUT /api/incontri/{id} Modifica di un incontro (solo organizzatori)
•
DELETE /api/incontri/{id} Eliminazione di un incontro (solo organizzatori)


API senza autenticazione:
Nessuna  


Regole di validazione


Un incontro non può avere lo stesso partecipante come giocatore A e giocatore B.
I punti devono essere numeri non negativi.

I punti devono essere coerenti con le regole del ping-pong e del torneo: il giocatore che raggiunge per primo 11 punti vince il set; tuttavia, se il punteggio raggiunge 10-10, il set viene vinto dal primo giocatore che riesce a ottenere due punti di vantaggio. Ai fini di questo torneo, una partita è formata da un solo set.
Nota: come conseguenza di questa regola, una partita non può concludersi con un pareggio.
Modello dei dati
Le informazioni che si vogliono mantenere sono le seguenti:
•
Utente
o
UtenteID (PK)
o
Nome
o
Cognome
o
Email
o
Password
o
IscrittoAlTorneo (true/false)
o
OrganizzatoreDelTorneo (true/false)
•
Incontro
o
IncontroID (PK)
o
Data (date)
o
PartecipanteAID (FK)
o
PartecipanteBID (FK)
o
Giocato (true/false)
o
PuntiA
o
PuntiB
Il data model proposto è indicativo. Il candidato può integrarlo secondo necessità.
Deployment
L’applicazione va pubblicata su un server a propria scelta. L’URL di accesso deve contenere nome e cognome dell’allievo.
Esempio: https://app-nome-cognome.nomehost.dominio