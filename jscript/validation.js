// JScript File
function alertRequired(id, caption)
{
  alert('"' + caption + '" is a required field.');
  document.getElementById(id).focus();
}

function ValRequired(idArray, captionArray)
{
  for(var i=0; i<idArray.length;i++)
  {
    var id=idArray[i];
    var alertCaption=captionArray[i];
    if(alertCaption=='')
    {
      alertCaption='Required Field.';
    }
    
    if(document.getElementById(id).value=='')
    {
      alertRequired(id, alertCaption);
      return false;
    }
  }
  return true;
}

function alertInvalid(id, caption)
{
  alert('"' + caption + '" appears to be in the wrong format.');
  document.getElementById(id).focus();
}

function validateZip(fld)
{
  var re=/^\d{5}$|^\d{5}-\d{4}$/;
  return re.test(fld);
}

function validateEmail(fld)
{
  var re=/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
  return re.test(fld);
}

function validatePhone(fld)
{
  var re=/^(\(?\d\d\d\)?)?( |-|\.)?\d\d\d( |-|\.)?\d{4,4}(( |-|\.)?[ext\.]+ ?\d+)?$/;
  return re.test(fld);
}

function validateNumber(fld)
{
  var re=/^[+]?\d*$/;
  return re.test(fld);
}

function validateMoney(fld)
{
  var re=/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
  return re.test(fld);
}

function stripCharacter(words,character) {
  var spaces = words.length;
  for(var x = 1; x<spaces; ++x){
   words = words.replace(character, "");
 }
 return words;
}

function isbnPrep(fld) /*do not reference this function outside of this file, ultimately meant to be replaced*/
{
  fld = stripCharacter(fld,"-").toLowerCase();
  fld = stripCharacter(fld,"isbn");
  fld = stripCharacter(fld,":");
  return fld;
}

function validateISBN(fld) /* validates if a field is an ISBN, returns true/false*/
{
  fld = isbnPrep(fld);
  //function needs to be updated to handle dashes in the correct locations
  //until update, use in conjunction with isbnPrep()
  var re=/^(isbn)?:?\s?(97(8|9))?\d{9}(\d|x)$/;
  return re.test(fld);
}

function validateISBN2(fld) /* validates if a field is an ISBN, returns array, first value is true/false, 2nd value is unformatted isbn*/
{
  fld = isbnPrep(fld);
  //function needs to be updated to handle dashes in the correct locations
  //until update, use in conjunction with isbnPrep()
  var re=/^(isbn)?:?\s?(97(8|9))?\d{9}(\d|x)$/;
  return [re.test(fld), fld];
}








