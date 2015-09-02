(function() {
  "use strict"
  //Util
  var getId = function(id) {
    return document.getElementById(id);
  };

  var getClass = function(className) {
    return document.getElementsByClassName(className);
  };
  //vars
  var screen = getId("screen"),
    equals = getId("equals"),
    num = getClass("num"),
    ops = getClass("operator"),
    recall=getClass("recall"),
    currentNum = "",
    oldNum = "",
    recallNum,
    resultNum;

  // getNum when clicked
  var getNum = function() {
    if (resultNum) {
      currentNum = this.childNodes[0].nodeValue;
      resultNum = "";
    } else {
    
      currentNum += this.childNodes[0].nodeValue;
    }
    screen.innerHTML = currentNum;

  };

  // When operator is clicked. Pass number to oldNum and save operator
  var passNum = function() {
    oldNum = currentNum;
    currentNum = "";
    recallNum="";
    ops = this.childNodes[0].nodeValue;
  };

  // When equals is clicked. Calculate result
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    currentNum = parseFloat(currentNum);

    // Perform operation
    switch (ops) {
      case "+":
        resultNum = oldNum + currentNum;
        break;

      case "-":
        resultNum = oldNum - currentNum;
        break;

      case "x":
        resultNum = oldNum * currentNum;
        break;

      case "/":
        resultNum = oldNum / currentNum;
        break;
      default:
        resultNum = currentNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "U broke it!";
      } else {
        // If result is infinity, set off by dividing by zero
        resultNum = "R u crazy?";
      }
    }

    screen.innerHTML = resultNum;
    // Now reset oldNum & keep result
    oldNum = 0;
    currentNum = resultNum;

  };

  //display recall number
  var memoryRecall= function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    currentNum = parseFloat(currentNum);
    recallNum=parseFloat(recallNum);

    // Perform operation
    switch (ops) {
      case "m+":
        recallNum+=oldNum;
        break;
      case "m-":
        recallNum-=oldNum;
      break;
      default:
        recallNum = currentNum;
    }

    screen.innerHTML = recallNum;
 
    // Now reset oldNum & keep result
    oldNum = 0;
    currentNum = resultNum;

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = "";
    currentNum = "";
    screen.innerHTML = "0";
  };

  // Add click event to numbers
  for (var i = 0, l = num.length; i < l; i++) {
    num[i].onclick = getNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = passNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;
  recall.onclick=memoryRecall;

  // Add click event to clear button
  getId("clear").onclick = clearAll;

}());