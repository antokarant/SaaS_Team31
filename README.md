# SaaS Team 31 
NTUA SaaS project 2021
Εφαρμογή Ερωτοαπαντήσεων

##### Καραντώνης Αντώνιος el17439

##### Κυριακίδης Δημήτριος el17077


Αρχιτεκτονικές που επιλέχθηκαν:
 - MVC (monolith) σε αυτό το branch (main)
 - SOA στο αντίστοιχο branch soa

Το branch mvc χρησιμοποιήθηκε για την τοπική ανάπτυξη της εργασίας και έχει γίνει merge στο main.

Σχετικά με τους επισκέπτες – χρήστες της εφαρμογής που δεν είναι εγγεγραμμένοι και συνδεδεμένοι, αποφασίστηκε να έχουν τις εξής δυνατότητες:
- 1 Προβολή λίστας όλων των ερωτήσεων
- 2 Προβολή μεμονωμένης σελίδας ερώτησης 
- Καμία δυνατότητα δημοσίευσης

Σχετικά με την τεκμηρίωση, όλα τα διαγράμματα UML και των δύο υλοποιήσεων βρίσκονται στον φάκελο [documentation](https://github.com/antokarant/SaaS_Team31/tree/main/documentation) του παρόντος branch, τόσο σε ενιαίο vpp αρχείο όσο και σε μορφή εικόνων.

Για την εφαρμογή MVC:
 - Το back-end υλοποιήθηκε με το framework `NestJS` και το `TypeORM` για την σύνδεση με την βάση δεδομένων, και το deployment έχει γίνει στο Heroku [εδώ](https://saas-team31-mvc-backend.herokuapp.com/). Μαζί με τον back-end server, στην διεύθυνση αυτήν τρέχει και η σχεσιακή βάση δεδομένων της εφαρμογής.
 - Το front-end με το framework `React`, το deployment έχει γίνει στο Heroku [εδώ](https://saas-team31-mvc-frontend.herokuapp.com/). Ο σχεδιασμός του user interface βασίστηκε στα wireframes της εκφώνησης, με όσες διαφοροποιήσεις κρίθηκαν αναγκαίες για την λειτουργία της εφαρμογής.

Για την εφαρμογή SOA:
 - Το back-end υλοποιήθηκε με το framework `NestJS`, ενώ για το service bus χρησιμοποιήθηκε `Express`. Το back-end έχει διαχωρισθεί στα εξής τρία τμήματα:
   -  log-in server, με τον αντίστοιχο [σύνδεσμο deployment](https://saas-team31-soa-login.herokuapp.com/) στο Heroku
   -  question management server, και ο αντίστοιχος [σύνδεσμος deployment](https://saas-team31-soa-questions.herokuapp.com/)
   -  question analytics server, και ο αντίστοιχος [σύνδεσμος deployment](https://saas-team31-soa-analytics.herokuapp.com/)
   -  ενώ το service bus έχει γίνει deploy [εδώ](https://saas-team31-soa-esb.herokuapp.com/)
 - Το front-end με το framework `React`, το deployment έχει γίνει στο Heroku [εδώ](https://saas-team31-soa-frontend.herokuapp.com/).

(Τόσο το back-end όσο και το front-end που τρέχουν στο heroku αν έχουν καιρό να χρησιμοποιηθούν μπορεί να καθυστερήσουν λίγο τη πρώτη φορά μέχρι να ανακτήσουν τη σωστή λειτουργία τους)

Στο πλαίσιο της εργασίας χρησιμοποιήθηκε το εργαλείο Upsource για την διαδικασία code review, έως ότου η υπηρεσία αυτή έπαψε να λειτουργεί στο YouTrack, με μήνυμα "Authentication Failed".

Κατά την υλοποίηση της MVC αρχιτεκτονικής αξιοποιήθηκαν τα εργαλεία του `NestJS` για την κατασκευή database migrations, που διευκόλυναν τις ανάγκες για αλλαγή schema στην διάρκεια της ανάπτυξης, καθώς και ορισμένα unit tests για την εξασφάλιση των βασικών λειτουργιών της εφαρμογής.

Στο YouTrack αποτυπώνεται η σταδιακή εξέλιξη του project μέσω των τεσσάρων διαφορετικών sprints και των αντίστοιχων tickets που διεκπεραιώθηκαν στην πορεία καθενός εξ αυτών.
