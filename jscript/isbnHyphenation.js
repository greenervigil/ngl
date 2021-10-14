function hyphenate(isbn) {

    var prefix;

    if (isbn.length == 13)	// for 13-digit ISBNs
    {
        prefix = isbn.substring(0, 3) + "-";
        isbn = isbn.substring(3, 13);
    }
    else { prefix = ''; }

    var d = eval(isbn.substring(0, 1)); // one digit
    var d2 = eval(isbn.substring(1, 3)); // two digits
    var d4 = eval(isbn.substring(1, 5)); // four digits
    var objRegExp = "";

    switch (d) {
        case 0:
        case 3:
        case 4:
            /*
            0 = English-speaking areas
            3 = German-speaking areas
            4 = Japan
            */
            switch (true) {
                case (d2 < 20):
                    objRegExp = /(\d)(\d{2})(\d{6})(\w)/;
                    break;
                case (d2 < 70):
                    objRegExp = /(\d)(\d{3})(\d{5})(\w)/;
                    break;
                case (d2 < 85):
                    objRegExp = /(\d)(\d{4})(\d{4})(\w)/;
                    break;
                case (d2 < 90):
                    objRegExp = /(\d)(\d{5})(\d{3})(\w)/;
                    break;
                case (d2 < 95):
                    objRegExp = /(\d)(\d{6})(\d{2})(\w)/;
                    break;
                case (d2 <= 99):
                    objRegExp = /(\d)(\d{7})(\d)(\w)/;
                    break;
                default:
                    break;
            }
            break;

        case 1:
            /*
            1 = English-speaking areas
            */
            switch (true) {
                case (d4 < 1000):
                    objRegExp = /(\d)(\d{2})(\d{6})(\w)/;
                    break;
                case (d4 < 4000):
                    objRegExp = /(\d)(\d{3})(\d{5})(\w)/;
                    break;
                case (d4 < 5500):
                    objRegExp = /(\d)(\d{4})(\d{4})(\w)/;
                    break;
                case (d4 < 8698):
                    objRegExp = /(\d)(\d{5})(\d{3})(\w)/;
                    break;
                case (d4 < 9990):
                    objRegExp = /(\d)(\d{6})(\d{2})(\w)/;
                    break;
                case (d4 <= 9999):
                    objRegExp = /(\d)(\d{7})(\d)(\w)/;
                    break;
                default:
                    break;
            }
            break;

        case 2:
            /*
            2 = French-speaking areas
            */
            switch (true) {
                case (d2 < 20):
                    objRegExp = /(\d)(\d{2})(\d{6})(\w)/;
                    break;
                case (d2 < 70):
                    objRegExp = /(\d)(\d{3})(\d{5})(\w)/;
                    break;
                case (d2 < 84):
                    objRegExp = /(\d)(\d{4})(\d{4})(\w)/;
                    break;
                case (d2 < 90):
                    objRegExp = /(\d)(\d{5})(\d{3})(\w)/;
                    break;
                case (d2 < 95):
                    objRegExp = /(\d)(\d{6})(\d{2})(\w)/;
                    break;
                case (d2 <= 99):
                    objRegExp = /(\d)(\d{7})(\d)(\w)/;
                    break;
                default:
                    break;
            }
            break;

        case 9:
            /*
            90 = Dutch/Flemish-speaking
            */
            if (isbn.substring(1, 2) == 0) {
                d2 = isbn.substring(2, 4);
                switch (true) {
                    case (d2 < 20):
                        objRegExp = /(\d{2})(\d{2})(\d{5})(\w)/;
                        break;
                    case (d2 < 50):
                        objRegExp = /(\d{2})(\d{3})(\d{4})(\w)/;
                        break;
                    case (d2 < 70):
                        objRegExp = /(\d{2})(\d{4})(\d{3})(\w)/;
                        break;
                    case (d2 < 80):
                        objRegExp = /(\d{2})(\d{5})(\d{2})(\w)/;
                        break;
                    case (d2 <= 81):
                        objRegExp = /(\d{2})(\d{6})(\d)(\w)/;
                        break;
                    default:
                        break;
                }
            }

            /*
            965 = Israel
            */
            if (isbn.substring(1, 3) == 65) {
                d2 = isbn.substring(3, 5);
                switch (true) {
                    case (d2 < 20):
                        objRegExp = /(\d{3})(\d{2})(\d{4})(\w)/;
                        break;
                    case (d2 < 70):
                        objRegExp = /(\d{3})(\d{3})(\d{3})(\w)/;
                        break;
                    case (d2 < 90):
                        objRegExp = /(\d{3})(\d{4})(\d{2})(\w)/;
                        break;
                    case (d2 <= 95):
                        objRegExp = /(\d{3})(\d{5})(\d)(\w)/;
                        break;
                    default:
                        break;
                }
            }

            /*
            981 = Singapore
            */
            if (isbn.substring(1, 3) == 81) {
                d2 = isbn.substring(3, 5);
                switch (true) {
                    case (d2 < 20):
                        objRegExp = /(\d{3})(\d{2})(\d{4})(\w)/;
                        break;
                    case (d2 < 30):
                        objRegExp = /(\d{3})(\d{3})(\d{3})(\w)/;
                        break;
                    case (d2 <= 40):
                        objRegExp = /(\d{3})(\d{4})(\d{2})(\w)/;
                        break;
                    default:
                        break;
                }
            }
            else { break; }

            break;

        default:
            break;
    }

    if (objRegExp != "") {
        isbn = prefix + isbn.replace(objRegExp, "$1-$2-$3-$4");
    }
    else {
        if (bAlert == true) { alert("Unable to hyphenate this ISBN!"); }
        isbn = (prefix + isbn).replace(/[-]/g, "");
    }
    return isbn;
} //hyphenate(isbn)