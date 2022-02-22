# Firestore Export Prod nach Dev

Anleitung: https://firebase.google.com/docs/firestore/manage-data/move-data

**Vorgehen**

- Export von Prod Firestore in Prod Cloud Bucket
- Import von Dev Cloud Bucket in Dev Firestore

**Mögliche Fehlerquellen**

- Dev Service account hat keine Leserechte im Prod Cloud Bucket
  - Sollte eigentlich nicht auftreten, weil die Berechtigung nur einmal gesetzt werden muss

```sh
# Setzen der Berechtigung
gsutil iam ch serviceAccount:coding-bootcamps-eu-dev@appspot.gserviceaccount.com:admin \
gs://coding-bootcamps-eu-backup
```

**Project IDs und Buckets**

- Project IDs
  - Prod: coding-bootcamps-eu
  - Dev: coding-bootcamps-eu-dev
- Buckets
  - Prod: coding-bootcamps-eu-backup
  - Dev: coding-bootcamps-eu-dev-backup

## Example Code

```sh
# gcloud auf prod setzen
gcloud config set project coding-bootcamps-eu

# Export vom Firestore anstoßen
gcloud firestore export gs://coding-bootcamps-eu-backup

# Im Output den outputUriPrefix kopieren
# outputUriPrefix ist die Clouc Bucket Adresse mit Ordner der Timestamp enthält

# gcloud auf dev project wechseln
gcloud config set project coding-bootcamps-eu-dev

# Import vom Firestore auf Dev anstoßen
# outputUriPrefix entsprechend setzen, z.B. gs://coding-bootcamps-eu-backup/2022-02-18T09:11:46_25860
gcloud firestore import <outputUriPrefix>
```

## Download Firestore Export für lokalen Emulator

- Zuerst muss ein Firestore Backup erstellt werden --> Siehe oben
- Anschließend muss das Backup herunter geladen werden
- Das heruntergeladene Backup heißt wie der Timestamp
  - Umbenennen in `firestore-backup`

```sh
# Der Timestamp ist im outputUriPrefix enthalten
  .
 gsutil -m cp -r \
  "gs://coding-bootcamps-eu-backup/<timestamp>" \
  .

# Umbenennen
mv <timestamp-folder> firestore-export
```

- Danach kann der Emulator gestartet werden

```sh
firebase emulators:start --export-on-exit --import ./firestore-export
```
