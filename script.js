// Source 1: https://random-word-api.herokuapp.com/
// Source 2: https://api.wordnik.com/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function createHtmlElement(element, className, id) {
    if (className === void 0) { className = ''; }
    if (id === void 0) { id = ''; }
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}
var wordDisplay = document.getElementById('wordBox');
var randomWord;
function randomWordGen() {
    return __awaiter(this, void 0, void 0, function () {
        var randomWordResp, randomWordData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://random-word-api.herokuapp.com/word?number=1')];
                case 1:
                    randomWordResp = _a.sent();
                    return [4 /*yield*/, randomWordResp.json()];
                case 2:
                    randomWordData = _a.sent();
                    console.log(randomWordData[0].toUpperCase());
                    randomWord = randomWordData[0].toUpperCase().split('');
                    randomWord.forEach(function (elem) {
                        var alphabet = createHtmlElement('div', "word " + elem);
                        alphabet.innerHTML = "" + elem;
                        alphabet.style.fontSize = "0px";
                        wordDisplay.append(alphabet);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
randomWordGen();
var keyboardBox = document.getElementById('keysBox');
var keyboardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var countCorrect = 0;
var countWrong = 0;
var imageMan = new Image();
keyboardArray.forEach(function (elem) {
    var key = createHtmlElement('button', 'btn btn-secondary', "K" + elem);
    key.innerHTML = "" + elem;
    key.addEventListener('click', function () {
        pressButton(elem);
    });
    keyboardBox.append(key);
});
document.body.addEventListener('keydown', function (event) {
    var regExp = /^[A-Za-z]$/;
    if (regExp.test(event.key)) {
        pressButton(event.key.toUpperCase());
    }
});
function pressButton(key) {
    var currentKey = document.getElementById("K" + key);
    currentKey.disabled = true;
    if (randomWord.indexOf(key) >= 0) {
        var guessedWord = document.getElementsByClassName("" + key);
        for (var _i = 0, guessedWord_1 = guessedWord; _i < guessedWord_1.length; _i++) {
            var element = guessedWord_1[_i];
            element.style.fontSize = "2.5rem";
            countCorrect++;
        }
        if (randomWord.length === countCorrect)
            displayModal('You Guessed Right!');
    }
    else {
        countWrong++;
        if (countWrong < 8) {
            imageMan.src = "assets/stage" + countWrong + ".png";
            document.getElementById('pictureBox').append(imageMan);
        }
        if (countWrong >= 7)
            displayModal("You Lose! The Word was " + randomWord.join(''));
    }
}
function displayModal(string) {
    document.getElementById("modalButton").click();
    document.getElementById("staticBackdropTitle").innerHTML = string;
}
function refreshPage() {
    location.reload();
}
