class City 
    {
    constructor(playerName, costOfTheField, field, tribute) {
        this.playerName = playerName;
        this.costOfTheField = costOfTheField;
        this.tribute = tribute; // haracz za staniecie na polu
        this.ownerOfField = 0;
        this.field = field;
        this.houses = 0 ;

    }
}
const Cities = [
    start                   = new City("Start", 0, 0, 0),
    elwynForest             = new City("Elwynn Forest", 25, 1, 25),
    westfall                = new City("Westfall", 50, 2, 30),
    hilsbradFoothils        = new City("Hilsbrad Foothils", 75, 3, 40),
    stormwind               = new City("Stormwind", 200, 4, 100),
    northernStranglethorn   = new City("Northern Stranglethorn", 150, 5, 50),
    theHinterlands          = new City("The Hinterlands", 175, 6, 90),
    burningSteppes          = new City("Burning Steppes", 200, 7, 100),
    jail                    = new City("Wiezienie", 0, 8, 0),
    durotar                 = new City("Durotar", 250, 9, 125),
    theBarrens              = new City("The Barrens", 300, 10, 175),
    thousandNeedles         = new City("Thousand Needles", 350, 11, 200),
    cardOfHorde             = new City("CardOfHorde", 0, 12, 0),
    tanaris                 = new City("Tanaris", 400, 13, 250),
    Orgrimmar               = new City("Orgrimmar", 200, 14, 100),
    unGoro                  = new City("unGoro", 500, 15, 300),
    event                   = new City("Event", 0, 16, 0),
    helfirePeninsula        = new City("Helfire Peninsula", 650, 17, 400),
    zangramash              = new City("Zangramash", 700, 18, 425),
    shattrahCity            = new City("Shattrah City", 200, 19, 100),
    cardOfAlliance          = new City("CardOfAlliance", 0, 20, 0),
    nagrand                 = new City("Nagrand", 750, 21, 450),
    netherstorm             = new City("Netherstorm", 800, 22, 500),
    shadowmoonValley        = new City("Shadowmoon Valley", 850, 23, 525),
    teleport                = new City("Teleport", 0, 24, 0),
    dalaran                 = new City("Dalaran", 200, 25, 100),
    boreanTundra            = new City("Borean Tundra", 950, 26, 600),
    grizzlyHills            = new City("Grizzly Hills", 1000, 27, 650),
    cardOfDemons            = new City("CardOfDemons", 0, 28, 0),
    zulDrak                 = new City("Zul Drak", 1050, 29, 700),
    stormPeaks              = new City("Storm Peaks", 1100, 30, 750),
    icecrown                = new City("Icecrown", 1200, 31, 800),
]