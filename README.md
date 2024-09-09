# Shopping List Client

This project is a client-side application for managing shopping lists. It allows users to create, share, and manage their shopping lists with ease.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Skripte](#skripte)
- [Hauptkomponenten](#hauptkomponenten)
- [Abhängigkeiten](#abhängigkeiten)
- [Beitragende](#beitragende)
- [Lizenz](#lizenz)

## Installation

Anweisungen zur Installation des Projekts.

### Klonen Sie das Repository

git clone https://github.com/benutzername/shopping-list-client.git

### Wechseln Sie in das Projektverzeichnis

cd shopping-list-client

### Installieren Sie die Abhängigkeiten

npm install

## Verwendung

# Starten Sie das Projekt

npm start

## Skripte

Liste der verfügbaren npm-Skripte und deren Beschreibung.
{
"scripts": {
"start": "Startet die Entwicklungsumgebung",
"build": "Erstellt eine Produktionsversion der Anwendung",
"test": "Führt die Tests aus"
}
}

## Hauptkomponenten

Navbar.tsx
Die Navbar-Komponente bietet eine Navigationsleiste mit Links zu verschiedenen Seiten und einem Dropdown-Menü für Benutzeraktionen wie Login, Signup und Logout.

SignupPage.tsx
Die SignupPage-Komponente ermöglicht es neuen Benutzern, sich zu registrieren. Sie enthält ein Formular zur Eingabe von Name, E-Mail und Passwort.

LoginPage.tsx
Die LoginPage-Komponente ermöglicht es bestehenden Benutzern, sich anzumelden. Sie enthält ein Formular zur Eingabe von E-Mail und Passwort.

AuthContext.tsx
Der AuthContext verwaltet den Authentifizierungsstatus des Benutzers und bietet Funktionen zum Speichern von Tokens, Authentifizieren von Benutzern und Abmelden.

ProfilePage.tsx
Die ProfilePage-Komponente zeigt die Profildaten des angemeldeten Benutzers an, einschließlich Name, E-Mail und Erstellungsdatum.

ShoppingListPage.tsx
Die ShoppingListPage-Komponente ermöglicht es Benutzern, ihre Einkaufsliste anzuzeigen, Artikel hinzuzufügen, zu löschen und die Liste mit anderen Benutzern zu teilen.

HomePage.tsx
Die HomePage-Komponente zeigt die persönlichen und geteilten Einkaufslisten des Benutzers an und ermöglicht das Erstellen neuer Listen.

ThemeSwitcher.tsx
Die ThemeSwitcher-Komponente ermöglicht es Benutzern, zwischen verschiedenen Themen zu wechseln.

Abhängigkeiten

## Abhängigkeiten

Liste der Hauptabhängigkeiten des Projekts.

{
"dependencies": {
"axios": "^0.21.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^5.2.0",
"tailwindcss": "^2.2.19",
"daisyui": "^1.14.0"
}
}
