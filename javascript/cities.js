class City 
    {
    constructor(fieldName, costOfTheField, field, tribute,costOfOneHouse,specialField) {
        this.fieldName = fieldName;
        this.costOfTheField = costOfTheField;
        this.tribute = tribute; // haracz za staniecie na polu
        this.ownerOfField = undefined;
        this.field = field;
        this.houses = -1 ;
        this.costOfOneHouse = costOfOneHouse;
        this.specialField = specialField;
    }
}
const Cities = [
    start                   = new City("Start", 0, 0, 0, undefined,true),
    elwynForest             = new City("Elwynn Forest", 25, 1, 25, 25,false),
    westfall                = new City("Westfall", 50, 2, 30, 25,false),
    hilsbradFoothils        = new City("Hilsbrad Foothils", 75, 3, 40, 25,false),
    stormwind               = new City("Stormwind", 200, 4, 100, undefined,),
    northernStranglethorn   = new City("Northern Stranglethorn", 150, 5, 50, 60,false),
    theHinterlands          = new City("The Hinterlands", 175, 6, 90 , 60,false),
    burningSteppes          = new City("Burning Steppes", 200, 7, 100, 60,false),
    jail                    = new City("Wiezienie", 0, 8, 0, undefined,true),
    durotar                 = new City("Durotar", 250, 9, 125, 100,false),
    theBarrens              = new City("The Barrens", 300, 10, 175, 100,false),
    thousandNeedles         = new City("Thousand Needles", 350, 11, 200, 100,false),
    cardOfHorde             = new City("CardOfHorde", 0, 12, 0, undefined,true),
    tanaris                 = new City("Tanaris", 400, 13, 250, 200,false),
    Orgrimmar               = new City("Orgrimmar", 200, 14, 100, undefined),
    unGoro                  = new City("unGoro", 500, 15, 300, 300,false),
    event                   = new City("Event", 0, 16, 0, undefined,true),
    helfirePeninsula        = new City("Helfire Peninsula", 650, 17, 400, 400,false),
    zangramash              = new City("Zangramash", 700, 18, 425, 400,false),
    shattrahCity            = new City("Shattrah City", 200, 19, 100, undefined),
    cardOfAlliance          = new City("CardOfAlliance", 0, 20, 0, undefined,true),
    nagrand                 = new City("Nagrand", 750, 21, 450, 400,false),
    netherstorm             = new City("Netherstorm", 800, 22, 500, 450,false),
    shadowmoonValley        = new City("Shadowmoon Valley", 850, 23, 525, 450,false),
    teleport                = new City("Teleport", 0, 24, 0, undefined,true),
    dalaran                 = new City("Dalaran", 200, 25, 100, undefined),
    boreanTundra            = new City("Borean Tundra", 950, 26, 600, 700,false),
    grizzlyHills            = new City("Grizzly Hills", 1000, 27, 650, 700,false),
    cardOfDemons            = new City("CardOfDemons", 0, 28, 0, undefined,true),
    zulDrak                 = new City("Zul Drak", 1050, 29, 700, 700,false),
    stormPeaks              = new City("Storm Peaks", 1100, 30, 750 , 800,false),
    icecrown                = new City("Icecrown", 1200, 31, 800, 800,false),
]