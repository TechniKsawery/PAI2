# PAI2 - Moduł Zasobów

## Opis
Ten moduł zawiera implementację API do zarządzania zasobami (items) w projekcie PAI2. Zaimplementowano wszystkie wymagane endpointy zgodnie z dokumentacją.

## Wymagania
- Node.js
- MongoDB
- Postman (do testowania API)

## Instalacja
1. Sklonuj repozytorium
2. Zainstaluj zależności:
```bash
npm install
```
3. Skopiuj plik `.env.example` do `.env` i uzupełnij zmienne środowiskowe
4. Uruchom aplikację:
```bash
npm run dev
```

## API Endpoints

### Moduł Zasobów (Items)
1. `POST /api/items` - Utworzenie nowego przedmiotu
2. `GET /api/items` - Pobranie wszystkich przedmiotów
3. `GET /api/items/:id` - Pobranie pojedynczego przedmiotu
4. `PUT /api/items/:id` - Aktualizacja przedmiotu
5. `DELETE /api/items/:id` - Usunięcie przedmiotu

## Testowanie API
1. Pobierz i zainstaluj [Postman](https://www.postman.com/downloads/)
2. Zaimportuj kolekcję z pliku `postman/PAI2_Items_Collection.json`
3. Ustaw zmienną środowiskową `baseUrl` w Postman na `http://localhost:5001`
4. Uruchom aplikację
5. Możesz teraz testować wszystkie endpointy

## Dokumentacja API
Dokumentacja Swagger jest dostępna pod adresem: `http://localhost:5001/api-docs`

## Struktura projektu
```
src/
  ├── config/         # Konfiguracja aplikacji
  ├── controllers/    # Kontrolery
  ├── models/        # Modele danych
  ├── routes/        # Routing
  ├── validators/    # Walidatory
  └── app.ts         # Główny plik aplikacji
```

## Autor
[Twoje imię i nazwisko]
