import {defineStore} from 'pinia';
import { toRaw } from "vue";
export let useGameStateStore = defineStore('game', {
    state() {
        return {
            activeWord: '',
            finalWord: '',
            startWord: '',
            wordPath: [],
            dictionary: [],
            trashDisabled: true,
            authorsBest: null,
            activeIndex: null,
            draggingActiveTile: false,
            draggingAlphabetTile: false,
            animateOut: false,
            animateIn: false,
            animateSuccessBackground: false,
            animateFailureBackground: false,
            gameOver: false,
            score: 0,
            maxAttempts: 10
        }
    },
    actions: {
        // index should always be passed
        modify(callback, params){
            if(this.score >= this.maxAttempts){
                this.gameOver=true;
            }
            if(params.index === null){
                return
            }
            let candidateWord = this[callback](params);
            let {result, code} = this.checkIfWordIsValid(candidateWord);
            this.activeIndex = null;
            if (result === true) {
                this.animateOut=true;
                this.animateSuccessBackground = true;
                setTimeout(() => {
                    this.animateOut = false;
                    this.animateSuccessBackground = false;
                    this.score++;
                    this.updateActiveWord(candidateWord);
                    // check if the game had ended
                    if(this.activeWord === this.finalWord){
                        this.gameOver = true;
                    }
                }, 350)
            } else {
                this.animateFailureBackground = true;
                setTimeout(() => {
                    this.animateFailureBackground = false;
                }, 350)
            }
        },
        // replace a letter in the active word at the given index
        replace(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                } else {
                    newWord += this.activeWord[i];
                }
            }
            return newWord;

        },
        // add a letter to the word at the given index
        add(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            console.log('Index', index);
            console.log('letter', letter);
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                }
                newWord += this.activeWord[i];
            }
            // then this must be in the last spot that exceeds the length of our word
            if (this.activeWord.length === newWord.length) {
                newWord += letter;
            }
            return newWord;
        },
        remove(params) {
            // this is to avoid casting null to 0
            let {index} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    continue;
                }
                newWord += this.activeWord[i];
            }
            return newWord;
        },
        // called from each of the modifiers to see if we have a valid new word to add to the list and update our active word
        checkIfWordIsValid(candidateWord) {
            // word must be new
            if (this.activeWord === candidateWord) {
                return {
                    result: false,
                    code: 'is-same',
                }
            }
            // check dict
            if (!this.isARealWord(candidateWord)) {
                return {
                    result: false,
                    code: 'no-exist',
                }
            }
            return {
                result: true,
                code: 'success'
            }
        },
        // update the active word, unset the currently selected index from the active word, add the new word to the list
        updateActiveWord(newWord) {
            this.activeWord = newWord;
            this.wordPath.push(this.activeWord);
        },

        async initGame() {
            // set todays puzzle
            const puzzleResponse = await fetch("./puzzle.json?v=2");
            const puzzle = await puzzleResponse.json();
            this.startWord = puzzle.startWord.toUpperCase();
            this.activeWord = puzzle.startWord.toUpperCase();
            this.finalWord = puzzle.finalWord.toUpperCase();
            this.authorsBest = +(puzzle.authorsBest);
            this.wordPath = [puzzle.startWord.toUpperCase()];
            // get dictionary
            console.log("Fetching dictionary from network");
            const response = await fetch("./wordlist.json?v=2");
            this.words = await response.json();
            this.words = toRaw(this.words);
        },
        resetGame() {
            this.activeWord = this.startWord;
            this.wordPath = [this.startWord];
            this.activeIndex = null;
            this.gameOver = false;
            this.score = 0;
        },
        isARealWord(newWord) {
            // get first letter of new Word and length of word
            let lowerNewWord = newWord.toLowerCase();
            const firstLetter = lowerNewWord.charAt(0);
            const wordLength = lowerNewWord.length;
            return !!(this.words?.[firstLetter]?.[wordLength] ?? []).includes(lowerNewWord);
        }
    }
})
