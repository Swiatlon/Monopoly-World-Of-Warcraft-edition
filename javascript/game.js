let playerQueue = 0;
class Game {

  sequenceOfMove() {
    listPlayers[playerQueue].move();

    playerQueue++;
  }

  EconomicSytem(thisPlayer) {

    console.log('[this]', Cities[thisPlayer.field].ownerOfField);

    if (Cities[thisPlayer.field].ownerOfField == 0 && arrayOfDisabledBuyedFields.includes(thisPlayer.field) === false) { // jesli pole nie jest przejete przez nikogo 
      map.showChooseOption();

    } else if (Cities[thisPlayer.field].ownerOfField.nameOfPlayer == thisPlayer.nameOfPlayer) { // pole ktore juz jest gracza
      console.log('[to pole jest twoje]'); // tutaj musi byc funkcja na budowanie domkow pojawia sie div ile domkow chce zbudowac

      btn.disabled = false;
    } else if (Cities[thisPlayer.field].ownerOfField !== thisPlayer.nameOfPlayer && Cities[thisPlayer.field].ownerOfField !== 0) { // pole jest kogos innego
      console.log('[to pole jest kogos innego]') // tutaj musi byc funkcja ktora bedzie oddawala komus pieniadze za jego domek
      // 
      //Przelwam pieniadze(Cities[thisPlayer.pole].tribute) z thisPlayer(odejmuje od jego pieniedzy haracz)  do  Cities[thisPlayer.pole].player.money
      console.log('[Wykonuuje ruch]', thisPlayer);
      console.log('[Kogo to jest pole]', Cities[thisPlayer.field].ownerOfField);
      console.log('[HAJS PLACACEGO PRZED ZAPLATA]', thisPlayer.money + " GRACZ PLACACY " + thisPlayer.nameOfPlayer);
      thisPlayer.money -= Cities[thisPlayer.field].tribute;
      console.log('[PRZED ZAPLATA]', Cities[thisPlayer.field].ownerOfField.money + " HAJS GRACZA" + Cities[thisPlayer.field].ownerOfField.nameOfPlayer);
      Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute;
      console.log('[PO ZAPLACIE]', Cities[thisPlayer.field].ownerOfField.money + "HAJS GRACZA" + Cities[thisPlayer.field].ownerOfField.nameOfPlayer);
      console.log('[HAJS PLACACEGO PO ZAPLACIE]', thisPlayer.money + " GRACZ PLACACY " + thisPlayer.nameOfPlayer);
      btn.disabled = false;
    } else {
      console.log('[jestem w elsie]', );
      btn.disabled = false;

    }
  }
}

const game = new Game();

// RUCH GRACZA +++ (EW PROMISES)
// KOLEJNOSC GRACZY +-+
// WIEZIENIE I KARTY I EVENT ---
// DUBLET ---
// PLACENIE GRACZOM +++
// POSTAWIANIE DOMKOW ---
// MNOZNIKI PIENIAZKOW W ZALEZNOSCI OD ILOSCI DOMKOW ---
// KICKOWANIE GRACZA JESLI NIE MA PIENIEDZY ---
// INTERFEJS GRACZY I KTO ILE MA PIENIEDZY ---
// UJEMNY BILANS PIENIEDZY ---
// LADNY WYGLAD +-+ (NEED TO ZAPROJEKTOWAC TO BETTER)
// NAZEWNICTWO(POPRAWNE) ZMIENNYCH/FUNKCJI +++
// POPRAWNOSC KODU +-+
// POPRAWIENIE PLANSZY  +-+