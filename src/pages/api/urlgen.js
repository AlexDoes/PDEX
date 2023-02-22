"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
// import * as fetch from 'node-fetch'; 
var fs = require("fs");
var urls = ['https://perenual.com/api/species-list?page=1&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=2&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=3&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=4&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=5&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=6&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=7&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=8&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=9&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=10&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=11&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=12&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=13&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=14&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=15&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=16&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=17&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=18&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=19&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=20&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=21&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=22&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=23&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=24&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=25&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=26&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=27&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=28&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=29&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=30&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=31&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=32&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=33&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=34&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=35&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=36&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=37&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=38&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=39&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=40&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=41&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=42&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=43&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=44&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=45&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=46&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=47&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=48&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=49&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=50&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=51&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=52&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=53&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=54&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=55&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=56&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=57&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=58&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=59&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=60&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=61&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=62&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=63&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=64&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=65&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=66&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=67&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=68&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=69&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=70&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=71&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=72&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=73&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=74&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=75&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=76&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=77&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=78&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=79&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=80&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=81&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=82&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=83&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=84&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=85&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=86&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=87&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=88&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=89&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=90&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=91&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=92&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=93&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=94&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=95&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=96&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=97&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=98&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=99&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=100&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=101&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=102&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=103&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=104&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=105&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=106&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=107&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=108&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=109&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=110&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=111&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=112&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=113&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=114&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=115&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=116&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=117&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=118&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=119&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=120&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=121&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=122&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=123&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=124&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=125&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=126&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=127&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=128&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=129&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=130&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=131&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=132&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=133&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=134&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=135&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=136&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=137&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=138&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=139&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=140&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=141&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=142&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=143&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=144&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=145&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=146&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=147&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=148&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=149&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=150&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=151&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=152&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=153&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=154&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=155&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=156&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=157&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=158&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=159&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=160&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=161&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=162&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=163&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=164&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=165&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=166&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=167&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=168&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=169&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=170&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=171&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=172&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=173&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=174&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=175&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=176&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=177&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=178&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=179&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=180&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=181&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=182&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=183&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=184&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=185&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=186&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=187&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=188&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=189&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=190&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=191&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=192&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=193&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=194&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=195&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=196&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=197&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=198&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=199&key=sk-HpTB63eaa80ae182745',
    'https://perenual.com/api/species-list?page=200&key=sk-HpTB63eaa80ae182745'
];
var fetchPageData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.json()];
        }
    });
}); };
var fetchAllPagesData = function (urls) { return __awaiter(void 0, void 0, void 0, function () {
    var responses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(urls.map(fetchPageData))];
            case 1:
                responses = _a.sent();
                return [2 /*return*/, responses];
        }
    });
}); };
fetchAllPagesData(urls)
    .then(function (data) {
    // Save each response to a new file
    data.forEach(function (pageData, index) {
        fs.writeFile("./src/pages/api/data/page".concat(index + 1, ".json"), "".concat(JSON.stringify(pageData)), function (err) {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
    });
})["catch"](function (error) { return console.error(error); });
